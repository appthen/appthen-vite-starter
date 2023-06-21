import { createRef } from "react";
import {
  preload,
  getStorage,
  dataSource,
} from "@disscode/react/lib/utils/index.js";
import { requestHandle } from "./dataSource";
import constants from "./constants";
export const checkForLogin = async function () {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    setGlobalData("accessToken", accessToken);
    const userInfo = await reloadGlobalData("userInfo");
  } else {
    throw new Error("未登录");
  }
};
export const accessToPersonalData = function () {
  console.log("accessToPersonalData");
};
export const getLaf = async function () {
  let laf = preload("LAF_INSTANSE");
  if (laf) return laf;
  let access_token = "";

  try {
    const { data } = await getStorage({
      key: "access_token",
    });

    if (data) {
      access_token = data;
    }
  } catch (e) {} // laf = new this.utils.Laf({
  //   baseUrl: "https://xg13by.laf.dev",
  //   dbProxyUrl: "/proxy/app",
  //   getAccessToken: () => access_token,
  //   environment: this.utils.getEnv() === 'WEAPP' && "wxmp",
  // })
  // this.utils.preload('LAF_INSTANSE', laf);

  return laf;
};
export const __beforeRequest = function (options) {
  const accessToken = getGlobalData("accessToken");

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + accessToken,
    };
  }

  return options;
};
export const checkMobileTerminal = function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
};
export const compressAndConvertToBase64 = function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function (event) {
      const blob = new Blob([event.target.result]);
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(image, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const value = avg > 180 ? 245 : 0;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
          },
          "image/jpeg",
          1
        );
      };

      image.src = URL.createObjectURL(blob);
    };

    reader.onerror = (error) => reject(error);
  });
};
export const __afterRequest = function (response) {
  return response;
};

class DataSourceStore {
  constructor() {
    this.state = constants;
    this.constants = constants;
  }

  state = {};
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  get = (key) => {
    return this.state[key];
  };

  set = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = dataSource(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      fetch: requestHandle(),
    },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: "userInfo",
          isInit: function () {
            return false;
          },
          isSync: false,
          type: "fetch",
          options: function () {
            return {
              uri: _this.constants.HostDomain + "/system_user_userinfo",
              contentType: "JSON",
              method: "POST",
            };
          },
          dataHandler: function dataHandler(res) {
            return res.data?.data?.[0];
          },
        },
      ],
    };
  }

  reloadGlobalData = (key, options) => {
    if (key) {
      return this.dataSourceMap[key]?.load?.(options);
    }
    return this.reloadDataSource();
  };
}
const globalData = new DataSourceStore();
export const setGlobalData = globalData.set;
export const getGlobalData = globalData.get;
export const reloadGlobalData = globalData.reloadGlobalData;
export const globalDataSourceMap = globalData.dataSourceMap;

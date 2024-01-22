import * as utils from "@disscode/react/lib/utils/index.js";
import * as localUtils from "./utils";
import * as dataSource from "./dataSource";
import { message } from "antd";
import { history } from './router';
import syncMap from "../pages/map.json";
window.message = message;
console.log('localUtils: ', localUtils);
export default {
  ...utils,
  ...localUtils,
  ...dataSource,
  px: (num) =>{
    return num + 'px';
  },
  // createRoute: (fileName) => { // @TODO: cross-ui-web 内置的无法在组件中获取参数
  //   const query = utils.queryToObject(window.location.hash.split('?')[1]);
  //   const params = utils.preload('PAGE_PARAMS_' + fileName) || {};
  //   return function () {
  //     return {
  //       query,
  //       params,
  //     };
  //   };
  // },
  message,
  history,
  navigateBack: history.back,
  navigateTo: (pageName, { query = {}, params } = {}) => {
    if (params) $preload("PAGE_PARAMS_" + pageName, params);
    history.push(
      `/${pageName}${Object.keys(query).length > 0 ? "?" : ""}${utils.objectToQuery(
        query,
        false
      )}`
    );
  },
  redirectTo: (pageName, { query = {}, params } = {}) => {
    if (params) $preload("PAGE_PARAMS_" + pageName, params);
    history.replace(
      `/${pageName}${Object.keys(query).length > 0 ? "?" : ""}${utils.objectToQuery(
        query,
        false
      )}`
    );
  },
};

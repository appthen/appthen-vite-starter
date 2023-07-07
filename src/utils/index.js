import * as utils from "@disscode/react/lib/utils/index.js";
import * as localUtils from "./utils";
import * as dataSource from "./dataSource";
import { message } from "antd";
import { history } from './router';
import syncMap from "../pages/map.json";
export default {
  ...utils,
  ...localUtils,
  ...dataSource,
  px: (num) =>{
    return num + 'px';
  },
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

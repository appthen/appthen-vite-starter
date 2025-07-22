import * as utils from "@appthen/utils";
import * as localUtils from "./utils";
import * as dataSource from "./dataSource";
import * as routerUtils from "./router";
import * as globalDataUtils from "./globalData";
import * as globalDataHooks from "./globalDataHooks";
import { globalDataStore } from "./globalData";
// import { message } from "antd";
// window.message = message;

export default {
  ...utils,
  ...localUtils,
  ...dataSource,
  ...routerUtils,
  ...globalDataUtils,
  globalDataStore, // 添加到默认导出中
  px: (num) =>{
    return num + 'px';
  },
};

// 单独导出全局数据相关的 Hooks 和 HOC
export {
  useGlobalData,
  useGlobalDataSelector,
  useGlobalDataLoader,
  useGlobalDataStats,
  withGlobalData,
  GlobalDataDecorator,
} from './globalDataHooks';

// 导出全局数据存储实例
export { globalDataStore } from './globalData';

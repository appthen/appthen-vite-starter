import { createRef } from 'react';
import { dataSource } from "@appthen/utils";
import { requestHandle } from "./dataSource";
import constants from "./constants";
export { default as dayjs } from "dayjs";
export { message, notification, Modal } from "antd";
export const __beforeRequest = function (options) {
  return options;
};
export const __afterRequest = function (response) {
  return response;
};

// 兼容性：保留旧的全局数据 API，但使用新的全局数据存储
import { globalDataStore } from './globalData';

// 兼容旧版本的 API
export const setGlobalData = (key, value) => globalDataStore.set(key, value);
export const getGlobalData = key => globalDataStore.get(key);
export const reloadGlobalData = (key, options) => globalDataStore.load(key, options);
export const globalDataSourceMap = globalDataStore.dataSourceMap;
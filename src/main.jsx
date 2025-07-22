import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import "@appthen/react/dist/style.css";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import constants from './utils/constants';

// 设置全局常量，供数据源配置使用
window.__$$constants = constants;

const zhLocale = zhCN;
if (zhLocale.DatePicker) {
  zhLocale.DatePicker.lang = {
    ...zhLocale.DatePicker.lang,
    monthFormat: 'M月',
  }
}

// // 扩展 dayjs 插件
// dayjs.extend(updateLocale);
// dayjs.extend(localeData);

// // 设置 dayjs 语言为中文
// dayjs.locale('zh-cn');

// 更新 locale 配置
// dayjs.updateLocale('zh-cn', {
//   months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
//   monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
//   weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
//   weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
//   weekdaysMin: '日_一_二_三_四_五_六'.split('_')
// });

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import * as utils from "@appthen/react/lib/utils/index.js";
import * as localUtils from "./utils";
import * as dataSource from "./dataSource";
import * as routerUtils from "./router";
// import { message } from "antd";
// window.message = message;

export default {
  ...utils,
  ...localUtils,
  ...dataSource,
  ...routerUtils,
  px: (num) =>{
    return num + 'px';
  },
};

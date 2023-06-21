import axios from "axios";

// import * as utils from "./index";
import { __beforeRequest, __afterRequest } from "./utils";

export function requestHandle(config) {
  return async function (options) {
    let _options = options;
    // hook
    _options = __beforeRequest(options);
    if (_options.then && typeof _options.then === "function") {
      _options = await _options();
    }
    const { contentType, uri, params, method, headers = {} } = _options;
    const data =
      contentType === "FORM" && Object.keys(params).length > 0
        ? new FormData()
        : params;
    if (contentType === "FORM") {
      for (const k in params) {
        if (typeof params[k] !== "undefined" && data?.append) {
          data.append(k, params[k]);
        }
        delete params[k];
      }
    }
    delete _options.contentType;
    delete _options.params;
    // console.log('[params] ', params);
    // console.log('[query] ', query);
    // const url = uri + (query && Object.keys(query).length > 0 ? objectToQuery(query) : '');
    const requestConfig = {
      ..._options,
      url: uri,
      method,
      data,
      headers,
      ...config,
    };
    let response = await axios(requestConfig);
    // hook
    response = __afterRequest(response);
    if (response.then && typeof response.then === "function") {
      response = await response();
    }
    return response;
  };
}

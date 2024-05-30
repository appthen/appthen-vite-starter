import axios from "axios";
import { objectToQuery } from '@appthen/react/lib/utils/index.js';

// import * as utils from "./index";
import { __beforeRequest, __afterRequest } from "./utils";

export function requestHandle(config) {
  return async function (options) {
    let _options = options;
    // hook
    _options = __beforeRequest(options);
    if (_options.then && typeof _options.then === "function") {
      _options = await __beforeRequest(options)
    }
    const { contentType, params, method, headers = {} } = _options;
    let uri = _options.uri;

    const { __query, __pathParams } = params;
    if (__query) {
      if (uri.indexOf('?') > -1) {
        uri += '&';
      } else {
        uri += '?';
      }
      uri += objectToQuery(__query, false);
      delete params.__query;
    }
    const _pathParams = {
      ..._options.pathParams,
      ...__pathParams,
    };
    // console.log('_pathParams: ', _pathParams);
    if (Object.keys(_pathParams).length > 0) {
      uri = uri.replace(/:(\w+)/g, (_, $1) => {
        console.log({
          _,
          $1: $1,
        });
        if (_pathParams[$1]) {
          return _pathParams[$1];
        } else {
          throw new Error(`Path params ${$1} is not defined`);
        }
      });
    }

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
      response = await __afterRequest(response);
    }
    return response;
  };
}

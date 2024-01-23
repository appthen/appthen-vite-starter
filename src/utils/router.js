import { objectToQuery } from '@disscode/react/lib/utils/index.js';
import { createHashHistory } from "history";
export const history = createHashHistory();

export const navigateBack = history.back;
export const navigateTo = (pageName, { query = {}, params } = {}) => {
  if (params) $preload("PAGE_PARAMS_" + pageName, params);
  history.push(
    `/${pageName}${
      Object.keys(query).length > 0 ? "?" : ""
    }${objectToQuery(query, false)}`
  );
};
export const redirectTo = (pageName, { query = {}, params } = {}) => {
  if (params) $preload("PAGE_PARAMS_" + pageName, params);
  history.replace(
    `/${pageName}${
      Object.keys(query).length > 0 ? "?" : ""
    }${objectToQuery(query, false)}`
  );
};

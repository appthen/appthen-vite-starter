import { objectToQuery } from '@appthen/react/lib/utils/index.js';
import { createHashHistory } from "history";
export const history = createHashHistory();
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();

      return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}


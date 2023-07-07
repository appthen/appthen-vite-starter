import LoadingOrError from "./components/LoadingOrError";
import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { history } from "@/utils/router";

// const HomePage = lazy(async () => import("./pages/homePage"));
const Login = lazy(async () => import("./pages/login"));
const Register = lazy(async () => import("./pages/register"));
const Mobile = lazy(async () => import("./pages/mobile"));
const ProjectManagement = lazy(async () => import("./pages/projectManagement"));
// const EmployeeManagement = lazy(async () =>
//   import("./pages/employeeManagement")
// );

const isHttps = document.location.protocol === "https:";
if (import.meta?.env?.MODE !== "development" && !isHttps) {
  window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

// import VConsole from 'vconsole'
// const vConsole = new VConsole({ theme: 'dark' })

export default function App() {
  return (
    <HashRouter history={history}>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/projectManagement" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mobile" component={Mobile} />
          <Route path="/projectManagement" component={ProjectManagement} />
          {/* <Login />
					</Route> */}
          {/* <Route path='/employeeManagement' component={<EmployeeManagement />} /> */}
          {/* <Route path=':fruitName' element={<Details />} /> */}
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

import LoadingOrError from "./components/LoadingOrError";
import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { history } from "@/utils/router";
import { componentDidMount } from '@/utils/utils';
import '@/utils/portal';

const isHttps = document.location.protocol === "https:";
if (import.meta?.env?.MODE !== "development" && !isHttps) {
  // window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

// import VConsole from 'vconsole'
// const vConsole = new VConsole({ theme: 'dark' })


export default function App() {

  useEffect(() => {
    componentDidMount?.();
  }, []);

  return (
    <HashRouter history={history}>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

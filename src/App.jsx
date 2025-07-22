import { ConfigProvider } from "@appthen/antd";
import { App as AntdApp } from "antd";
import LoadingOrError from "./components/LoadingOrError";
import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { history } from "@/utils/router";
import { componentDidMount } from "@/utils/utils";
import { globalDataInit } from "@/utils/globalData";
import "@/utils/portal";
import "./App.css";
const isHttps = document.location.protocol === "https:";
if (import.meta?.env?.MODE !== "development" && !isHttps) {
  // window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
export default function App() {
  useEffect(() => {
    componentDidMount?.();
    // 初始化全局数据源
    globalDataInit();
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
      locale="zh_cn"
    >
      <AntdApp>
        <HashRouter history={history}>
          <Suspense fallback={<LoadingOrError />}>
            <Routes>
              
            </Routes>
          </Suspense>
        </HashRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

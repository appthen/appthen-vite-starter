import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~antd": path.resolve(__dirname, "./node_modules/antd"),
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      '@appthen/antd': path.resolve(__dirname, './node_modules/@appthen/antd'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        // additionalData: `@import "@/styles/variables.scss";`, // 引入全局变量
        // additionalData: `@import "~@alifd/next/variables.scss";`, // 引入全局变量
      },
    },
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "js") {
        return {
          // runtime: `window.__toCdnUrl(${JSON.stringify(filename)})`,
          query: `v=${Date.now().toString()}`,
        };
      } else {
        return { relative: true };
      }
    },
  },
  publicDir: "./public",
  base: './'
  // base: "https://qn.iruddock.com/hysli/",
});

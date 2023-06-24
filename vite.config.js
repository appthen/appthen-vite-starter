import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      '~antd': path.resolve(__dirname, './node_modules/antd'),
    },
  },
  plugins: [react()],
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
  publicDir: './public',
  base: 'https://qn.iruddock.com/hysli/',
})

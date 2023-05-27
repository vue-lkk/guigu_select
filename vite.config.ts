//@ts-nocheck
import { defineConfig,UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入SVG需要用到的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // svg图标目录：放到src/assets/icons下
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === 'serve',
        // mock路径：假接口数据目录
        mockPath:"./src/mock"
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData:"@import '@/styles/variable.scss';"
        },
      },
    },
  }
});

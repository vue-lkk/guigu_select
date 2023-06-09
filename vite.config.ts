//@ts-nocheck
import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入SVG需要用到的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应的变量
  // 参数1：默认是开发环境
  // 参数2：vue项目根目录  process.cwd()
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // svg图标目录：放到src/assets/icons下
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === "serve",
        // mock路径：假接口数据目录
        mockPath: "./src/mock",
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
          additionalData: "@import '@/styles/variable.scss';",
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 需要代理
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

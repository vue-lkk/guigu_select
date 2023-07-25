//@ts-nocheck
import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
// 批量注册组件
import gloalComponent from "@/components/index";
import "@/styles/index.scss";
import axios from "axios";
import router from "@/router";
import store from "./store/index";
// 暗黑模式需要的样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入自定义指令
import { isHasButton } from "@/directive/has.ts";

const app = createApp(App);
// 安装element-plus插件
app.use(ElementPlus, { locale: zhCn });
// 安装自定义插件
app.use(gloalComponent);
// 安装仓库
app.use(store);
// 安装路由
app.use(router);
// 全局注册自定义指令
isHasButton(app);
// 引入路由鉴权文件
import "./permisstion.ts";
// 将应用挂载到挂载点上
app.mount("#app");

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

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.use(gloalComponent);
app.use(router);
app.use(store);
app.mount("#app");

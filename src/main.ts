//@ts-nocheck
import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import gloalComponent from '@/components/index'
import '@/styles/index.scss';
import axios from "axios"

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(gloalComponent)





app.mount("#app");


const fun = () => {
  console.log("这是没有格式化的代码");
};

fun();


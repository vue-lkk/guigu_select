import { defineStore } from "pinia";

export default defineStore("setting", {
  state: () => {
    return {
      fold: false, // 用户控制菜单折叠还是展开
      refresh: false, // 用户点击刷新
    };
  },
});

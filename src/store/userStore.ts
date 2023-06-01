//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin } from "@/api/user/index";
// 封装好的本地存储token方法
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
// 请求回来的ts类型
import { loginForm, loginResponseData } from "@/api/user/type";

import { UserState } from "./type/type";

// 路由表
import { routes } from "@/router";

//创建用户小仓库
export default defineStore("User", {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      routes // 路由表
    };
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      const result: loginResponseData = await reqLogin(data);
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        // this.token = result.data.token as string
        SET_TOKEN(result.data.token as string);
        return "ok";
      } else {
        console.log(result);
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});

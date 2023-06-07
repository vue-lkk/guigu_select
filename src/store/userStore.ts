//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin,reqUserInfo,reqLogout } from "@/api/user/index";
// 封装好的本地存储token方法
import { SET_TOKEN, GET_TOKEN,REMOVE_TOKEN  } from "@/utils/token";
// 请求回来的ts类型(mock假数据)
import { loginForm,loginResponseData,userResponseData } from "@/api/user/type";

import { UserState } from "./type/type";

// 路由表
import { routes } from "@/router";

//创建用户小仓库
export default defineStore("User", {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      routes, // 路由表
      username:'', // 用户名
      avatar:'' //用户头像
    };
  },
  //异步|逻辑的地方
  actions: {
    //登录
    async userLogin(data: loginForm) {
      //登录请求
      const result: loginResponseData = await reqLogin(data);
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        // 本地存储一下token
        SET_TOKEN(result.data as string)
        // 存储到仓库
        this.token = result.data as string
        // 能保证当前async函数返回一个成功的promise
        return "ok";
      } else {
        // 能保证当前async函数返回一个失败的promise
        return Promise.reject(new Error(result.data));
      }
    },

    // 获取用户信息
    async getUserInfo(){
      const result:userResponseData = await reqUserInfo()
      if(result.code == 200){
        // 用户名
        this.username  = result.data.name
        // 头像
        this.avatar  = result.data.avatar
        return "ok";
      }else{
        return Promise.reject(new Error(result.message));
      }
    },

    // 退出登录
    async userLogout() {
      const result:any = await reqLogout()
      console.log(result)
      if(result.code == 200){
        this.token=''
        this.username=''
        this.avatar = ''
        REMOVE_TOKEN()
        return "ok";
      }else{
        return Promise.reject(new Error(result.message));
      }
    }

  },
  getters: {},
});

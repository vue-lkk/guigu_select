//统一管理咱们项目用户相关的接口
import request from "@/utils/request";
// import type 只会从模块中获取类型信息，不会导入模块的实际代码，
// 在模块导出大量类型信息的情况下，使用import type 可以带来更好的性能
import type { loginForm, loginResponseData, userResponseData } from "./type";

//项目用户相关的请求地址
enum API {
  LOGIN_URL = "/user/login", // 登录接口

  USERINFO_URL = "/user/info", // 用户信息接口
}

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);

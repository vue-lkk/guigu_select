//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

//项目用户相关的请求地址
enum API {

  LOGIN_URL = '/user/login',
 
  USERINFO_URL = '/user/info',
 
 }

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data:any) =>  request.post(API.LOGIN_URL,data)

// 获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USERINFO_URL)
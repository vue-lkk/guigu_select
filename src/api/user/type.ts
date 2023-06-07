// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string;
  password: string;
}

// 定义全部接口返回共同数据的ts类型
interface ResponseData {
  code: number;
  message?: string;
  ok: boolean
}

// 定义登录接口返回数据的ts类型
export interface loginResponseData extends ResponseData {
  data?: string;
}

// 定义获取用户信息返回数据的ts类型
export interface userResponseData extends ResponseData {
  data: {
    routes:string[],
    buttons:string[],
    roles:string[],
    name: string,
    avatar: string
  },
}

// 定义退出接口返回数据的ts类型
// 因为返回的 data为null 所以不必定义，直接写any即可
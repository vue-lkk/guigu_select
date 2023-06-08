// 引入封装好的axios
import request from "@/utils/request";
// 引入请求品牌data的类型
import {TrademarkResponseData,TrademarkList} from './type'

//项目用户相关的请求地址
enum API {
  TARDEMARK_URL = "/admin/product/baseTrademark", // 品牌管理
  ADD_TARDEMARK_URL = "/admin/product/baseTrademark/save", // 添加品牌
  UPDATE_TARDEMARK_URL = "/admin/product/baseTrademark/update",//修改品牌
}

// 品牌列表
export const reqBaseTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(API.TARDEMARK_URL + `/${page}/${limit}`);


// 添加、修改品牌
export const reqAddorUpdateTrademark = (data:TrademarkList) => {
  // 修改品牌
  if(data.id){
    return request.put<any,any>(API.UPDATE_TARDEMARK_URL,data)
  }else{ //添加品牌
    return request.post<any,any>(API.ADD_TARDEMARK_URL,data)
  }
}
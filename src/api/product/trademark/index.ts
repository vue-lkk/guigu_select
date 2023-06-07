// 引入封装好的axios
import request from '@/utils/request'

//项目用户相关的请求地址
enum API{
    TARDEMARK_URL = '/admin/product/baseTrademark' // 品牌管理
}

export const reqBaseTrademark = (page:number,limit:number) => 
request.get<any,any>(API.TARDEMARK_URL+`/${page}/${limit}`)
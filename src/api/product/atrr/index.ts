import request from '@/utils/request.ts'
import type {categoryResponseData} from './type'

enum api {
    C1_URL="/admin/product/getCategory1",
    C2_URL="/admin/product/getCategory2",
    C3_URL="/admin/product/getCategory3"
}

// 一级分类
export const reqCategory_1 = () => 
request.get<any,categoryResponseData>(api.C1_URL)

// 二级分类
export const reqCategory_2 = (c1_ID:Number) => 
request.get<any,categoryResponseData>(api.C2_URL + c1_ID)

// 三级分类
export const reqCategory_3 = (c2_ID:Number) => 
request.get<any,categoryResponseData>(api.C2_URL + c2_ID)

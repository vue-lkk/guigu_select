import request from "@/utils/request.ts";
import type { categoryResponseData, attrResponseData, attrData } from "./type";

enum api {
  C1_URL = "/admin/product/getCategory1/",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  C123_url = "/admin/product/attrInfoList/",
  ADDORUPDATE_URL = "/admin/product/saveAttrInfo",
  DELETEATTR_URL = "/admin/product/deleteAttr/",
}

// 一级分类
export const reqCategory_1 = () =>
  request.get<any, categoryResponseData>(api.C1_URL);

// 二级分类
export const reqCategory_2 = (c1_ID: number | string) =>
  request.get<any, categoryResponseData>(api.C2_URL + c1_ID);

// 三级分类
export const reqCategory_3 = (c2_ID: number | string) =>
  request.get<any, categoryResponseData>(api.C2_URL + c2_ID);

// 获取属性
export const reqAttrInfoList = (
  c1_ID: number | string,
  c2_ID: number | string,
  c3_ID: number | string
) =>
  request.get<any, attrResponseData>(
    api.C123_url + `${c1_ID}/${c2_ID}/${c3_ID}`
  );

// 添加属性与属性已有的属性的参数理解
// 修改属性
// {
//   "id":"",   // 已有的属性的ID
//   "attrName": "",  // 已有的属性的名字
//   "attrValueList": [
//     {
//       "attrId":'', //属性值归属哪一个属性
//        "id":'',   // 已有的属性的ID
//        valueName:'string'
//     }
//   ],
//   "categoryId": '', // 代表的是3级分类的id
//   "categoryLevel": 3, // 代表的时几级分类
// }

// 添加属性
// {
//   "attrName": "string",  // 新增的属性的名字
//   "attrValueList": [ // 新增的属性值数组
//     {
//        valueName:'string'
//     }
//   ],
//   "categoryId": '',   // 代表的是3级分类的id
//   "categoryLevel": 3, // 代表的时几级分类
// }
export const reqAddOrUpdateAtrr = (data: attrData) =>
  request.post<any, any>(api.ADDORUPDATE_URL, data);

// 删除属性
export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(api.DELETEATTR_URL + id);

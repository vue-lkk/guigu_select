import request from "@/utils/request";
import type { SkuData, SkuInfo } from "./type.ts";

enum api {
  SKULIST_URL = "/admin/product/list/",
  ONSALE_URL = "/admin/product/onSale/",
  CANCELSALE = "/admin/product/cancelSale/",
  SKUINFO_URL = "/admin/product/getSkuInfo/",
  DELETESKU_URL = "/admin/product/deleteSku/",
}

// 获取sku数据
export const reqSkuList = (page: number | string, limit: number | string) =>
  request.get<any, SkuData>(api.SKULIST_URL + `${page}/${limit}`);

// 上架
export const reqOnSale = (skuId: number | string) =>
  request.get<any, any>(api.ONSALE_URL + skuId);

// 下架
export const reqCancelSale = (skuId: number | string) =>
  request.get<any, any>(api.CANCELSALE + skuId);

// SKU商品详情
export const reqSkuInfo = (skuId: number | string) =>
  request.get<any, SkuInfo>(api.SKUINFO_URL + skuId);

// SKU商品详情
export const reqDeleteSku = (skuId: number | string) =>
  request.delete<any, any>(api.DELETESKU_URL + skuId);

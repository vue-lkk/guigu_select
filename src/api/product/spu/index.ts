import request from "@/utils/request";
import type {
  supDate,
  supRecords,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SkuData,
  SkuAttr,
} from "./type.ts";

enum api {
  SPULIST_URL = "/admin/product/",
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  IMAGE_URL = "/admin/product/spuImageList/",
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",
  SAVESPUINFO_URL = "/admin/product/saveSpuInfo",
  UPDATESPUINFO_URL = "/admin/product/updateSpuInfo",
  SVAESKUINFO_URL = "/admin/product/saveSkuInfo",
  FINDBYSPUID_URL = "/admin/product/findBySpuId/",
  DELETESKU_URL = "/admin/product/deleteSku/",
}

// 获取spu数据
export const reqSpuList = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, supDate>(
    api.SPULIST_URL + `${page}/${limit}?category3Id=${category3Id}`
  );

//获取全部的SPU的品牌的数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(api.ALLTRADEMARK_URL);

//获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(api.IMAGE_URL + spuId);

//获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(api.SPUHASSALEATTR_URL + spuId);

//获取整个项目全部的销售属性[颜色、版本、尺码]
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(api.ALLSALEATTR_URL);

// 添加一个新的SPU接口
// 更新已有的SPU接口
// data:即为spu新增的SPU 或者 已有的SPU对象
export const reqAddOrUpdateSpu = (data: supRecords) => {
  // 如果SPU对象已有ID，更新已有的SPU
  if (data.id) {
    return request.post<any, any>(api.UPDATESPUINFO_URL, data);
  } else {
    return request.post<any, any>(api.SAVESPUINFO_URL, data);
  }
};

// 添加SKU的请求方法
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(api.SVAESKUINFO_URL, data);

// 获取sku列表
export const reqSkuAtrr = (spuId: number | string) =>
  request.get<any, SkuAttr>(api.FINDBYSPUID_URL + spuId);

// 删除SKU
export const reqDeleteSku = (skuId: number | string) =>
  request.delete<any, any>(api.DELETESKU_URL + skuId);

import request from "@/utils/request";
import type {supDate,supRecords,AllTradeMark,SpuImage,SaleAttrResponseData,HasSaleAttrResponseData} from './type.ts'

enum api{
    SPULIST_URL = '/admin/product/',
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    IMAGE_URL = '/admin/product/spuImageList/',
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    SAVESPUINFO_URL = '/admin/product/saveSpuInfo',
    UPDATESPUINFO_URL = '/admin/product/updateSpuInfo'
}

// 获取spu数据
export const reqSpuList = (page:number,limit:number,category3Id:number|string) => 
    request.get<any,supDate>(api.SPULIST_URL+`${page}/${limit}?category3Id=${category3Id}`)

//获取全部的SPU的品牌的数据
export const reqAllTradeMark = () => 
    request.get<any,AllTradeMark>(api.ALLTRADEMARK_URL)

//获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId:number) => 
    request.get<any,SpuImage>(api.IMAGE_URL + spuId)

//获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId:number) =>
    request.get<any,SaleAttrResponseData>(api.SPUHASSALEATTR_URL + spuId)

//获取整个项目全部的销售属性[颜色、版本、尺码]
export const reqAllSaleAttr = () => 
    request.get<any,HasSaleAttrResponseData>(api.ALLSALEATTR_URL)

// 添加一个新的SPU接口
// 更新已有的SPU接口
// data:即为spu新增的SPU 或者 已有的SPU对象
export const reqAddOrUpdateSpu = (data:supRecords) => {
    // 如果SPU对象已有ID，更新已有的SPU
    if(data.id) {
        return request.post<any,any>(api.UPDATESPUINFO_URL,data)
    }else{
        return request.post<any,any>(api.SAVESPUINFO_URL,data)
    }
}

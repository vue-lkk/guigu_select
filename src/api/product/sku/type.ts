// 所有接口的公共类型
interface Data {
  code: number;
  message: string;
  ok: boolean;
}

// 平台属性
export interface SkuAttrValueList {
  id?: number | string;
  attrId: number | string; //平台属性的ID
  valueId: number | string; //属性值的ID
  attrName: string;
  valueName: string;
}
// 销售属性
export interface SkuSaleAttrValueList {
  id?: number | string;
  saleAttrId: number | string; //属性
  saleAttrValueId: number | string; //属性值的ID
  saleAttrName: string;
  saleAttrValueName: string;
}

// 收集添加sku数据的ts类型
export interface SkuList {
  category3Id: number | string; //三级分类的ID
  spuId: number | string; //已有的spu的ID
  tmId: number | string; //SPU品牌的ID
  skuName: string; // SKU名字
  price: number | string; // sku价格、
  weight: number | string; // sku重量
  skuDesc: string; // sku描述
  skuAttrValueList?: SkuAttrValueList[]; //平台属性的收集
  skuSaleAttrValueList?: SkuSaleAttrValueList[]; // 销售属性
  skuImageList?: SkuImageList[]; //商品图片
  skuDefaultImg: string; // SKU图片地址 ,
  id: number | string;
  isSale: number | string;
}

export interface SkuData extends Data {
  data: {
    records: SkuList[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

// SKU图片ts数据
export interface SkuImageList {
  id: number | string;
  skuId: number;
  imgName: string;
  imgUrl: string;
  spuImgId: number;
  isDefault: number;
}

// 商品详情
export interface SkuInfo extends Data {
  data: SkuList;
}

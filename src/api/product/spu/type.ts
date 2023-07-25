// 所有接口的公共类型
interface Data {
  code: number;
  message: string;
  ok: boolean;
}

// spu列表数据类型 (需要修改)
export interface supRecords {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: null | SaleAttr[]; // 销售属性值
  spuImageList: null | SpuImage[]; // 图片墙
  spuPosterList?: null;
}

// spu请求回来的ts类型
export interface supDate extends Data {
  data: {
    records: supRecords[];
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

// 所有品牌数据的ts类型
export interface Trademark {
  createTime?: string;
  id?: number;
  logoUrl: string;
  tmName: string;
  updateTime?: string;
}
// 品牌接口返回的数据的ts类型
export interface AllTradeMark extends Data {
  data: Trademark[];
}

// 商品图片ts类型
export interface SpuImage {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}
export type spuImage = SpuImage[];
//已有的SPU的照片墙数据的类型
export interface SpuHasImg extends Data {
  data: spuImage;
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number | string;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  isChecked?: null;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  flag?: boolean;
  attrValue?: string;
}
//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
//销售属性对象ts类型
export interface SaleAttr {
  id?: number | string;
  createTime?: null;
  updateTime?: null;
  spuId?: string;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  saleAttrIdAndValueId: string;
}
//SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends Data {
  data: SaleAttr[];
}

//已有的全部SPU销售属性的返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}
export interface HasSaleAttrResponseData extends Data {
  data: HasSaleAttr[];
}

// 平台属性
export interface SkuAttrValueList {
  attrId: number | string; //平台属性的ID
  valueId: number | string; //属性值的ID
}
// 销售属性
export interface SkuSaleAttrValueList {
  saleAttrId: number | string; //属性
  saleAttrValueId: number | string; //属性值的ID
}
// 收集添加sku数据的ts类型
export interface SkuData {
  category3Id: number | string; //三级分类的ID
  spuId: number | string; //已有的spu的ID
  tmId: number | string; //SPU品牌的ID
  skuName: string; // SKU名字
  price: number | string; // sku价格、
  weight: number | string; // sku重量
  skuDesc: string; // sku描述
  skuAttrValueList?: SkuAttrValueList[]; //平台属性的收集
  skuSaleAttrValueList?: SkuSaleAttrValueList[]; // 销售属性
  skuDefaultImg: string; // SKU图片地址
}

// 接口返回某个商品sku列表数据的ts类型
export interface skuItem {
  id: number | string;
  spuId: number | string;
  price: number;
  skuName: string;
  skuDesc: string;
  weight: number;
  tmId: number | string;
  category3Id: number | string;
  skuDefaultImg: string;
  isSale: number;
  skuImageList: null;
  skuAttrValueList: null;
  skuSaleAttrValueList: null;
}

// 接口数据data
export interface SkuAttr extends Data {
  data: skuItem[];
}

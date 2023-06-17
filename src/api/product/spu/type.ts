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
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name: string;
  url: string;
}
//已有的SPU的照片墙数据的类型
export interface SpuHasImg extends Data {
  data: SpuImage[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked?: null;
}
//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
//销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: string;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
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

// 定义全部接口返回共同数据的ts类型
interface ResponseData {
  code: number;
  message?: string;
  ok: boolean;
}

// 定义品牌列表ts类型
export interface TrademarkList {
  id?: number | undefined;
  createTime?: string;
  updateTime?: string;
  tmName: string;
  logoUrl: string;
}

// 定义包含全部商品数据的ts类型
export type Records = TrademarkList[];

// 定义请求回来全部品牌的返回data的ts类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: 1;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

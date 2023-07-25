interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface categoryObj {
  createTime?: string;
  id: number | string;
  name: string;
  updateTime: string;
  category1Id?: string;
  category2Id?: string;
}

// 三级分类
export interface categoryResponseData extends ResponseData {
  data: categoryObj[];
}

// 属性数组(添加、修改)
export interface attrValueLists {
  id?: number | string;
  valueName: string;
  falg: boolean;
  attrId?: number | string;
}

export type attr = attrValueLists[];

// data对象(添加、修改的参数类型)
export interface attrData {
  id?: number | string;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number | string;
  attrValueList: attr;
  attrIdAndValueId?: number | string;
}

export interface attrResponseData extends ResponseData {
  data: attrData[];
}

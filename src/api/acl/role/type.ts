// 全局字段
export interface Data {
  code: number;
  message: string;
  ok: boolean;
}

// 角色ts类型
export interface Records {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}

export interface RoleRecords extends Data {
  data: {
    records: Records[];
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

// 分配权限
export interface MenuData {
  id: number | string;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  children?: MenuData[];
  select: boolean;
}

export interface MenuList extends Data {
  data: MenuData[];
}

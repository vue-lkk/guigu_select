// 全局字段
export interface Data {
  code: number;
  message: string;
  ok: boolean;
}

// 菜单权限
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

// 添加菜单/修改菜单接口的 body参数ts类型
export interface AddOrUpdateBody {
  id?: number | string;
  code: string;
  level: number;
  name: string;
  pid: number;
}

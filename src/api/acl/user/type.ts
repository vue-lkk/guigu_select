// 全局字段
export interface Data {
  code: number;
  message: string;
  ok: boolean;
}

export interface UserRecords {
  id?: number | string;
  createTime: string;
  updateTime: string;
  username?: string;
  password?: string;
  name: string;
  phone: null;
  roleName?: string;
}

// 接口返回数据--用户管理ts数据
export interface User extends Data {
  data: {
    records: UserRecords[];
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

export interface AssignRoles {
  id?: number | String;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
}

// 用户职位数据ts类型
export interface ToAssign extends Data {
  data: {
    assignRoles: AssignRoles[]; // 已经有的职位
    allRolesList: AssignRoles[]; // 全部职位
  };
}

// 根据用户分配角色,data参数ts类型
export interface DoAssignRoleBody {
  roleIdList: string[];
  userId: number | string;
}

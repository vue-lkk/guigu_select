import { RouteRecordRaw } from "vue-router";
import {categoryObj} from '@/api/product/attr/type'

// 定义用户信息小仓库ts类型
export interface UserState {
  token: string | null;
  routes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

// 定义分类小仓库ts类型
export interface categoryState {
  c1_list:categoryObj[],
  c1_ID:string | number
}

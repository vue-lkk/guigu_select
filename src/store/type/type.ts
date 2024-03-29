import { RouteRecordRaw } from "vue-router";
import { categoryObj } from "@/api/product/atrr/type";

// 定义用户信息小仓库ts类型
export interface UserState {
  token: string | null;
  routes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
}

// 定义分类小仓库ts类型
export interface categoryState {
  c1_list: categoryObj[];
  c1_ID: string | number;
  c2_list: categoryObj[];
  c2_ID: string | number;
  c3_list: categoryObj[];
  c3_ID: string | number;
}

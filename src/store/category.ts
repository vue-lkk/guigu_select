import {
  reqCategory_1,
  reqCategory_2,
  reqCategory_3,
} from "@/api/product/atrr";
import { defineStore } from "pinia";
import type { categoryResponseData } from "@/api/product/attr/type";
import type { categoryState } from "@/store/type/type";

export default defineStore("category", {
  state: (): categoryState => {
    return {
      c1_list: [], // 一级分类列表
      c1_ID: "", // 一级分类id
      c2_list: [], // 二级分类列表
      c2_ID: "", // 二级分类id
      c3_list: [], // 三级分类列表
      c3_ID: "", // 三级分类id
    };
  },
  actions: {
    // 获取一级分类
    async getcategory_1() {
      const result: categoryResponseData = await reqCategory_1();
      if (result.code == 200) {
        this.c1_list = result.data;
      }
    },

    // 获取二级分类
    async getcategory_2() {
      const result: categoryResponseData = await reqCategory_2(this.c1_ID);
      if (result.code == 200) {
        this.c2_list = result.data;
      }
    },

    // 获取三级分类
    async getcategory_3() {
      const result: categoryResponseData = await reqCategory_3(this.c2_ID);
      if (result.code == 200) {
        this.c3_list = result.data;
      }
    },
  },
  getters: {},
});

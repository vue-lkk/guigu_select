<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1_ID" @change="handler_category1" :disabled="scene===0?false:true">
          <el-option
            v-for="(item, index) in categoryStore.c1_list"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2_ID" @change="handler_category2" :disabled="scene===0?false:true">
          <el-option
          v-for="(item,index) in categoryStore.c2_list"
          :key="item.id"
          :value="item.id"
          :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3_ID" :disabled="scene===0?false:true">
          <el-option 
          v-for="(item,index) in categoryStore.c3_list"
          :key="item.id"
          :value="item.id"
          :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategory from "@/store/category";
import { onMounted } from "vue";
// 分类仓库
const categoryStore = useCategory();
defineProps(['scene'])

onMounted(() => {
  getCategory();
});

// 获取一级分类数据
const getCategory = () => {
  categoryStore.getcategory_1();
};

// 一级分类change事件（选中值触发）
const handler_category1 =() => {
  // 清除
  categoryStore.c2_ID="",   // 清除二级分类id
  categoryStore.c3_list=[], // 清除三级分类列表
  categoryStore.c3_ID="",   // 清除三级分类id
  // 获取二级分类数据
  categoryStore.getcategory_2()
}

// 二级分类change事件（选中值触发）
const handler_category2 =() => {
  categoryStore.c3_ID="",   // 清除三级分类id
  // 获取三级分类数据
  categoryStore.getcategory_3()
}
</script>

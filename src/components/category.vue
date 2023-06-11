<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="一级菜单">
            <el-select 
            v-model="categoryStore.c1_ID">
              <el-option 
              v-for="(item,index) in categoryStore.c1_list" 
              :key="item.id" 
              :value="item.id"  
              :label="item.name">
            </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级菜单">
            <el-select>
              <el-option value="北京"></el-option>
              <el-option value="上海"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级菜单">
            <el-select>
              <el-option value="北京"></el-option>
              <el-option value="上海"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
</template>

<script setup lang="ts">
import useCategory from '@/store/category'
import { onMounted } from 'vue';
// 分类仓库
const categoryStore = useCategory() 

onMounted(() => {
  getCategory()
})

// 获取一级分类
const getCategory =() => {
  categoryStore.getcategory()
}

</script>
<template>
  <!-- 卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" icon="Plus">添加品牌</el-button>
      </div>
    </template>
    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="80px" align="center" />
      <el-table-column prop="name" label="品牌名称" />
      <el-table-column prop="address" label="品牌LOGO" />
      <el-table-column prop="address" label="品牌操作" />
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block" style="margin-top: 10px">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :small="true"
        :background="true"
        layout="sizes, prev, pager, next,->, jumper,total"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
const currentPage = ref(2);
const pageSize = ref(20);
</script>

<style scoped lang="scss"></style>

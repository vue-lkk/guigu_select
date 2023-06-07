<template>
  <!-- 卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" icon="Plus">添加品牌</el-button>
      </div>
    </template>
    <!-- table表格 -->
    <el-table :data="records" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <!-- 表格中利用插槽处理图片展示 -->
      <el-table-column label="品牌LOGO">
        <template #default="{ row, column, $index }">
          <div style="display: flex; align-items: center">
            <img :src="row.logoUrl" style="width:100px;height:100px"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #="{ row, column, $index }">
          <el-button icon="Edit"></el-button>
          <el-button icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block" style="margin-top:10px">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
        :small="true" :background="true" layout="sizes, prev, pager, next,->, jumper,total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqBaseTrademark } from '@/api/product/trademark/index'

// 当前页
const currentPage = ref<number>(2)
// 多少条
const pageSize = ref<number>(5)
// 总条数
const total = ref<number>(0)
// 品牌数据列表
const records = ref([])
// console.log(currentPage.value,pageSize.value)


onMounted(() => {
  getBaseTrademark()
})

// 发送请求获取品牌列表
const getBaseTrademark = async () => {
  const result: any = await reqBaseTrademark(currentPage.value, pageSize.value)
  total.value = result.data.total
  records.value = result.data.records
  console.log(records.value)
}
</script>

<style scoped lang="scss"></style>

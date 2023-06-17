<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>

    <el-card style="margin-top: 10px">
      <!-- 0:默认渲染 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3_ID ? false : true"
          @click="addSpu"
          >添加SPU</el-button
        >
        <!-- 表格 -->
        <el-table
          border
          style="width: 100%; margin-top: 10px"
          :data="spuList"
          stripe
        >
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="spuName" label="SPU属性" />
          <el-table-column
            prop="description"
            label="SPU描述"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, column, $index }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                size="small"
                type="warning"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                type="success"
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="demo-pagination-block" style="margin-top: 10px">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :small="true"
            :background="true"
            layout="prev, pager, next,jumper,->, sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- 1：渲染spuform -->
      <div v-show="scene == 1">
        <SpuForm @spuChangeScene="spuChangeScene" ref="spu"></SpuForm>
      </div>
      <!-- 2：渲染skuform -->
      <div v-show="scene == 2">
        <SkuForm></SkuForm>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { reqSpuList } from "@/api/product/spu";
import SpuForm from "./spuform.vue";
import SkuForm from "./skuform.vue";
import type { supDate, supRecords } from "@/api/product/spu/type.ts";
// 引入三级分类仓库
import useCategory from "@/store/category";
// 三级分类仓库
const categoryStore = useCategory();

// 定义card组件内容的切换(0,1,2)
let scene = ref(0);

// 获取spuform组件实例
const spu = ref<any>(null);

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(0);
// spu数据列表
let spuList = ref<supRecords[]>([]);

// 监听三级分类的id,发送请求
watch(
  () => categoryStore.c3_ID,
  () => {
    getSpuList();
  }
);

// 请求spu数据
const getSpuList = async () => {
  const { c3_ID } = categoryStore;
  let result: supDate = await reqSpuList(
    currentPage.value,
    pageSize.value,
    c3_ID
  );
  console.log(result);
  if (result.code == 200) {
    spuList.value = result.data.records;
    total.value = result.data.total;
  }
};

// 当前页改变就会触发事件
const handleCurrentChange = () => {
  getSpuList();
};

// 一页多少条数改变就会触发事件
const handleSizeChange = () => {
  // 需要将当前页改为1比较好，可能页数没有怎么多了
  currentPage.value = 1;
  getSpuList();
};

// 清除仓库中的数据
onBeforeUnmount(() => {
  categoryStore.$reset();
});
// 添加SPU
const addSpu = () => {
  scene.value = 1;
};

// 子组件：点击取消添加spu
const spuChangeScene = (num: number) => {
  scene.value = num;
};

// 修改SPU
const updateSpu = (row: supRecords) => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1;
  //调用子组件实例方法获取完整已有的SPU的数据
  spu.value.initHasSpuData(row);
};
</script>

<script lang="ts">
export default {
  name: "SPU",
};
</script>

<style scoped lang="scss"></style>

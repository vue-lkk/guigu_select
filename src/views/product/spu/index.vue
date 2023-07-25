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
          v-has="`btn.Spu.add`"
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
            <template #="{ row }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
                v-has="`btn.Spu.addsku`"
              ></el-button>
              <el-button
                size="small"
                type="warning"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
                v-has="`btn.Spu.update`"
              ></el-button>
              <el-button
                size="small"
                type="success"
                icon="View"
                title="查看SKU列表"
                @click="getSkuList(row)"
                v-has="`btn.Spu.skus`"
              ></el-button>
              <el-popconfirm title="确定删除?" @confirm="deleteSku(row)">
                <template #reference>
                  <el-button
                    size="small"
                    type="danger"
                    icon="Delete"
                    title="删除SPU"
                    v-has="`btn.Spu.delete`"
                  ></el-button>
                </template>
              </el-popconfirm>
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
        <SkuForm @spuChangeScene="spuChangeScene" ref="sku"></SkuForm>
      </div>
    </el-card>

    <el-dialog v-model="isSKu" title="SKU列表">
      <el-table :data="skuAttr" border>
        <el-table-column prop="skuName" label="SKU名字" />
        <el-table-column prop="price" label="SKU价格" />
        <el-table-column prop="weight" label="SKU重量" />
        <el-table-column label="SKU图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { reqSpuList, reqSkuAtrr, reqDeleteSku } from "@/api/product/spu";
import SpuForm from "./spuform.vue";
import SkuForm from "./skuform.vue";
import type {
  supDate,
  supRecords,
  skuItem,
  SkuAttr,
} from "@/api/product/spu/type.ts";
// 引入三级分类仓库
import useCategory from "@/store/category";
import { ElMessage } from "element-plus";

// 三级分类仓库
const categoryStore = useCategory();

// 定义card组件内容的切换(0,1,2)
let scene = ref(0);

// 获取spuform组件实例
const spu = ref<any>(null);
// 获取skuform组件实例
const sku = ref<any>(null);

const isSKu = ref<boolean>(false);

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(0);
// spu数据列表
let spuList = ref<supRecords[]>([]);
// sku数据列表
let skuAttr = ref<skuItem[]>([]);

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
  // 切换为场景1
  scene.value = 1;
  // 点击添加SPU按钮，调用子组件初始化方法
  spu.value.initAddSpu(categoryStore.c3_ID);
};

// 切换
const spuChangeScene = (obj: any) => {
  scene.value = obj.flag;
  // // 更新、添加完毕再次请求
  // getSpuList()
  if (obj.type == "update") {
    // 更新留在当前页
    getSpuList();
  } else {
    // 添加成功去到第一页
    currentPage.value = 1;
    getSpuList();
  }
};

// 修改SPU
const updateSpu = (row: supRecords) => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1;
  //调用子组件实例方法获取完整已有的SPU的数据
  spu.value.initHasSpuData(row);
};

// 添加SKU
const addSku = (row: supRecords) => {
  scene.value = 2;
  sku.value.initSkuData(categoryStore.c1_ID, categoryStore.c2_ID, row);
};

// 查看SKU列表
const getSkuList = async (row: supRecords) => {
  const { id } = row;
  isSKu.value = true;
  let result: SkuAttr = await reqSkuAtrr(id as number);
  if (result.code == 200) {
    skuAttr.value = result.data;
  }
};

// 删除SKU
const deleteSku = async (row: supRecords) => {
  console.log(row);
  let result = await reqDeleteSku(row.id as number);
  console.log(result);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getSpuList();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>

<script lang="ts">
export default {
  name: "SPU",
};
</script>

<style scoped lang="scss"></style>

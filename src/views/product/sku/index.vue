<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- table表格 -->
      <el-table border :data="skuAtrr">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column
          prop="skuName"
          label="名称"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="skuDesc"
          label="描述"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column label="图片" min-width="150">
          <template #="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" min-width="100" />
        <el-table-column prop="price" label="价格" min-width="100" />
        <el-table-column label="操作" width="230px" fixed="right">
          <template #="{ row }">
            <el-button
              size="small"
              :type="row.isSale == 1 ? 'success' : 'info'"
              :icon="row.isSale == 1 ? 'Top' : 'Bottom'"
              title="上/下架SKU"
              @click="topSku(row)"
              v-has="`btn.Sku.updown`"
            ></el-button>
            <el-button
              size="small"
              type="warning"
              icon="Edit"
              title="更新已有的SKU"
              @click="updateSKu()"
              v-has="`btn.Sku.update`"
            ></el-button>
            <el-button
              size="small"
              type="primary"
              icon="InfoFilled"
              title="查看SKU商品详情"
              @click="viewSkuDetail(row)"
              v-has="`btn.Sku.detail`"
            ></el-button>
            <el-popconfirm title="确定删除?" @confirm="deleteSku(row)">
              <template #reference>
                <el-button
                  size="small"
                  type="danger"
                  icon="Delete"
                  title="删除SKU"
                  v-has="`btn.Sku.remove`"
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
          layout="prev, pager, next,jumper, -> ,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看SKU商品详情</h4>
      </template>
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              class="ml-2"
              style="margin: 5px"
              type="success"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              >{{ item.attrName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              class="ml-2"
              style="margin: 5px"
              type="warning"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              :interval="3000"
              type="card"
              height="120px"
              width="150px"
              indicator-position="outside"
              :autoplay="true"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <h3 text="2xl" justify="center">
                  <img
                    :src="item.imgUrl"
                    alt=""
                    style="width: 120px; height: 100px"
                  />
                </h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  reqSkuList,
  reqOnSale,
  reqCancelSale,
  reqSkuInfo,
  reqDeleteSku,
} from "@/api/product/sku/index.ts";
import { SkuList, SkuData, SkuInfo } from "@/api/product/sku/type.ts";
import { ElMessage } from "element-plus";

// 当前页码
let currentPage = ref<number>(1);
// 一页多少条
let pageSize = ref<number>(5);
// sku数据
let skuAtrr = ref<SkuList[]>([]);
// 总数
let total = ref<number>(0);
// 抽屉是否显示
let drawer = ref<boolean>(false);
// 商品详情数据
let skuInfo = ref<any>([]);

onMounted(() => {
  getSkuList();
});

const getSkuList = async () => {
  let result: SkuData = await reqSkuList(currentPage.value, pageSize.value);
  if (result.code == 200) {
    skuAtrr.value = result.data.records;
    total.value = result.data.total;
  }
};

// 页码改变
const handleCurrentChange = () => {
  getSkuList();
};
// 条数改变
const handleSizeChange = () => {
  currentPage.value = 1;
  getSkuList();
};

// 上架 / 下架
const topSku = async (row: SkuList) => {
  // isSale==1 为上架
  if (row.isSale === 1) {
    await reqCancelSale(row.id);
    ElMessage({
      type: "success",
      message: "下架成功",
    });
    getSkuList();
  } else {
    await reqOnSale(row.id);
    ElMessage({
      type: "success",
      message: "上架成功",
    });
    getSkuList();
  }
};

// 更新已有的SKU (暂时还没有接口)
const updateSKu = () => {
  ElMessage({
    type: "success",
    message: "功能正在努力研发中...",
  });
};

// 查看SKU商品详情
const viewSkuDetail = async (row: SkuList) => {
  drawer.value = true;
  let result: SkuInfo = await reqSkuInfo(row.id);
  console.log(result);
  if (result.code == 200) {
    skuInfo.value = result.data;
  }
};

// 删除sku商品
const deleteSku = async (row: SkuList) => {
  let result = await reqDeleteSku(row.id);
  if (result.code == 200) {
    getSkuList();
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: result.data,
    });
  }
};
</script>

<script lang="ts">
export default {
  name: "SKU",
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  line-height: 210px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

::v-deep .el-carousel__indicators--outside {
  display: flex;
  justify-content: center;
}
</style>

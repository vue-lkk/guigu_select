<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        type="number"
        placeholder="价格(元)"
        v-model="skuParams.price"
      />
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input
        type="number"
        placeholder="重量(g)"
        v-model="skuParams.weight"
      />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="SKU描述"
        v-model="skuParams.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="80px">
        <el-form-item
          v-for="item1 in attrData"
          :key="item1.id"
          :label="item1.attrName"
        >
          <el-select placeholder="请输入" v-model="item1.attrIdAndValueId">
            <el-option
              v-for="item2 in item1.attrValueList"
              :key="item2.id"
              :label="item2.valueName"
              :value="`${item1.id}:${item2.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="80px">
        <el-form-item
          v-for="item1 in saleAttr"
          :key="item1.id"
          :label="item1.saleAttrName"
        >
          <el-select placeholder="请输入" v-model="item1.saleAttrIdAndValueId">
            <el-option
              v-for="item2 in item1.spuSaleAttrValueList"
              :key="item2.id"
              :label="item2.saleAttrValueName"
              :value="`${item1.id}:${item2.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="spuImg" ref="table">
        <el-table-column type="selection" width="50" />
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" />
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" size="small" @click="handler(row)"
              >设置默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">确定</el-button>
      <el-button @click="cancal">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { reqAttrInfoList } from "@/api/product/atrr/index";
import {
  reqSpuHasSaleAttr,
  reqSpuImageList,
  reqAddSku,
} from "@/api/product/spu/index";
import { attrData } from "@/api/product/atrr/type";
import type {
  supRecords,
  SaleAttr,
  SpuImage,
  SkuData,
} from "@/api/product/spu/type.ts";
import { ElMessage } from "element-plus";
const $emit = defineEmits(["spuChangeScene"]);

// table实例
let table = ref<any>(null);
console.log(table.value);

// 收集SKU的参数
let skuParams = reactive<SkuData>({
  // 父组件传递过来的数据
  category3Id: "", //三级分类的ID
  spuId: "", //已有的spu的ID
  tmId: "", //SPU品牌的ID

  skuName: "", // SKU名字
  price: "", // sku价格、
  weight: "", // sku重量
  skuDesc: "", // sku描述
  skuAttrValueList: [
    //平台属性的收集
    // {
    //   attrId: ' ',   //平台属性的ID
    //   valueId: ' ', //属性值的ID
    // }
  ],
  skuSaleAttrValueList: [
    // 销售属性
    // {
    //   saleAttrId: ' ',    //属性
    //   saleAttrValueId: ' ' //属性值的ID
    // }
  ],
  skuDefaultImg: "", // SKU图片地址
});
// 平台属性
let attrData = ref<attrData[]>([]);
// 销售属性
let saleAttr = ref<SaleAttr[]>([]);
// 图片的数据
let spuImg = ref<SpuImage[]>([]);

// 取消
const cancal = () => {
  $emit("spuChangeScene", { flag: 0 });
};

// 设置默认
const handler = (row: any) => {
  // 点击的时候,全部图片的复选框不勾选
  spuImg.value.forEach((item: any) => {
    // 调用table自带的用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
    table.value.toggleRowSelection(item, false);
  });
  // 选中的图片才勾选
  table.value.toggleRowSelection(row, true);
  // 收集图片数据
  skuParams.skuDefaultImg = row.imgUrl;
};

// 保存
const save = async () => {
  // 整理参数：平台属性
  skuParams.skuAttrValueList = attrData.value.reduce((perv: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      perv.push({
        attrId,
        valueId,
      });
    }
    return perv;
  }, []);
  // 整理参数：销售属性
  skuParams.skuSaleAttrValueList = saleAttr.value.reduce(
    (perv: any, next: any) => {
      if (next.saleAttrIdAndValueId) {
        let [saleAttrId, saleAttrValueId] =
          next.saleAttrIdAndValueId.split(":");
        perv.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return perv;
    },
    []
  );
  // 发送请求
  const result = await reqAddSku(skuParams);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "添加SKU成功",
    });
    // 通知父组件切换为场景0
    $emit("spuChangeScene", { flag: 0 });
  } else {
    ElMessage({
      type: "error",
      message: "添加SKU失败",
    });
    $emit("spuChangeScene", { flag: 0 });
  }
};

// 当前子组件的方法对外暴露
const initSkuData = async (
  c1_ID: number | string,
  c2_ID: number | string,
  spu: supRecords
) => {
  // 收集数据三级分类的ID
  skuParams.category3Id = spu.category3Id;
  // 收集已有的spu的ID
  skuParams.spuId = spu.id as number;
  // 收集SPU品牌的ID
  skuParams.tmId = spu.tmId;

  // 获取平台属性
  let result1 = await reqAttrInfoList(c1_ID, c2_ID, spu.category3Id);
  // 获取销售属性
  let result2 = await reqSpuHasSaleAttr(spu.id as number);
  // SPU下全部商品的图片地址
  let result3 = await reqSpuImageList(spu.id as number);
  console.log("@", result3);
  attrData.value = result1.data;
  saleAttr.value = result2.data;
  spuImg.value = result3.data;
};

defineExpose({
  initSkuData,
});
</script>

<style scoped></style>

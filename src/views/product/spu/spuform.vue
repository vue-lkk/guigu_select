<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="supParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请你选择SPU品牌" v-model="supParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="supParams.description"
      />
    </el-form-item>

    <el-form-item label="SPU图片">
      <!-- 上传图片 -->
      <!-- v-model:file-list： 用于展示默认图片 -->
      <!-- action：上传图片的接口地址 -->
      <el-upload
        v-model:file-list="supImageList"
        list-type="picture-card"
        action="/api/admin/product/fileUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleBeforeUpload"
        multiple
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <!-- 预览图片 -->
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          alt="Preview Image"
          :src="dialogImageUrl"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>

    <el-form-item label="SPU销售属性">
      <el-select
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '暂无选择'
        "
        v-model="saleAttrIdAndValueName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        />
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        style="margin-left: 10px"
        :disabled="!saleAttrIdAndValueName.length"
        @click="addSaleAttr"
        >添加属性</el-button
      >
      <!-- table展示销售属性与属性值的地方 -->
      <el-table :data="saleAttr" style="width: 100%; margin: 10px 0px" border>
        <el-table-column
          prop="date"
          label="序号"
          width="60"
          type="index"
          align="center"
        />
        <el-table-column prop="saleAttrName" label="销售属性名字" width="120" />
        <el-table-column prop="address" label="销售属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-1"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              ref="InputRef"
              v-model="row.attrValue"
              class="ml-1 w-20"
              size="small"
              style="width: 100px"
              placeholder="请输入属性"
              @blur="handleInputConfirm(row)"
            />
            <el-button
              type="success"
              v-else
              class="button-new-tag ml-1"
              size="small"
              icon="Plus"
              @click="showInput(row)"
            >
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100" align="center">
          <template #="{ $index }">
            <el-button
              type="danger"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save" :disabled="!saleAttr.length"
        >保存</el-button
      >
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineExpose, computed } from "vue";
// 请求接口
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
// 请求返回数据的ts类型
import {
  supRecords, // spu列表数据类型
  AllTradeMark, // 品牌接口返回的数据的ts类型
  Trademark,
  // SpuHasImg, //已有的SPU的照片墙数据的类型
  SpuImage,
  SaleAttrResponseData, //SPU已有的销售属性接口返回数据ts类型
  SaleAttr,
  HasSaleAttrResponseData, //已有的全部SPU销售属性的返回数据ts类型
  HasSaleAttr,
} from "@/api/product/spu/type";

import { ElMessage } from "element-plus";

// 存储预览图片的地址
const dialogImageUrl = ref("");
// 控制图片预览显示与隐藏
const dialogVisible = ref(false);

// 照片墙删除图片
const handleRemove = () => {};

// 照片墙点击预览
const handlePictureCardPreview = (uploadFile: any) => {
  // 存储预览图片的地址
  dialogImageUrl.value = uploadFile.url!;
  // 显示
  dialogVisible.value = true;
};

// 上传图片成功之前 约束图片大小，格式
const handleBeforeUpload = (file: any) => {
  if (
    file.type == "image/png" ||
    file.type == "image/gif" ||
    file.type == "image/jpeg"
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件务必小于3M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件务必是PNG|JPG|GIF",
    });
    return false;
  }
};

const $emit = defineEmits(["spuChangeScene"]);

// 收集请求参数 (修改是7个字段，添加是6个字段,添加没有id)
let supParams = ref<any>({
  category3Id: "", //收集三级分类的ID
  spuName: "", //SPU的名字
  description: "", //SPU的描述
  tmId: "", //品牌ID
  spuSaleAttrList: [], // 销售属性值
  spuImageList: [], // 图片墙
});

let allTradeMark = ref<Trademark[]>([]);
let supImageList = ref<SpuImage[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let allAttr = ref<HasSaleAttr[]>([]);
// 将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>("");

// 取消
const cancel = () => {
  $emit("spuChangeScene", { flag: 0 });
};

// 修改一个旧的SPU初始化请求方法
const initHasSpuData = async (row: supRecords) => {
  // 存储已有的SPU对象，将来在模板中展示
  supParams.value = row;

  //获取全部的SPU的品牌的数据
  const result1: AllTradeMark = await reqAllTradeMark();
  //获取某一个已有的SPU下全部商品的图片地址
  const result2: any = await reqSpuImageList(row.id as number);
  //获取某一个已有的SPU拥有多少个销售属性
  const result3: SaleAttrResponseData = await reqSpuHasSaleAttr(
    row.id as number
  );
  //获取整个项目全部的销售属性[颜色、版本、尺码]
  const result4: HasSaleAttrResponseData = await reqAllSaleAttr();

  // 全部的SPU的品牌的数据
  allTradeMark.value = result1.data;
  // 某一个已有的SPU下全部商品的图片地址
  supImageList.value = result2.data.map((item: any) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  // 某一个已有的SPU拥有多少个销售属性
  saleAttr.value = result3.data;
  // 整个项目全部的销售属性[颜色、版本、尺码]
  allAttr.value = result4.data;
};

// 添加一个新的SPU初始化请求方法
const initAddSpu = async (c3_ID: number | string) => {
  // 清除
  Object.assign(supParams.value, {
    category3Id: "", //收集三级分类的ID
    spuName: "", //SPU的名字
    description: "", //SPU的描述
    tmId: "", //品牌ID
    spuSaleAttrList: [], // 销售属性值
    spuImageList: [], // 图片墙
  });

  supParams.value.id = ""; // 务必将id去除
  // 清除销售属性
  saleAttr.value = [];
  // 清除图片
  supImageList.value = [];
  // 清除下拉框
  saleAttrIdAndValueName.value = "";

  // 添加时，必须存储三级分类id
  supParams.value.category3Id = c3_ID;
  //获取全部的SPU的品牌的数据
  const result1: AllTradeMark = await reqAllTradeMark();
  //获取整个项目全部的销售属性[颜色、版本、尺码]
  const result4: HasSaleAttrResponseData = await reqAllSaleAttr();
  // 全部的SPU的品牌的数据
  allTradeMark.value = result1.data;
  // 整个项目全部的销售属性[颜色、版本、尺码]
  allAttr.value = result4.data;
};

// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  // 全部的销售属性：颜色、版本、尺码
  let unSelectAttr = allAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName;
    });
  });
  return unSelectAttr;
});

// 添加销售属性的方法
const addSaleAttr = () => {
  // baseSaleAttrId: number;
  // saleAttrName: string;
  // spuSaleAttrValueList: SpuSaleAttrValueList;
  // 数组解构
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(":");
  // 准备一个新的销售属性对象：将来带给服务器即可
  let newSaleAttrId: any = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  // 追加到数组中
  saleAttr.value.push(newSaleAttrId);
  // 清空收集的数据
  saleAttrIdAndValueName.value = "";
};

// 添加销售属性值按钮（显示输入框）
const showInput = (row: any) => {
  row.flag = true; // 切换
  row.attrValue = ""; // 收集属性
};

// input 失去焦点
const handleInputConfirm = (row: any) => {
  // 需要收集的数据
  const { baseSaleAttrId, attrValue } = row;
  let newAttrObj = {
    baseSaleAttrId,
    saleAttrValueName: attrValue,
  };
  // 将数据push到对应的数组里收集起来
  row.spuSaleAttrValueList.push(newAttrObj);
  row.flag = false;
};

// 保存
const save = async () => {
  // 整理参数
  // 1.照片墙的数组
  supParams.value.spuImageList = supImageList.value.map((item: any) => {
    return {
      imgName: item.name, //图片名字
      imgUrl: (item.response && item.response.data) || item.url, // 判断是否是新增的
    };
  });
  // 2.整理销售属性的数据
  supParams.value.spuSaleAttrList = saleAttr.value;
  // 发请求
  let result = await reqAddOrUpdateSpu(supParams.value);
  if (result.code == 200) {
    // 成功
    ElMessage({
      type: "success",
      message: supParams.value.id ? "更新成功" : "添加成功",
    });
    // 成功，通知父组件切换场景为0
    $emit("spuChangeScene", {
      flag: 0,
      type: supParams.value.id ? "update" : "add",
    });
  } else {
    // 失败
    ElMessage({
      type: "error",
      message: supParams.value.id ? "更新失败" : "添加失败",
    });
  }
};
// 暴露方法
defineExpose({
  initHasSpuData,
  initAddSpu,
});
</script>

<style scoped></style>

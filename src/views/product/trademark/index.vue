<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            type="primary"
            icon="Plus"
            @click="addTrademark"
            v-has="`btn.Trademark.add`"
            >添加品牌</el-button
          >
        </div>
      </template>
      <!-- table表格 -->
      <el-table :data="records" style="width: 100%" border>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column prop="tmName" label="品牌名称" />
        <!-- 表格中利用插槽处理图片展示 -->
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <div style="display: flex; align-items: center">
              <img :src="row.logoUrl" style="width: 100px; height: 100px" />
            </div>
          </template>
        </el-table-column>
        <!-- 表格中利用插槽处理图标展示 -->
        <el-table-column prop="address" label="品牌操作">
          <template #="{ row }">
            <!-- 修改品牌 -->
            <el-button
              type="warning"
              icon="Edit"
              @click="updateTrademark(row)"
              v-has="`btn.Trademark.update`"
            ></el-button>
            <!-- 删除品牌 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#ff0039"
              title="是否删除品牌?"
              width="200px"
              @confirm="confirmDelete(row)"
              @cancel="cancelDelete"
            >
              <template #reference>
                <el-button
                  type="danger"
                  icon="Delete"
                  v-has="`btn.Trademark.remove`"
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
    </el-card>

    <!-- Dailog对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkForm.id ? '修改品牌' : '添加品牌'"
    >
      <el-form :model="trademarkForm" :rules="rules" ref="ruleFormRef">
        <el-form-item
          prop="tmName"
          label="品牌名称"
          label-width="100px"
          style="width: 450px"
        >
          <el-input
            autocomplete="off"
            placeholder="请输入品牌名称"
            v-model="trademarkForm.tmName"
          />
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  reqBaseTrademark,
  reqAddorUpdateTrademark,
  reqDeleteTardemark,
} from "@/api/product/trademark/index";
// 引入品牌列表ts类型
import type {
  TrademarkResponseData,
  Records,
  TrademarkList,
  ResponseData,
} from "@/api/product/trademark/type";
// element-plus自带的上传图片ts类型
import { ElMessage } from "element-plus";
import type { UploadProps, FormRules } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(0);
// 品牌数据列表
const records = ref<Records>([]);
// 对话框是否显示
const dialogFormVisible = ref(false);
// 收集表单
const trademarkForm = reactive<TrademarkList>({
  tmName: "",
  logoUrl: "",
});

// 获取表单组件
const ruleFormRef = ref<any>();

const validatetmName = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value === "") {
    callback(new Error("品牌名称不能为空"));
  } else if (value.length <= 2) {
    callback(new Error("品牌名称不能小于2"));
  } else {
    callback();
  }
};
const validatelogoUrl = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value === "") {
    callback(new Error("品牌LOGO未上传"));
  } else {
    callback();
  }
};

// 自定义规则
const rules = reactive<FormRules>({
  tmName: [{ required: true, validator: validatetmName, trigger: "blur" }],
  logoUrl: [{ required: true, validator: validatelogoUrl }],
});

onMounted(() => {
  getBaseTrademark();
});

// 发送请求获取品牌列表
const getBaseTrademark = async () => {
  const result: TrademarkResponseData = await reqBaseTrademark(
    currentPage.value,
    pageSize.value
  );
  total.value = result.data.total;
  records.value = result.data.records;
};

// 当前页改变就会触发事件
const handleCurrentChange = () => {
  getBaseTrademark();
};

// 一页多少条数改变就会触发事件
const handleSizeChange = () => {
  // 需要将当前页改为1比较好，可能页数没有怎么多了
  currentPage.value = 1;
  getBaseTrademark();
};

// 添加品牌
const addTrademark = () => {
  trademarkForm.id = 0;
  (trademarkForm.tmName = ""), (trademarkForm.logoUrl = "");

  dialogFormVisible.value = true;
  // 清空校验的错误提示信息
  nextTick(() => {
    ruleFormRef.value.clearValidate("tmName");
    ruleFormRef.value.clearValidate("logoUrl");
  });
};

// 修改品牌
const updateTrademark = (row: TrademarkList) => {
  // 发送请求需要的id
  // trademarkForm.id = row.id
  // trademarkForm.tmName = row.tmName
  // trademarkForm.logoUrl = row.logoUrl
  // 合并
  Object.assign(trademarkForm, row);

  dialogFormVisible.value = true;
  // 清空校验的错误提示信息
  nextTick(() => {
    ruleFormRef.value.clearValidate("tmName");
    ruleFormRef.value.clearValidate("logoUrl");
  });
};

// 取消删除品牌
const cancelDelete = () => {};

// 确定删除品牌
const confirmDelete = async (row: TrademarkList) => {
  const result = await reqDeleteTardemark(row.id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
  getBaseTrademark();
};

// 取消添加品牌
const cancel = () => {
  dialogFormVisible.value = false;
};

// 确定添加品牌、修改品牌
const confirm = async () => {
  // 发送请求之前校验所以表单项 (返回promise,必须表单验证通过才发送请求)
  await ruleFormRef.value.validate();
  let result: ResponseData = await reqAddorUpdateTrademark(trademarkForm);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: trademarkForm.id ? "修改品牌成功" : "添加品牌成功",
    });
    // 再次请求品牌列表数据
    getBaseTrademark();
  } else {
    ElMessage({
      type: "error",
      message: trademarkForm.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
  dialogFormVisible.value = false;
};

// 图片上传之前触发
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/gif"
  ) {
    ElMessage.error("只支持 JPEG | PNG | GIF 格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2MB");
    return false;
  }
  return true;
};

// 图片上传成功触发
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // trademarkForm.logoUrl = URL.createObjectURL(uploadFile.raw!);
  trademarkForm.logoUrl = response.data;
  // 清理某个字段的表单验证信息
  ruleFormRef.value.clearValidate("logoUrl");
};
</script>

<script lang="ts">
export default {
  name: "Tardemark",
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

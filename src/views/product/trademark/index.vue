<template>
  <!-- 卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
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
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </div>
        </template>
      </el-table-column>
      <!-- 表格中利用插槽处理图标展示 -->
      <el-table-column prop="address" label="品牌操作">
        <template #="{ row, column, $index }">
          <el-button type="warning" icon="Edit" @click="updateTrademark"></el-button>
          <el-button type="danger" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block" style="margin-top: 10px">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
        :small="true" :background="true" layout="prev, pager, next,jumper,->, sizes,total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-card>

  <!-- Dailog对话框 -->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <el-form>
      <el-form-item label="品牌名称" label-width="80px" style="width:450px">
        <el-input autocomplete="off" placeholder="请输入品牌名称" v-model="trademarkForm.tmName"/>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px">
        <el-upload 
          class="avatar-uploader" 
          action="/api/admin/product/fileUpload"
          :show-file-list="true" 
          :on-success="handleAvatarSuccess" 
          :before-upload="beforeAvatarUpload">
          <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { reqBaseTrademark,reqAddorUpdateTrademark } from "@/api/product/trademark/index";
// 引入品牌列表ts类型
import type { TrademarkResponseData, Records ,TrademarkList,ResponseData} from '@/api/product/trademark/type'
// element-plus自带的上传图片ts类型
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(0);
// 品牌数据列表
const records = ref<Records>([]);
// 对话框是否显示
const dialogFormVisible = ref(false)
// 收集表单
const trademarkForm = reactive<TrademarkList>({
  tmName:'',
  logoUrl:'',
})

onMounted(() => {
  getBaseTrademark();
});

// 发送请求获取品牌列表
const getBaseTrademark = async () => {
  const result: TrademarkResponseData = await reqBaseTrademark(currentPage.value, pageSize.value);
  total.value = result.data.total;
  records.value = result.data.records;
};

// 当前页改变就会触发事件
const handleCurrentChange = () => {
  getBaseTrademark();
}

// 多少条改变就会触发事件
const handleSizeChange = () => {
  // 需要将当前页改为1比较好，可能页数没有怎么多了
  currentPage.value = 1
  getBaseTrademark();
}

// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true
}

// 修改品牌
const updateTrademark = () => {
  dialogFormVisible.value = true
}

// 取消
const cancel =() => {
  dialogFormVisible.value = false
}

// 确定
const confirm = async () =>{
  let result:ResponseData = await reqAddorUpdateTrademark(trademarkForm)
  console.log(result)
  if(result.code == 200) {
    ElMessage({
      type:'success',
      message:'添加品牌成功'
    })
  }else {

  }
  // dialogFormVisible.value = false
}


// 图片上传之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
    ElMessage.error('只支持 JPEG | PNG | GIF 格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }
  return true
}

// 图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  trademarkForm.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

</script>

<script lang="ts">
export default {
  name:'Tardemark'
}
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

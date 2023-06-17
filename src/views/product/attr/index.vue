<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>

    <el-card style="margin-top: 10px">
      <!-- 添加属性 -->
      <div v-show="scene === 1">
        <!-- 属性名称表单 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请输入你的属性名称" />
          </el-form-item>
        </el-form>
        <!-- 添加属性值、取消按钮 -->
        <el-button :disabled="attrParams.attrName.trim() ? false : true" type="primary" icon="Plus"
          @click="add" >添加属性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <!-- 属性表格 -->
        <el-table border style="margin:10px 0" :data="attrParams.attrValueList">
          <el-table-column type="index" prop="date" label="序号" width="180" />
          <el-table-column prop="name" label="属性值名称">
            <template #="{ row, column, $index }">
              <el-input 
                v-if="row.falg" 
                @blur="attrBlur(row,$index)" 
                :ref="(vc:any) => {inputAttr[$index] = vc}" 
                placeholder="请输入属性" 
                v-model="row.valueName"
              ></el-input>
              <div v-else @dblclick="attrDblclick(row,$index)">{{row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="属性值操作" width="180">
            <template #default={row,column,$index}>
              <el-button type="danger" icon="Delete" @click="del($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存、取消按钮 -->
        <el-button type="primary" :disabled="!attrParams.attrValueList.length > 0" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <!-- 属性列表数据 -->
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" :disabled="categoryStore.c3_ID ? false : true"
          @click="addAttr">添加平台属性</el-button>

        <el-table :data="attr" border style="width: 100%;margin-top:10px">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop='attrName' label="属性名称" width="120" />
          <el-table-column label="属性值名称">
            <template #default="{ row, column, $index }">
              <el-tag style="margin:5px" v-for="item in row.attrValueList" :key="item.attrId" class="ml-2"
                type="success">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template #="{ row, column, $index }">
              <!-- 修改品牌 -->
              <el-button type="warning" icon="Edit" @click="updateAtrr(row)"></el-button>
              
              <el-popconfirm title="是否删除属性?" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" icon="Delete" ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { attrResponseData, attrData,attrValueLists} from '@/api/product/atrr/type'
import { reqAttrInfoList, reqAddOrUpdateAtrr,reqDeleteAttr } from '@/api/product/atrr'
import useCategory from "@/store/category";
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import { ElMessage } from "element-plus";

// 三级分类仓库
const categoryStore = useCategory();
// 属性数据
let attr = ref<attrData[]>([])
// 定义card组件内容的切换
let scene = ref(0)
// 收集新增的属性的数据
let attrParams = reactive<attrData>({
  attrName: "",  // 新增的属性的名字
  attrValueList: [], // 新增的属性值数组
  categoryId: '',  // 代表的是几级分类ID
  categoryLevel: 3 // 代表的是几级分类
})
// 收集el-input组件
let inputAttr = ref<any>([])

// 监听三级分类的id,发送请求
watch(() => categoryStore.c3_ID, () => {
  // 清除
  attr.value = []
  // 判断是否
  if (!categoryStore.c3_ID) return
  getAttrInfoList()
})

// 请求属性数据
const getAttrInfoList = async () => {
  const { c1_ID, c2_ID, c3_ID } = categoryStore
  let result: attrResponseData = await reqAttrInfoList(c1_ID, c2_ID, c3_ID)
  if (result.code == 200) {
    attr.value = result.data
  }
}

// 添加平台属性按钮
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",  // 新增的属性的名字
    attrValueList: [], // 新增的属性值数组
    categoryId: '',  // 代表的是几级分类ID
    categoryLevel: 3 // 代表的是几级分类
  })
  scene.value = 1
  // 收集三级分类的id
  attrParams.categoryId = categoryStore.c3_ID
}

// 修改属性
const updateAtrr = (row:attrValueLists) => {
  scene.value = 1

  // 修改三级分类，显示对应的数据
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))

}

// 添加属性值
const add = () => {
  attrParams.attrValueList.push({ 
    valueName: '',
    falg:true 
  })

  nextTick(() =>{
    // 添加属性值时最后一个聚焦
    inputAttr.value[inputAttr.value.length-1].focus()
  })
}

// 取消
const cancel = () => {
  scene.value = 0
}

// 保存
const save = async () => {
  let result: any = await reqAddOrUpdateAtrr(attrParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '成功添加属性'
    })
  }
  // 重新获取属性列表
  getAttrInfoList()
  // 关闭添加
  scene.value = 0
}

// 失去焦点
const attrBlur =(row:attrValueLists,$index:number) => {
  // 非法情况1(不能为空)
  if(row.valueName.trim() == '' ){
    // 删除属性值为空的
    attrParams.attrValueList.splice($index,1)
    // 提示信息
    ElMessage({
      type:'error',
      message:'属性值不能为空'
    })
    return
  }
  // 非法情况2(不能相同)
  let repeat =  attrParams.attrValueList.find(item => {
    // 切记把当前失去焦点的属性值对象从当前数组扣除出去在判断
    if(item != row){
      return item.valueName === row.valueName
    }
  })
  if(repeat){
    attrParams.attrValueList.splice($index,1)
    // 提示信息
    ElMessage({
      type:'error',
      message:'属性值已存在'
    })
    return
  }
  row.falg = false

}

// 双击修改属性
const attrDblclick =(row:attrValueLists,$index:number) => {
  row.falg = true

  nextTick(() =>{
    // 双击修改聚焦
    inputAttr.value[$index].focus()
  })

}

// 删除属性值
const del = ($index:number) => {
  attrParams.attrValueList.splice($index,1)
}

// 修改三级分类中的属性
const deleteAttr =async  (id:number) => {
  const result = await reqDeleteAttr(id)
  if(result.code == 200){
    ElMessage({
      type:"success",
      message:'属性删除成功'
    })
    // 重新获取属性列表
    getAttrInfoList()
    console.log(result)
  }else{
    ElMessage({
      type:"error",
      message:'属性删除失败'
    })
  }
}

// 清除仓库中的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<script lang="ts">
export default {
  name: 'Attr'
}
</script>
<style scoped lang="scss"></style>

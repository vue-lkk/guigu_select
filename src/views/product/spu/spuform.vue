<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" v-model="supParams.spuName" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请你选择SPU品牌" v-model="supParams.tmId">
                <el-option v-for="item in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入SPU描述" v-model="supParams.description" />
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload 
            v-model:file-list="supImageList" 
            list-type="picture-card" 
            action="/admin/product/fileUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full alt="Preview Image" :src="dialogImageUrl"/>
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select placeholder="还有3个选择">
                <el-option label="Vivo" value="Vivo" />
                <el-option label="华为" value="华为" />
                <el-option label="苹果" value="苹果" />
            </el-select>
            <el-button type="primary" icon="Plus" style="margin-left:10px">添加销售属性</el-button>
            <el-table style="width: 100%;margin:10px 0px" border>
                <el-table-column prop="date" label="序号" width="180" type="index" />
                <el-table-column prop="name" label="属性名" width="180" />
                <el-table-column prop="address" label="属性值" />
                <el-table-column prop="address" label="操作" width="180" />
            </el-table>
            <el-button type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 请求接口
import {
    reqAllTradeMark,
    reqSpuImageList,
    reqSpuHasSaleAttr,
    reqAllSaleAttr
} from '@/api/product/spu'
// 请求返回数据的ts类型
import {
    supRecords, // spu列表数据类型
    AllTradeMark, // 品牌接口返回的数据的ts类型
    Trademark,
    SpuHasImg,//已有的SPU的照片墙数据的类型
    SpuImage,
    SaleAttrResponseData,//SPU已有的销售属性接口返回数据ts类型
    SaleAttr,
    HasSaleAttrResponseData,//已有的全部SPU销售属性的返回数据ts类型
    HasSaleAttr
} from '@/api/product/spu/type'
import { defineExpose } from 'vue'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const $emit = defineEmits(['spuChangeScene'])

// 存储已有的SPU对象 (修改是7个字段，添加是6个字段,添加没有id)
let supParams = ref<supRecords>({
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌ID
    spuSaleAttrList: [],  // 销售属性值
    spuImageList: [],  // 图片墙
})

let allTradeMark = ref<Trademark[]>([])
let supImageList = ref<SpuImage[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allAttr = ref<HasSaleAttr[]>([])

// 取消
const cancel = () => {
    $emit('spuChangeScene', 0)
}


const initHasSpuData = async (row: supRecords) => {
    // 存储已有的SPU对象，将来在模板中展示
    supParams.value = row

    //获取全部的SPU的品牌的数据
    const result1: AllTradeMark = await reqAllTradeMark()
    //获取某一个已有的SPU下全部商品的图片地址
    const result2: SpuHasImg = await reqSpuImageList(row.id as number)
    //获取某一个已有的SPU拥有多少个销售属性
    const result3: SaleAttrResponseData = await reqSpuHasSaleAttr(row.id as number)
    //获取整个项目全部的销售属性[颜色、版本、尺码]
    const result4: HasSaleAttrResponseData = await reqAllSaleAttr()

    // 全部的SPU的品牌的数据
    allTradeMark.value = result1.data
    // 某一个已有的SPU下全部商品的图片地址
    supImageList.value = result2.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    // 某一个已有的SPU拥有多少个销售属性
    saleAttr.value = result3.data
    // 整个项目全部的销售属性[颜色、版本、尺码]
    allAttr.value = result4.data
}
// 暴露方法
defineExpose({
    initHasSpuData
})
</script>

<style scoped></style>
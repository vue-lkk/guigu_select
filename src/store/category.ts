
import { reqCategory_1 } from '@/api/product/atrr'
import {defineStore} from 'pinia'
import type {categoryResponseData} from '@/api/product/attr/type'
import type {categoryState} from '@/store/type/type'

export default defineStore('category',{
    state:():categoryState => {
        return {
            c1_list:[], // 一级分类列表
            c1_ID:''    // 一级分类id
        }
    },
    actions:{
        // 获取一级分类
        async getcategory() {
            const result:categoryResponseData =await reqCategory_1()
            if(result.code == 200) {
                this.c1_list = result.data
            }else{

            }
        }
    },
    getters:{

    }
})
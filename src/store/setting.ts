import {defineStore} from 'pinia'

export default defineStore('setting',{
    state:() => {
        return{
            fold:false // 控制切换菜单区域是否展开
        }
    }
})
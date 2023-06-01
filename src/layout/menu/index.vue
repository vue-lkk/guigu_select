<template>
    <template v-for="(item, index) in menuList" :key="item.psth">
        <!--没有子路由-->
        <el-menu-item :index="item.path" v-if="!item.children" @click="goRoute">
            <template #title v-if="!item.meta.hidden">
                <!-- 图标 -->
                <el-icon>
                    <!-- 动态组件 -->
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.title}}</span>
            </template>
        </el-menu-item>

        <!-- 有子路由但是只有一个子路由 -->
        <el-menu-item :index="item.children[0].path" v-if="item.children && item.children.length == 1" @click="goRoute">
            <template #title v-if="!item.children[0].meta.hidden">
                <!-- 图标 -->
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <span>{{item.children[0].meta.title}}</span>
            </template>
        </el-menu-item>

        <!-- 有子路由且个数大于一个1 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title v-if="!item.children[0].meta.hidden">
                <!-- 图标 -->
                <el-icon>
                    <!-- 动态组件 -->
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.title}}</span>
            </template>
            <!-- 递归组件（处理多级菜单） -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
        
    </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
import { useRouter } from 'vue-router';
const $router = useRouter()

// 点击跳转到对应的二级路由
const goRoute =(vc) => {
    console.log(vc)
    $router.push(vc.index)
}


</script>

<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss">

</style>
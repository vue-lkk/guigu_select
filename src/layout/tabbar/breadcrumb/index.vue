<template>
    <div class="tabbar_left">
        <!-- 菜单折叠图标 -->
        <el-icon style="margin-right:10px" @click="toggles"> 
            <!-- 动态组件 -->
            <component :is="setStore.fold?'Fold':'Expand'"></component>
        </el-icon>
        <!-- <el-icon style="margin-right:10px">
            <Fold></Fold>
        </el-icon> -->
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/setting.ts'
const setStore = useSettingStore()

const toggles =() => {
    // 切换折叠菜单图标
    setStore.fold = !setStore.fold
}
</script>

<script lang="ts">
export default {
  name:'Breadcrumb'
}
</script>

<style scoped lang="scss"></style>
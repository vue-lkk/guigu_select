<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <!-- Logo -->
      <Logo></Logo>
      <!-- 滚动 -->
      <!-- <el-scrollbar class="scrollbar"> -->
        <!-- 菜单 -->
        <!-- <el-menu background-color="$base-menu-background" text-color="#fff">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item> -->
          <!-- 二级菜单 -->
          <!-- <el-sub-menu index="3">
            <template #title>权限管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
        </el-menu> -->
      <!-- </el-scrollbar> -->

      <el-scrollbar class="scrollbar">
        <el-menu style="border:none" background-color="$base-menu-background" text-color="#fff" collapse>
          <Menu :menuList="userStore.routes"></Menu>
        </el-menu>
      </el-scrollbar>

    </div>
    <!-- 头部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 中间内容 -->
    <div class="layout_main">
      <router-view v-slot="{ Component }">
        <!-- 过渡动画 -->
        <transition name="fade">
          <!-- 渲染layout一级路由组件的子路由 -->
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from '@/layout/menu/index.vue';

import useUserStore from "@/store/userStore.ts";
// 获取用户小仓库
const userStore = useUserStore();


</script>

<style lang="scss">
/*路由组件的过渡动画*/
.fade-enter-from{
  opacity: 0;
  scale: 0;
}
.fade-enter-active{
  transition: all 1s;
  
}
.fade-enter-to{
  opacity: 1;
  scale: 1;
}
.layout_container {
  width: 100%;
  height: 100vh;
  background: red;
  /*左侧菜单*/
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    /*滚动*/
    .scrollbar {
      color: #fff;
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
  }
  /*头部导航*/
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    background: rgb(5, 175, 226);
  }
  /*中间内容*/
  .layout_main {
    position: absolute;
    top: $base-tabber-height;
    left: $base-menu-width;
    padding: 20px;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    background: khaki;
    overflow: auto;
  }
}
</style>

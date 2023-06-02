<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class={fold:setStore.fold?true:false}>
      <!-- Logo -->
      <Logo></Logo>
      <!-- 菜单区域溢出可滚动 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          style="border: none"
          background-color="$base-menu-background"
          text-color="#fff"
          :default-active="$route.path"
          :collapse="setStore.fold"
          
        >
          <Menu :menuList="userStore.routes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 头部导航 -->
    <div class="layout_tabbar" :class={fold:setStore.fold?true:false}>
      <Tabbar></Tabbar>
    </div>
    <!-- 中间内容 -->
    <div class="layout_main" :class={fold:setStore.fold?true:false}>
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Tabbar from "@/layout/tabbar/index.vue"
import Main from '@/layout/main/index.vue'

import useUserStore from "@/store/userStore.ts";
import { useRoute } from "vue-router";
// 切换折叠菜单图标
import useSettingStore from '@/store/setting.ts'
const setStore = useSettingStore()

const $route = useRoute()
// 获取用户小仓库
const userStore = useUserStore();
</script>

<script lang="ts">
export default {
  name:'Layout'
}
</script>

<style lang="scss">
/*路由组件的过渡动画*/
.fade-enter-from {
  opacity: 0;
  scale: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  scale: 1;
}

.layout_container {
  width: 100%;
  height: 100vh;
  /*左侧菜单*/
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    /*滚动*/
    .scrollbar {
      color: #fff;
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
    &.fold{
      width: $base-menu-min-width;
    }
  }
  /*头部导航*/
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    transition: all 0.3s;
    &.fold{
      width: calc(100vw - $base-menu-min-width);
      /*因为之前有设置left偏移量,所以也需要重新设置*/
      left: $base-menu-min-width;
    }
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
    transition: all 0.3s;
    &.fold{
      width: calc(100vw - $base-menu-min-width);
      /*因为之前有设置left偏移量,所以也需要重新设置*/
      left: $base-menu-min-width;
    }
  }
}
.el-menu--popup-container{
  background: $base-menu-background;
}
</style>

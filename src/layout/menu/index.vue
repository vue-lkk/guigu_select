<template>
  <template v-for="item in menuList" :key="item.psth" class="menu_container">
    <!--没有子路由-->
    <el-menu-item
      :index="item.path"
      v-if="!item.children && item.path != '/login' && item.path != '/404'"
      @click="goRoute"
      :class="{ fold: setStore.fold ? true : false }"
    >
      <!-- 图标 -->
      <el-icon>
        <!-- 动态组件 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 插槽 -->
      <template #title v-if="!item.meta.hidden">
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 有子路由但是只有一个子路由 -->
    <el-menu-item
      :index="item.children[0].path"
      v-if="item.children && item.children.length == 1"
      @click="goRoute"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title v-if="!item.children[0].meta.hidden">
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 有子路由且个数大于一个1 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title v-if="!item.children[0].meta.hidden">
        <!-- 图标 -->
        <el-icon>
          <!-- 动态组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件（处理多级菜单） -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useSettingStore from "@/store/setting.ts";
const $router = useRouter();
defineProps(["menuList"]);

// 切换折叠菜单图标

const setStore = useSettingStore();

// 点击跳转到对应的二级路由  或者直接 使用 el-menu 中的router属性
const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>

<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped lang="scss">
.el-menu-item {
}
</style>

<template>
  <div class="tabbar_left">
    <!-- 菜单折叠图标 -->
    <el-icon style="margin-right: 10px" @click="toggles">
      <!-- 动态组件 -->
      <component :is="setStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
        v-show="item.meta.title"
      >
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import useSettingStore from "@/store/setting.ts";

const setStore = useSettingStore();

const $route = useRoute();

const toggles = () => {
  // 切换折叠菜单图标
  setStore.fold = !setStore.fold;
};
</script>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
}
</style>

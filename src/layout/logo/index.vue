<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
    <p :class="{ fold: setStore.fold ? true : false }">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/settings.js";
// 切换折叠菜单图标
import useSettingStore from "@/store/setting.ts";
const setStore = useSettingStore();
</script>

<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 13px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    flex: 1;
    font-size: $base-menu-logo-fontSize;
    margin-left: 10px;
    opacity: 1;
    transform: translateX(0) scale(1);
    
    transition: all .8s;
    &.fold {
      opacity: 0;
      transform: translateX(100px) scale(0);
      
    }
  }
}
</style>

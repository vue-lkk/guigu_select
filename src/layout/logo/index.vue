<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
    <p :class={fold:setStore.fold?true:false}>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/settings.js";
// 切换折叠菜单图标
import useSettingStore from '@/store/setting.ts'
const setStore = useSettingStore()
</script>

<script lang="ts">
export default {
  name:'Logo'
}
</script>

<style lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    flex: 1;
    font-size: $base-menu-logo-fontSize;
    margin-left: 10px;
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s;
    &.fold{
      opacity: 0;
      transform: scale(0);
    }
  }
}
</style>

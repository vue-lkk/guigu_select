<template>
  <router-view v-slot="{ Component }">
    <!-- 过渡动画 -->
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component"  v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import {watch,ref, nextTick} from 'vue'
import useSettingStore from "@/store/setting.ts";
const setStore = useSettingStore();
// 控制组件是否创建或销毁
const flag = ref(true)

// 监听仓库内部的refresh数据是否发生改变，如果改变了，说明用户点击过刷新按钮
watch(() => setStore.refresh,() => {
  // 点击刷新按钮：利路由组件销毁
  flag.value = false
  // 再次创建路由组件（最好别使用延迟器）
  nextTick(() => {
    flag.value = true
  })
})

</script>

<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped lang="scss"></style>

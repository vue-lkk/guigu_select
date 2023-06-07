<template>
  <div class="tabbar_right">
    <el-button icon="RefreshLeft" size="small" circle @click="refreshPage"></el-button>
    <el-button icon="FullScreen" size="small" circle @click="fullScreen"></el-button>
    <el-button icon="Setting" size="small" circle></el-button>
    <img :src="userStore.avatar" alt="" 
    style="width: 30px;
    height: 30px;
    margin: 0px 15px;
    border-radius: 20%;"/>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{userStore.username}}
        <el-icon class="el-icon-right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from "@/store/setting.ts";
const setStore = useSettingStore();
// 获取用户信息的小仓库
import useUserStore from '@/store/userStore.ts'
const userStore = useUserStore()
import {useRouter,useRoute} from 'vue-router'
const $router = useRouter()
const $route = useRoute()
import { ElNotification } from "element-plus";

// 刷新按钮
const refreshPage = () => {
  setStore.refresh = !setStore.refresh
}

// 全屏按钮
const fullScreen =() => {
  // DOM对象的一个刷新：可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  let full = document.fullscreenElement;
  if(!full) {
    // 全屏
    document.documentElement.requestFullscreen()
  }else{
    // 退出全屏
    document.exitFullscreen()
  }
}

// 退出登录
// 第一件事情：需要向服务器请求（退出登录接口）
// 第二件事情：清除用户名，头像，token
// 第三件事情：点击退出登录会从 首页 跳转到 登录页
const logout =async () => {
  try {
    await userStore.userLogout()
    // 记录退出的路径
    $router.push({path:'/login',query:{redirect:$route.path}})
    ElNotification({
      type: "success",
      message: "退出登录",
    });
  } catch (error) {
  }
  
  
}



</script>

<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style scoped lang="scss"></style>

<template>
  <div class="tabbar_right">
    <!-- 刷新 -->
    <el-button
      icon="RefreshLeft"
      size="small"
      circle
      @click="refreshPage"
    ></el-button>
    <!-- 全屏 -->
    <el-button
      icon="FullScreen"
      size="small"
      circle
      @click="fullScreen"
    ></el-button>
    <!-- 设置 -->
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="hover"
    >
      <!-- 表单 -->
      <el-form>
        <el-form-item label="主题颜色">
          <!-- 取色器 -->
          <el-color-picker
            @change="setColor"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <!-- 开关 -->
          <el-switch
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
      <!-- 插槽：设置图标 -->
      <template #reference>
        <el-button icon="Setting" size="small" circle></el-button>
      </template>
    </el-popover>

    <img
      :src="userStore.avatar"
      alt=""
      style="width: 30px; height: 30px; margin: 0px 15px; border-radius: 20%"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
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
import { ref } from "vue";
import useSettingStore from "@/store/setting.ts";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/userStore.ts";
import { ElNotification } from "element-plus";

const setStore = useSettingStore();
// 获取用户信息的小仓库
const userStore = useUserStore();
const $router = useRouter();
const $route = useRoute();

// 主题颜色
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

// 控制切换暗黑模式
const dark = ref(false);
// 切换暗黑模式
const changeDark = () => {
  // 获取到html
  const html = document.documentElement;
  // 更改模式
  dark.value ? (html.className = "dark") : (html.className = "");
};

// 设置主题颜色
const setColor = () => {
  console.log(color.value);
  // 通知js修改根节点的样式对象的属性与属性值
  // 获取到html
  const html = document.documentElement;
  // 更改主题颜色
  html.style.setProperty("--el-color-primary", color.value);
};

// 刷新按钮
const refreshPage = () => {
  setStore.refresh = !setStore.refresh;
};

// 全屏按钮
const fullScreen = () => {
  // DOM对象的一个刷新：可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  let full = document.fullscreenElement;
  if (!full) {
    // 全屏
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};

// 退出登录
// 第一件事情：需要向服务器请求（退出登录接口）
// 第二件事情：清除用户名，头像，token
// 第三件事情：点击退出登录会从 首页 跳转到 登录页
const logout = async () => {
  try {
    await userStore.userLogout();
    // 记录退出的路径
    $router.push({ path: "/login", query: { redirect: $route.path } });
    ElNotification({
      type: "success",
      message: "退出登录",
    });
  } catch (error) {}
};
</script>

<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style scoped lang="scss"></style>

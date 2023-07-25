<template>
  <div>
    <el-card class="box-card">
      <img :src="userStore.avatar" alt="" />
      <span>{{ getTime() }}好!{{ userStore.username }}</span>
    </el-card>
    <div class="svg-box">
      <svg-icon
        name="welcome"
        width="600px"
        height="300px"
        color="#000"
      ></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/userStore";
// 判断登录时间段
import { getTime } from "@/utils/getTime.ts";
const userStore = useUserStore();
</script>

<script lang="ts">
export default {
  name: "home",
};
</script>

<style scoped lang="scss">
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
span {
  font-size: 18px;
  font-weight: 700;
}
.svg-box {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>

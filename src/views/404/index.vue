<template>
  <div class="box">
    <div class="box_404">
      <img src="../../assets//images/error_images//404.png" alt="" />
    </div>
    <div>
      <el-button @click="gohome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();

// 跳转到首页
const gohome = () => {
  $router.push("/home");
};
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  .box_404 {
    width: 600px;
    height: 500px;
    overflow: hidden;
  }
}
</style>

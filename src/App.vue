<script setup lang="ts">
import { ref,onMounted } from "vue";
const color = ref("red");
import SvgIcon from "./components/SvgIcon.vue";
import request from "./utils/request";

onMounted(() => {
  request({
    url:"/user/login",
    method:'post',
    data:{
      username:'admin',
      password:'111111'
    }
  })
})
</script>

<template>
  <Home></Home>
  <h1>测试SVG</h1>
  <div>666</div>
  <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
  <SvgIcon name="moeny" color="green" width="30" height="30"></SvgIcon>
  <SvgIcon name="moeny" color="red" width="30" height="30"></SvgIcon>
  <SvgIcon name="moeny" color="pink" width="30" height="30"></SvgIcon>
</template>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: $base-color;
  h1 {
    color: $base-color;
  }
}
div{
  color:$base-color;
  background:$base-background;
  font-size: $font;
}
</style>

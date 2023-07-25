<template>
  <div class="top_container">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="conter">
      <span>智慧旅游可视化大数据平台</span>
    </div>
    <div class="right">
      <div class="rbtn">统计报告</div>
      <div class="time">当前时间：{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
const $router = useRouter();

// 时间
let timer = ref(0);
// 定时器
let time = ref(moment().format("YYYY-MM-DD h:mm:ss"));

onMounted(() => {
  createTime();
});

// 创建时间函数
function createTime() {
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY-MM-DD h:mm:ss");
  }, 1000);
}

// 组件卸载之前清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

// 跳转到首页
const goHome = () => {
  $router.push("/home");
};
</script>

<style scoped lang="scss">
.top_container {
  display: flex;
  width: 100%;
  .left {
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    flex: 1.5;
    .lbtn {
      width: 135px;
      height: 42px;
      text-align: center;
      line-height: 42px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: cover;
      color: aqua;
      float: right;
      cursor: pointer;
    }
  }
  .conter {
    flex: 3;
    height: 74px;
    background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: cover;
    text-align: center;
    color: aqua;
    line-height: 74px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .rbtn {
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: cover;
      width: 135px;
      height: 42px;
      color: aqua;
      text-align: center;
      line-height: 42px;
      cursor: pointer;
    }
    .time {
      color: aqua;
      padding-right: 20px;
    }
  }
}
</style>

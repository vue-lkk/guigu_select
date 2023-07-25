<template>
  <div class="container">
    <!-- 数据展示的区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="main">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from "@/views/screen/components/top/index.vue";
import Tourist from "@/views/screen/components/tourist/index.vue";
import Sex from "../screen/components/sex/index.vue";
import Age from "../screen/components/age/index.vue";
import Map from "../screen/components/map/index.vue";
import Line from "../screen/components/line/index.vue";
import Rank from "../screen/components/rank/index.vue";
import Couter from "../screen/components/couter/index.vue";
import Year from "../screen/components/year/index.vue";

const screen = ref();

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

// 计算出缩放倍数
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}

// 监听
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<script lang="ts">
export default {
  name: "screen",
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    transform-origin: left top;
    left: 50%;
    top: 50%;

    .top {
      display: flex;
      width: 90%;
      height: 40px;
      margin: auto;
    }

    .bottom {
      display: flex;
      width: 90%;
      margin: auto;
      color: aqua;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 1040px;

        .tourist {
          flex: 1.5;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .main {
        flex: 3;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .couter {
          flex: 1;
        }
      }
    }
  }
}
</style>

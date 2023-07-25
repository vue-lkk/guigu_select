<template>
  <div class="tourist_wapper">
    <div class="top">
      <div class="top_l">
        <span>实时游客统计</span>
        <span></span>
      </div>
      <div class="top_r">
        <span
          >可预约总量<span style="color: rgb(231, 79, 41); margin: 0 5px"
            >99999</span
          >人</span
        >
      </div>
    </div>
    <div class="watcher">
      <div class="person">
        <span v-for="(item, index) in num" :key="index">{{ item }}</span>
      </div>
      <div class="watcher_box" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// 引入echarts
import * as echarts from "echarts";
// 水球图拓展插件
import "echarts-liquidfill";

const num = ref<string>("213456人");
const charts = ref();

onMounted(() => {
  // 获取echarts类的实例
  let myChart = echarts.init(charts.value);
  console.log(myChart);
  // 设置实例的配置项
  myChart.setOption({
    series: [
      {
        type: "liquidFill",
        data: [0.6, 0.4, 0.3],
        color: ["rgb(0, 0, 155)", "#48e4e5"],
        radius: "85%",
        itemStyle: {
          opacity: 0.6,
        },

        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
        backgroundStyle: {
          color: "#c3f0f7",
        },
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: "none",
            borderColor: "#c3f0f7",
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: "#48e4e5",
          },
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.tourist_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;

  .top {
    display: flex;
    flex: 1;

    .top_l {
      flex: 1;
      padding: 8px;

      :nth-child(1) {
        color: #ffffff;
      }

      :nth-child(2) {
        width: 68px;
        height: 7px;
        display: block;
        margin-top: 5px;
        background: url("../../images/dataScreen-title.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .top_r {
      flex: 1;
      color: #ffffff;
      display: flex;
      align-items: end;
      padding-bottom: 13px;
    }
  }

  .watcher {
    flex: 4.5;
    display: flex;
    flex-direction: column;

    .person {
      display: flex;
      flex: 2;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      height: 50px;

      span {
        flex: 1;
        height: 50px;
        font-size: 25px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../images/total.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .watcher_box {
      flex: 5;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

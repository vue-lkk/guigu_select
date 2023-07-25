<template>
  <div class="line_wapper">
    <div class="top">
      <span> 未来30天游客容量趋势图</span>
      <span></span>
    </div>
    <!-- 折线图 -->
    <div class="line_charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 引入echarts
import * as echarts from "echarts";

const charts = ref();

onMounted(() => {
  let myChart = echarts.init(charts.value);
  myChart.setOption({
    // 组件标题
    title: {
      text: "游客容量趋势图",
      top: 20,
      left: 450,
      textStyle: {
        color: "#fff",
      },
    },
    // x轴
    xAxis: {
      show: true,
      type: "category",
      boundaryGap: false, //坐标轴两边留白策略
      // 坐标轴轴线
      axisLine: {
        show: true,
        // 坐标箭头
        symbol: "arrow",
        // 轴线样式
        lineStyle: {
          color: "skyblue",
        },
      },
      // 坐标轴刻度
      axisTick: {
        show: true,
      },
      splitLine: {
        // 坐标轴在 grid 区域中的分隔线。
        show: false,
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    // y轴
    yAxis: {
      show: true,
      // 坐标轴刻度
      axisTick: {
        show: true,
      },
      // 坐标轴轴线
      axisLine: {
        show: true,
        // 坐标箭头
        symbol: "arrow",
        // 轴线样式
        lineStyle: {
          color: "skyblue",
        },
      },
      splitLine: {
        // 坐标轴在 grid 区域中的分隔线。
        show: false,
      },
    },
    // 调整布局
    grid: {
      left: 60,
      right: 50,
      top: 80,
      bottom: 30,
    },
    // 系列
    series: [
      // 折线图
      {
        type: "line",
        data: [50, 623, 24, 208, 35, 147, 260],
        smooth: true, // 是否平滑曲线显示
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#fff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        type: "line",
        data: [0, 123, 24, 228, 455, 147, 60],
        smooth: true, // 是否平滑曲线显示
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#fff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "skyblue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        type: "line",
        data: [345, 13, 124, 22, 355, 647, 0],
        smooth: true, // 是否平滑曲线显示
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#fff", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "pink", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  });
});
</script>

<style scoped>
.line_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .top {
    flex: 1;
    color: #fff;
    padding-left: 8px;

    :nth-child(2) {
      width: 68px;
      height: 7px;
      display: block;
      margin-top: 5px;
      background: url("../../images/dataScreen-title.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .line_charts {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="couter_wapper">
    <div class="top">
      <span>年度游客量对比</span>
      <span></span>
    </div>
    <!-- 散点图 -->
    <div class="scatter_charts" ref="charts"></div>
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
    // 标题组件
    title: {
      // 主标题
      text: "散点图",
      left: "50%",
      textStyle: {
        color: "#fff",
        fontSize: 20,
      },
    },
    // x组件
    xAxis: {
      type: "category", // 图形在图标在x坐标轴均匀分布
      axisLine: {
        show: true,
      },
    },
    // y组件
    yAxis: {
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false,
      },
    },
    // 布局组件
    grid: {
      top: 50,
      left: 30,
      right: 30,
      bottom: 30,
    },
    // 系列
    series: [
      // 散点图组件
      {
        type: "scatter",
        data: [20, 30, 48, 10, 45],
        symbol: "diamond",
        symbolSize: 15,
        label: {
          color: "yellowgreen",
        },
        // 是否展示布局颜色
        showBackground: true,
        // 背景颜色样式
        backgroundStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#000", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        // 图形样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          // 函数单独设置柱条颜色
          color: function (data: any) {
            // 给每一个柱条设置颜色
            let arr = ["red", "orange", "green", "hotpink", "purple"];
            return arr[data.dataIndex];
          },
        },
      },
      // 散点图组件
      {
        type: "scatter",
        data: [2, 20, 18, 40, 8],
        symbol: "arrow",
        symbolSize: 15,
        label: {
          color: "yellowgreen",
        },
        // 是否展示布局颜色
        showBackground: true,
        // 背景颜色样式
        backgroundStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#000", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        // 图形样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          // 函数单独设置柱条颜色
          color: function (data: any) {
            // 给每一个柱条设置颜色
            let arr = ["red", "orange", "green", "hotpink", "purple"];
            return arr[data.dataIndex];
          },
        },
      },
    ],
  });
});
</script>

<style scoped>
.couter_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-rc.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
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

  .scatter_charts {
    width: 100%;
    height: 100%;
  }
}
</style>

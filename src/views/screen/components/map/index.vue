<template>
  <div class="map" ref="charts"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 引入echarts
import * as echarts from "echarts";
// 引入中国地图坐标数据
import chinaJson from "./china.json";

const charts = ref();

// 使用之前必须先注册中国地图
echarts.registerMap("china", chinaJson as any);

onMounted(() => {
  // 初始化
  let myChart = echarts.init(charts.value);
  // 设置配置项
  myChart.setOption({
    // 地图组件
    geo: {
      map: "china", //中国地图
      show: true, // 是否显示地图
      roam: true, // 是否开启鼠标缩放和平移漫游

      // 调整地图位置
      left: 30,
      top: 100,
      right: 30,
      bottom: -90,

      // 标签
      label: {
        show: true, // 省份是否显示
        // rotate:45, // 字体旋转45°
        color: "#fff", // 字体颜色
        fontSize: 14, // 字体大小
      },

      // 每一个多边形的样式
      itemStyle: {
        color: {
          type: "linear", // 线性渐变
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(139 222 235)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "blue", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8, //透明度
      },

      // 高亮状态下的多边形和标签样式
      emphasis: {
        label: {
          fontSize: 20,
          color: "yellow",
        },
        itemStyle: {
          color: "red",
        },
      },
    },
    // 调整布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    // 系列
    series: [
      {
        type: "lines", // 路径图
        data: [
          {
            // 坐标
            coords: [
              [87.617733, 43.792818], // 起点
              [112.549248, 37.857014], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              opacity: 0.1, // 尾迹线条透明度
              curveness: 0.4, // 尾迹线条曲直度
            },
          },
          {
            // 坐标
            coords: [
              [112.549248, 37.857014], // 起点
              [87.617733, 43.792818], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              opacity: 0.1, // 尾迹线条透明度
              curveness: -0.3, // 尾迹线条曲直度
            },
          },
          {
            // 坐标
            coords: [
              [121.509062, 25.044332], // 起点
              [112.549248, 37.857014], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              opacity: 0.1, // 尾迹线条透明度
              curveness: -0.2, // 尾迹线条曲直度
            },
          },
          {
            // 坐标
            coords: [
              [121.509062, 25.044332], // 起点
              [114.173355, 22.320048], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              cap: "round",
              opacity: 0.1, // 尾迹线条透明度
              curveness: -0.2, // 尾迹线条曲直度
            },
          },
          {
            // 坐标
            coords: [
              [121.509062, 25.044332], // 起点
              [103.823557, 36.058039], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              cap: "round",
              opacity: 0.1, // 尾迹线条透明度
              curveness: -0.2, // 尾迹线条曲直度
            },
          },
          {
            // 坐标
            coords: [
              [117.190182, 39.125596], // 起点
              [125.3245, 43.886841], // 终点
            ],
            // 线条样式
            lineStyle: {
              color: "#fff",
              width: 2,
              cap: "round",
              opacity: 0.1, // 尾迹线条透明度
              curveness: -0.2, // 尾迹线条曲直度
            },
          },
        ],

        // 是否显示特效
        effect: {
          show: true,
          symbolSize: 10,
          color: "yellow",
          symbol: "arrow",
          loop: true,
          trailLength: 0.1,
          period: 10,
        },
      },
    ],
  });
});
</script>

<style scoped></style>

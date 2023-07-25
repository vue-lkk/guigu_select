<template>
  <div class="rank_wapper">
    <div class="top">
      <span>热门景区排行</span>
      <span></span>
    </div>
    <!-- 柱状图 -->
    <div class="bar_charts" ref="charts"></div>
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
      text: "热门景区排行",
      link: "http://www.baidu.com",
      left: "50%",
      textStyle: {
        color: "#fff",
        fontSize: 20,
      },
      // 子标题
      subtext: "各大景区",
      // 子标题样式
      subtextStyle: {
        color: "yellowgreen",
      },
    },
    // x组件
    xAxis: {
      type: "category", // 图形在图标在x坐标轴均匀分布
      data: ["中心湖", "广州长隆", "迪士尼", "景德镇", "长城"],
    },
    // y组件
    yAxis: {},
    // 布局组件
    grid: {
      top: 50,
      left: 30,
      right: 30,
      bottom: 30,
    },
    // 系列
    series: [
      // 柱状图组件
      {
        type: "bar",
        data: [20, 30, 48, 10, 45],
        label: {
          show: true,
          position: "insideTop",
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
      // 折线图组件
      {
        type: "line",
        data: [10, 20, 58, 30, 15],
        // smooth:true,
        color: "#fff",
      },
    ],
  });
});
</script>

<style scoped>
.rank_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-rt.png") no-repeat;
  background-size: 100% 100%;

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

  .bar_charts {
    width: 100%;
    height: 100%;
  }
}
</style>

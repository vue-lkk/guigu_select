<template>
  <div class="couter_wapper">
    <div class="top">
      <span>数据统计</span>
      <span></span>
    </div>
    <!-- 雷达图 -->
    <div class="radar_charts" ref="charts"></div>
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
    title: {
      text: "雷达图",
      left: "50%",
      textStyle: {
        color: "#fff",
        fontSize: 20,
      },
    },
    // legend: {
    //     data: ['Allocated Budget', 'Actual Spending']
    // },

    radar: {
      // shape: 'circle',
      indicator: [
        { name: "消费", max: 6500 },
        { name: "好感度", max: 16000 },
        { name: "出行", max: 30000 },
        { name: "小吃", max: 38000 },
        { name: "爱好", max: 52000 },
        { name: "景点", max: 25000 },
      ],
    },
    series: [
      {
        // name: 'Budget vs spending',
        type: "radar",
        colorBy: "green",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
        label: {
          show: true,
          position: "insideTop ",
        },
        areaStyle: {
          color: "skyblue",
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
  background: url("../../images/dataScreen-main-rb.png") no-repeat;
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

  .radar_charts {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="age_wapper">
    <div class="top">
      <span> 年龄比例</span>
      <span></span>
    </div>
    <!-- 饼图 -->
    <div class="age_charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 引入echarts
import * as echarts from "echarts";

const charts = ref();

onMounted(() => {
  // 获取echarts类的实例
  let myChart = echarts.init(charts.value);
  console.log(myChart);
  // 设置实例的配置项
  myChart.setOption({
    // 标题
    // title: {
    //     text: '年龄比例',
    //     // 文本样式
    //     textStyle: {
    //         color: 'yellow'
    //     },
    // },
    // 提示框
    tooltip: {
      trigger: "item",
    },
    // 图例
    legend: {
      top: "10%",
      right: "13%",
      orient: "right",
      textStyle: {
        color: "#c3f0f7",
        fontStyle: "italic",
        fontSize: 16,
      },
    },
    // 系列
    series: [
      {
        name: "年龄比例",
        type: "pie",
        radius: ["60%", "30%"],
        center: ["35%", "43%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          fontSize: 16,
          position: "inside",
          color: "#fff",
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "军事" },
          { value: 735, name: "新闻" },
          { value: 580, name: "直播" },
          { value: 484, name: "娱乐" },
          { value: 300, name: "财经" },
        ],
      },
    ],
  });
});
</script>

<style scoped>
.age_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: -13px;

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

  .age_charts {
    height: 100%;
  }
}
</style>

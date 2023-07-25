<template>
  <div class="sex_wapper">
    <div class="top">
      <span>性别比例</span>
      <span></span>
    </div>
    <div class="main">
      <div class="manorwomen">
        <div class="man">
          <div class="title">男性</div>
          <img src="../../images/man.png" alt="" />
        </div>
        <div class="women">
          <div class="title">女性</div>
          <img src="../../images/woman.png" alt="" />
        </div>
      </div>

      <!-- 占比 -->
      <div class="proportion">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
      <!-- 条形图 -->
      <div class="sex_charts" ref="charts"></div>
    </div>
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
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      // 男性
      {
        type: "bar",
        data: [58],
        barWidth: 20, // 宽度
        z: 100, // 层级
        itemStyle: {
          color: "#007afe", // 柱条填充颜色
          borderRadius: 20, // 圆角
        },
      },
      // 女性
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        barGap: "-100%", // 柱条的位置
        itemStyle: {
          color: "#ff4b7a",
          borderRadius: 20,
        },
      },
    ],
  });
});
</script>

<style scoped>
.sex_wapper {
  display: flex;
  flex-direction: column;
  background: url("../../images/dataScreen-main-lc.png") no-repeat;
  background-color: 100% 100%;
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

  .main {
    flex: 4;
    margin-top: 30px;

    .manorwomen {
      display: flex;
      justify-content: space-around;

      .man,
      .women {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          width: 80px;
          text-align: center;
        }
      }

      .man {
        background: url("../../images/man-bg.png") no-repeat;
        background-size: 100% 100%;
      }

      .women {
        background: url("../../images/woman-bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .proportion {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
    }

    .sex_charts {
      display: flex;
      height: 45px;
      line-height: 45px;
    }
  }
}
</style>

<template>
  <div>
    <el-collapse>
      <el-collapse-item title="运行结果" name="1">
        <el-table :data="tableData" style="width: 100%" max-height="250">
          <el-table-column prop="total" label="总数" width="48" />
          <el-table-column prop="proportion" label="比例" width="48" />
          <el-table-column prop="drivingRoute" label="路线" width="48" />
          <el-table-column prop="trafficFlow" label="流量" width="48" />
          <el-table-column prop="runtime" label="总耗时" width="140" />
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="历史数据" name="2">
        <div id="runChart"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ref, watch, onMounted } from "vue";
import { ElMessage } from 'element-plus';
export default {
  // 读取父组件中的传递参数和运行判断
  props: ["isRun", "paramters"],
  setup(props) {
    //设定表中数据，初始为空
    const tableData = ref([]);
    //新建数组用于统计运行时间
    var index = 0;
    var runtimeTable = [];
    var runtimeShow = [];
    //表格数据生成函数，在计时开始时进行调用，动态生成表格
    const onAddItem = () => {
      tableData.value.push({
        total: props.paramters.totalNum,
        proportion: props.paramters.proportion,
        drivingRoute:props.paramters.drivingRoute,
        trafficFlow:props.paramters.trafficFlow,
        runtime: runtimeTable[index],
      });
    };
    const success = () => {
        ElMessage({
        showClose: true,
        message: '本次模拟完成',
        type: 'success',
      });
    };

    //引入echarts图表用于数据可视化分析
    onMounted(() => {
      var chartDom = document.getElementById("runChart");
      var myChart = echarts.init(chartDom);
      var option;
      //50辆车在不同智能车比例下的运行时间情况
      const car50Data = [
        ["0%", 1336],
        ["10%", 1009],
        ["30%", 935],
        ["50%", 867],
        ["80%", 731],
        ["100%", 680],
      ];
      //50%智能车比例在不同车辆总数下的运行时间情况
      const car50ProportionData = [
        ["10", 1090],
        ["30", 929],
        ["50", 735],
        ["80", 586],
        ["100", 286],
      ];
      //遍历读入数据
      const car50DataList = car50Data.map(function (item) {
        return item[0];
      });
      const car50DataValue = car50Data.map(function (item) {
        return item[1];
      });
      const car50ProportionDataList = car50ProportionData.map(function (item) {
        return item[0];
      });
      const car50ProportionDataValue = car50ProportionData.map(function (item) {
        return item[1];
      });
      //表格总体显示设置
      myChart.setOption({
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
          {
            show: false,
            type: "continuous",
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: car50DataList.length - 1,
          },
        ],
        //表格对齐方式及题头文本设置
        title: [
          {
            left: "center",
            text: "50辆车在不同比例下的表现",},
          {
            top: "50%",
            left: "center",
            text: "50%比例在不同车辆数下的表现",
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        //坐标轴数据导入
        xAxis: [
          {
            data: car50DataList,
          },
          {
            data: car50ProportionDataList,
            gridIndex: 1,
          },
        ],
        yAxis: [
          {},
          {
            gridIndex: 1,
          },
        ],
        grid: [
          {
            bottom: "60%",
          },
          {
            top: "60%",
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: car50DataValue,
          },
          {
            type: "line",
            showSymbol: false,
            data: car50ProportionDataValue,
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
        ],
      });
      window.onresize = function () {
        // 自适应大小
        myChart.resize();
      };
    });

    //计时器显示设置
    //runtime初始化
    watch(
      //观察isRun的变化情况，用于判断计时器的开始与停止
      ( ) => props.isRun,
      (newValue, oldValue) => {
        runtimeShow[index] = ref("00分00秒000毫秒");
        var int = null;
        runningTime();
        function runningTime() {
          //开始运行，计时器开始计时
          if (newValue === true && oldValue === false) {
            var minute, second;
            minute = second = 0;
            var millisecond = 0;
            runtimeTable[index] = runtimeShow[index];
            //为表格添加行
            onAddItem();
            //开始函数
            window.int = window.setInterval(timer, 50);
            //计时函数
            function timer() {
              millisecond = millisecond + 50;
              if (millisecond >= 1000) {
                millisecond = 0;
                second = second + 1;
              }
              if (second >= 60) {
                second = 0;
                minute = minute + 1;
              }
              //对runtime的赋值操作
              runtimeShow[index].value =
                minute + "分" + second + "秒" + millisecond + "毫秒";
            }
            //运行停止，清除计时器
          } else if (oldValue === true && newValue === false) {
            window.clearInterval(window.int);
            success()
            index++;
          }
        }
      }
    );
    return {
      runtimeShow,
      tableData,
      onAddItem,
      success,
    };
  },
};
</script>
<style lang="less" scoped>
h4 {
  text-align: center;
}
div {
  font-size: 14px;
  font-weight: 400;
}
#runChart {
  width: 275px;
  height: 400px;
}
.el-table {
  font-size: 10px;
  text-align: center;
}
</style>

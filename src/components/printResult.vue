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
      <el-collapse-item title="历史数据" name="2"><br/>
          <div class="charttxet">80辆车大流量下不同比例的运行结果</div><br/>
          <div id="runChart"></div>
          <div class="charttxet">80辆车小流量下不同比例的运行结果</div><br/>
          <div id="runChart01"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ref, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
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
      option = {
        legend: {
          data: [
            "0%智能车",
            "10%智能车",
            "30%智能车",
            "50%智能车",
            "80%智能车",
            "100%智能车",
            "100%智能车",
          ],
        },
        xAxis: {
          type: "category",
          data: [
            "测试1",
            "测试2",
            "测试3",
            "测试4",
            "测试5",
            "测试6",
          ],
        },
        //设置y轴坐标轴
        yAxis: {
          min: 8000,
          type: "value",
        },
        //读入测试数据，单位ms
        series: [
          {
            name: "0%智能车",
            data: [12695, 14035, 13490, 14050, 13435, 12200],
            type: "line",
          },
          {
            name: "30%智能车",
            data: [13100, 13640, 12335, 12570, 12050, 12710],
            type: "line",
          },
          {
            name: "50%智能车",
            data: [12290, 12490, 13225, 13005, 12880, 12400],
            type: "line",
          },
          {
            name: "80%智能车",
            data: [10900, 10385, 10400, 10725, 10520, 10570],
            type: "line",
          },
          {
            name: "100%智能车",
            data: [9840, 10225, 9615, 9800, 9625, 9735],
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
      var chartDom = document.getElementById("runChart01");
      var myChart = echarts.init(chartDom);
      option = {
        legend: {
          data: [
            "0%智能车",
            "10%智能车",
            "30%智能车",
            "50%智能车",
            "80%智能车",
            "100%智能车",
            "100%智能车",
          ],
        },
        xAxis: {
          type: "category",
          data: [
            "测试1",
            "测试2",
            "测试3",
            "测试4",
            "测试5",
            "测试6",
          ],
        },
        yAxis: {
          min: 17050,
          type: "value",
        },
        series: [
          {
            name: "0%智能车",
            data: [18190, 17980, 18395, 18120, 17945, 17900],
            type: "line",
          },
          {
            name: "30%智能车",
            data: [18130, 18075, 17895, 17850, 17875, 17800],
            type: "line",
          },
          {
            name: "50%智能车",
            data: [17990, 17620, 17790, 17800, 17750, 17775],
            type: "line",
          },
          {
            name: "80%智能车",
            data: [18085, 17580, 17685, 17750, 17470, 17680],
            type: "line",
          },
          {
            name: "100%智能车",
            data: [17685, 17480, 17270, 17500, 17520, 17320],
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    });

    //计时器显示设置
    //runtime初始化
    watch(
      //观察isRun的变化情况，用于判断计时器的开始与停止
      () => props.isRun,
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
            success();
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
  font-size: 12px;
  font-weight: 400;
}
#runChart {
  width: 275px;
  height: 250px;
}
#runChart01 {
  width: 275px;
  height: 250px;
}
.charttxet{
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
</style>

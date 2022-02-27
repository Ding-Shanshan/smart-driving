<template>
  <div>
    <h4>运行结果</h4>
    <h4 id=mytime>{{runtime}}</h4>
    <div id="runChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { ref,watch,onMounted } from 'vue'

export default {
  props:['isRun'],
  setup(props) {
        onMounted(() => { 
      var chartDom = document.getElementById('runChart');
      var myChart = echarts.init(chartDom);
      var option;
      const car50Data = [["0%", 1336], ["10%", 1009], ["30%", 935], ["50%", 867], ["80%", 731], ["100%", 680]];
      const car50ProportionData = [["10", 1090], ["30", 929], ["50", 735], ["80", 586],["100", 286]];
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
      myChart.setOption({
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        },
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: car50DataList.length - 1
        }
      ],
      title: [
        {
          left: 'center',
          text: '50辆车在不同比例下的表现'
        },
        {
          top: '50%',
          left: 'center',
          text: '50%比例在不同车辆数下的表现'
        }
      ],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          data: car50DataList
        },
        {
          data: car50ProportionDataList,
          gridIndex: 1
        }
      ],
      yAxis: [
        {},
        {
          gridIndex: 1
        }
      ],
      grid: [
        {
          bottom: '60%'
        },
        {
          top: '60%'
        }
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: car50DataValue
        },
        {
          type: 'line',
          showSymbol: false,
          data: car50ProportionDataValue,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    });
      window.onresize = function () { // 自适应大小
        myChart.resize();
      };
    });
  let runtime = ref('00分00秒000毫秒')
   watch(
     ( ) => props.isRun,
     (newValue,oldValue) => {
        var int = null;
        runningTime()
        function runningTime(){
            if(newValue === true && oldValue === false){
            var minute,second;
            minute = second = 0;
            var millisecond = 0;
            //开始函数
            window.int = window.setInterval(timer,50);
            //计时函数
            function timer()
            {
              millisecond=millisecond+50;
              if(millisecond>=1000)
                {
                  millisecond=0;
                  second=second+1;
                }
              if(second>=60)
                {
                  second=0;
                  minute=minute+1;
                }
              runtime.value = minute+'分'+second+'秒'+millisecond+'毫秒'
            }
          }
            else if(oldValue === true && newValue === false){
              window.clearInterval(window.int);
            }
        }
      }
  )
    return {
      runtime
    }

  //       //重置函数
  //       // function Reset()
  //       // {
  //       //   window.clearInterval(int);
  //       //   millisecond=hour=minute=second=0;
  //       //   '00分00秒000毫秒';
  //       // }
  //       // //暂停函数
  //       // function stop()
  //       // {
  //       //   window.clearInterval(int);
  //       // }
  //         }
  //       }
  //     },
  }
}
</script>
<style lang="less" scoped>
h4 {
    text-align: center;
}
div {
    font-size: 14px;
    font-weight: 400;
}
#runChart{
  width: 275px;
  height: 400px
}
</style>
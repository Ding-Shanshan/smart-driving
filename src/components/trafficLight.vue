<template>
  <div class="light" ref="myTraffic" id="light">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
</template>

<script>
import { ref, onMounted,watch } from "vue"
import { MyTrafficLight } from "@/assets/js/trafficLight.js"
export default {
  name: "TrafficLight",
  props:['isRun','trLight2'],
  setup(props) {
    const myTraffic = ref(null)
    var myTrafficLight = undefined
    onMounted(() => {
      // 使用ref获取交通信号灯
      // 传递dom容器，三种灯的时间 红 黄 绿
      
    }),
    watch([props],
      (newValue,oldValue)=>{
        if(props.isRun){
          // 开始运行
          if(props.trLight2==='默认'){
            // 传递dom容器，三种灯的时间 红 黄 绿
            myTrafficLight = new MyTrafficLight(
              myTraffic.value,
              5,
              1,
              5
            )
          } else if(props.trLight2==='绿灯'){
            myTrafficLight.changeColor('.green')
          }else if(props.trLight2==='红灯'){
            myTrafficLight.changeColor('.red')
          }
        }
        }
    )

    return {
      myTraffic,
    }
  },
}
</script>

<style lang="less" scoped>
.light {
  width: 0px;
  height: 120px;
  // margin-left: 10px; // 100
  margin-left:40px;
  margin-top:-55px;
  background-color: #666;
  border-radius: 10px;
  .red {
    display: inline-block;
    width: 10px;// 100
    height: 10px; // 100
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: red;
    background-image: radial-gradient(brown, transparent);
    box-shadow: 0 0 2px #111 inset, 0 0 5px red; //20 10
  }
  .yellow {
    display: inline-block;
    width: 10px; // 100
    height: 10px; // 100
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: yellow;
    background-image: radial-gradient(orange, transparent);
    box-shadow: 0 0 2px #111 inset, 0 0 5px yellow;
  }
  .green {
    display: inline-block;
    width: 10px; // 100
    height: 10px; // 100
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: green;
    background-image: radial-gradient(lime, transparent);
    box-shadow: 0 0 2px #111 inset, 0 0 5px lime;
  }
}
</style>
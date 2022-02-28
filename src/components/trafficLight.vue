<template>
  <div class="light" ref="myTraffic" id="light">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { MyTrafficLight } from "@/assets/js/trafficLight.js"
export default {
  name: "TrafficLight",
  setup() {
    const myTraffic = ref(null)
    onMounted(() => {
      // 使用ref获取交通信号灯
      // console.log(myTraffic.value)
      // 传递dom容器，三种灯的时间 红 黄 绿 
      const myTrafficLight = new MyTrafficLight(
        myTraffic.value,
        5000,
        2000,
        5000
      )
      myTrafficLight.main()
      
    })

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
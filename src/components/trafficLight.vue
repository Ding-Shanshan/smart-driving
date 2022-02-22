<template>
  <div class="light" ref="myTraffic">
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
      // 传递dom容器，三种灯的时间 绿 红 黄
      const myTrafficLight = new MyTrafficLight(
        myTraffic.value,
        2000,
        5000,
        3000
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
  width: 340px;
  height: 120px;
  margin-left: 100px;
  background-color: #666;
  border-radius: 10px;
  .red {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: red;
    background-image: radial-gradient(brown, transparent);
    box-shadow: 0 0 20px #111 inset, 0 0 10px red;
  }
  .yellow {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: yellow;
    background-image: radial-gradient(orange, transparent);
    box-shadow: 0 0 20px #111 inset, 0 0 10px yellow;
  }
  .green {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 50%;
    background-color: green;
    background-image: radial-gradient(lime, transparent);
    box-shadow: 0 0 20px #111 inset, 0 0 10px lime;
  }
}
</style>
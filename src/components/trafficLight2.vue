<template>
  <div class="light" ref="myTraffic">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue"
import { useStore } from "vuex"
// import { MyTrafficLight } from "@/assets/js/trafficLight2.js"
import { MyTrafficLight } from "../assets/js/trafficLightTest.js"

export default {
  name: "TrafficLight2",
  setup() {
    const myTraffic = ref(null)

    const store = useStore()
    // console.log(myTraffic.value) null

    onMounted(() => {
      // 使用ref获取交通信号灯
      // console.log(myTraffic.value)
      // 传递dom容器，三种灯的时间 红 黄 绿
      const myTrafficLightTwo = new MyTrafficLight(
        myTraffic.value,
        10000,
        3000,
        7000
      )
      myTrafficLightTwo.default("red")

      const lightTwo = computed(() => {
        return store.state.lightTwo
      })

      watch(lightTwo, (newVal) => {
        switch (newVal) {
          case "默认":
            if (store.state.lightOne === "默认") {
              console.log(newVal)
              // store.state.lightOne = "红色"
              // store.state.lightOne = "默认"
              store.commit("changeLightOne", "红色")
            }
            myTrafficLightTwo.default("red")
            store.commit("changeLightOne", "默认")
            break

          case "绿灯":
            myTrafficLightTwo.changeColor("green")
            break

          case "红灯":
            myTrafficLightTwo.changeColor("red")
            break
          default:
            break
        }
      })
    })

    return {
      myTraffic,
    }
  },
}
</script>

<style lang="less" scoped>
.light {
  width: 70px;
  height: 0px;
  margin-left: -55px; // 100
  margin-top: 30px; // 100
  background-color: #666;
  border-radius: 10px;
  .red {
    display: inline-block;
    width: 10px; // 100
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
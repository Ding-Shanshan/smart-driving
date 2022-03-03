<template>
  <!-- 横向 -->
  <div class="trafficLight" ref="myTrafficOne" id="trafficL0">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
  <!-- 纵向 -->
  <div class="trafficLight" ref="myTrafficTwo" id="trafficL1">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue"
import { useStore } from "vuex"
// import { MyTrafficLight } from "@/assets/js/trafficLight.js"
import { MyTrafficLight } from "../assets/js/trafficLightTest.js"

export default {
  name: "TrafficLight",
  setup() {
    // 两个路灯对象容器
    const myTrafficOne = ref(null)
    const myTrafficTwo = ref(null)

    // 使用vuex存储数据，
    const store = useStore()

    // 生命周期钩子
    onMounted(() => {
      // 传递dom容器，三种灯的时间 红 黄 绿
      const myTrafficLightOne = new MyTrafficLight(
        myTrafficOne.value,
        10000,
        3000,
        7000
      )
      const myTrafficLightTwo = new MyTrafficLight(
        myTrafficTwo.value,
        10000,
        3000,
        7000
      )
      // 路灯默认颜色
      myTrafficLightOne.default("green")
      myTrafficLightTwo.default("red")

      // 使用watch侦听数据变化
      watch(
        () => {
          // 监听路灯的状态
          return store.state.lightOne
        },
        (newVal) => {
          switch (newVal) {
            case "默认":
              if (store.state.lightTwo === "默认") {
                myTrafficLightTwo.default("red")
              }
              myTrafficLightOne.default("green")
              break

            case "绿灯":
              myTrafficLightOne.changeColor("green")
              break

            case "红灯":
              myTrafficLightOne.changeColor("red")
              break
            default:
              break
          }
        }
      )

      watch(
        () => {
          return store.state.lightTwo
        },
        (newVal) => {
          switch (newVal) {
            case "默认":
              if (store.state.lightOne === "默认") {
                myTrafficLightOne.default("green")
              }
              myTrafficLightTwo.default("red")
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
        }
      )
    })

    return {
      myTrafficOne,
      myTrafficTwo,
    }
  },
}
</script>

<style lang="less" scoped>
.trafficLight {
  width: 0px;
  height: 120px;
  position: absolute;
  top: 210px;
  left: 410px;
  // margin-left: 10px; // 100
  // margin-left: 40px;
  // margin-top: -55px;
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
#trafficL1 {
  width: 70px;
  height: 0px;
  // margin-left: -55px; // 100
  // margin-top: 30px; // 100
  top: 160px;
  left: 465px;
}
</style>
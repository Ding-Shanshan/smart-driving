<template>
  <div class="hello">
    <div class="MyCanvas">
      <canvas id="myCanvas" :width="W" :height="H"></canvas>
      <div class="legend">
        <div class="leg">
          <img  src="../assets/images/cars_normal.png" :width="carW" :heigth="carH" class="legcar" id="car_normal0"/>
          <p>普通驾驶车辆</p>
        </div><br/>
        <div class="leg">
          <img  src="../assets/images/cars_smart.png" :width="carW" :heigth="carH" class="legcar" id="car_smart0"/>
          <p>智能驾驶车辆</p>
        </div>
      </div>
      <div class="Light">
        <trafficLight  class="trafficLight" id="trafficL0"></trafficLight>
        <!-- 左右向红绿灯 -->
        <trafficLight2  class="trafficLight" id="trafficL1" ></trafficLight2>
        <!-- 上下向红绿灯 -->
      </div>
      <!-- <div class="trafficLight">
        <trafficLight></trafficLight>
      </div> -->
      <!-- <div class="111" style="width:10px;height:10px;position: absolute;left:440px;top:310px;background:red">

      </div> -->
    </div>
  </div>
</template>

<script>
import { Car } from "../assets/js/CreateNewCar"
import trafficLight from "@/components/trafficLight.vue"
import trafficLight2 from "@/components/trafficLight2.vue"
export default {
  name: 'SmartDriving',
  components:{
      trafficLight,
      trafficLight2
    },
  props: {
    msg: String
  },
  data() {
    return {
      // H : Math.trunc((window.screen.availHeight - 200)/100)*100,
      // W : Math.trunc((window.screen.availWidth  - 300)/100)*100,
      H : 500,
      W : 1000,
      RoadW:60,
      carW:10,
      carH:20,
      car1X:524,
      car1Y:490,
      AllCar : [],
      obstructs : {}
      }
  },
  methods: {
    setCanvasDivWAndH() {
      let canvasDiv = document.getElementsByClassName("MyCanvas")[0];
      canvasDiv.style.width = this.W + "px";
      canvasDiv.style.height = this.H + "px";
    },
    setTrafficLXAndY(){
      // 上下方向红绿灯
      let trafficL = document.getElementsByClassName("trafficLight")[1];
      trafficL.style.top = (this.H/2-this.RoadW-32) + "px";
      trafficL.style.left = (this.W/2+this.RoadW - 4) + "px"; 
      // 左右方向红绿灯
      let trafficL2 = document.getElementsByClassName("trafficLight")[0];
      trafficL2.style.top = (this.H/2 + this.RoadW + 16) + "px";
      trafficL2.style.left = (this.W/2 - this.RoadW -50) + "px";
    },
    //绘制路面
    drawLine(x,y,x1,y1){
        this.context.moveTo(x, y);
        this.context.lineTo(x1, y1);
        this.context.stroke(); // 画线
    },
    // 绘制起始地等方块,可以通过点击起始地，创建目的地随机的，固定类型的车辆
    // 目前只完成点击D，生成目的地为A的普通车辆
    drawStartPosition(positions,p) {
      //对于要绘制的每一个图像执行函数，
      for(let idx = 0;idx<positions.length;idx++) {
        this.context.beginPath();
        this.context.fillStyle = positions[idx].color;
        this.context.fillRect(positions[idx].x, positions[idx].y, positions[idx].width, positions[idx].height);
        this.context.rect(positions[idx].x, positions[idx].y, positions[idx].width, positions[idx].height);
        this.context.stroke();
        if (p && this.context.isPointInPath(p.x, p.y)) {
          //如果传入了事件坐标，就用isPointInPath判断一下，如果事件坐标在当前的图像里，就把当前图像的index放进数组里保存
          if(idx === 1) {
            this.drawDToA(this,this.W / 2 + 25,this.H - 100);
          }
        }

      }
    },

    textConnection(data) {
      console.log(data)
      let normalCarTargetNum = parseInt(data.totalNum) * parseFloat(data.proportion)
      let smartCarTargetNum = parseInt(data.totalNum) - normalCarTargetNum
      // let normalCarTargetNum = 2;
      // let smartCarTargetNum = 0;
      let normalCarCurNum = 0;
      let smartCarCurNum = 0;
      let Types = ["NormalCar","SmartCar"];
      let rootSelf = this;
      let globalid = setInterval(createIdxAndobjs,2000);
      function createIdxAndobjs(){
        // 测试
        // if(rootSelf.AllCar.length === parseInt(data.totalNum)){
        //   clearInterval(globalid);
        // }
        if(normalCarCurNum + smartCarCurNum === parseInt(data.totalNum)){
          clearInterval(globalid);
        }
        else{
          let Places = ["A","B","C","D"];
          // 测试注释
        let sourceIdx = Math.floor(Math.random()*4);
        let targetIdx = Math.floor(Math.random()*4);
        let targetPlace = Places[targetIdx];
        let sourcePlace = Places[sourceIdx];
        // let targetPlace = "A";
        // let sourcePlace = "B";
        while(targetPlace === sourcePlace) {
          sourceIdx = Math.floor(Math.random()*4);
          targetIdx = Math.floor(Math.random()*4);
          targetPlace = Places[targetIdx];
          sourcePlace = Places[sourceIdx];
        }
        // let sourcePlace = Places[0];
        //  let targetPlace = Places[1];
        let carIdx = document.getElementsByTagName("img").length-2;
        // let car = Car.createNewCar("Normal","A",targetPlace,carIdx);
        let car = undefined
        if( normalCarCurNum < normalCarTargetNum && smartCarCurNum < smartCarTargetNum){
          let carTypeIdx = Math.floor(Math.random() * Types.length);
          if(Types[carTypeIdx] === "NormalCar"){
            normalCarCurNum++;
          } 
          else{
            smartCarCurNum++;
          }
          car = Car.createNewCar(rootSelf,Types[carTypeIdx],sourcePlace,targetPlace,carIdx);
          rootSelf.AllCar[carIdx] = car; 
          console.log(normalCarTargetNum,smartCarTargetNum,normalCarCurNum,smartCarCurNum)
        }
        else if(normalCarCurNum < normalCarTargetNum){
          car = Car.createNewCar(rootSelf, "NormalCar",sourcePlace,targetPlace,carIdx); 
          normalCarCurNum++;
          rootSelf.AllCar[carIdx] = car; 
          console.log(normalCarTargetNum,smartCarTargetNum,normalCarCurNum,smartCarCurNum)
        }
        else if(smartCarCurNum < smartCarTargetNum){
          car = Car.createNewCar(rootSelf, "SmartCar",sourcePlace,targetPlace,carIdx); 
          smartCarCurNum++;
          rootSelf.AllCar[carIdx] = car; 
          console.log(normalCarTargetNum,smartCarTargetNum,normalCarCurNum,smartCarCurNum)
        }
        console.log(car);
        
        if(rootSelf.AllCar[carIdx].sourcePlace === "D" && rootSelf.AllCar[carIdx].targetPlace ==="A"){
          // 暂时直行
          // rootSelf.AllCar[carIdx].drawDToA(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "D" && rootSelf.AllCar[carIdx].targetPlace==="C") {
          rootSelf.AllCar[carIdx].drawDToC(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "D" && rootSelf.AllCar[carIdx].targetPlace==="B") {
          // rootSelf.AllCar[carIdx].drawDToB(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        } 
        if(rootSelf.AllCar[carIdx].sourcePlace === "D" && rootSelf.AllCar[carIdx].targetPlace==="D") {
          ;
        }

        if(rootSelf.AllCar[carIdx].sourcePlace === "A" && rootSelf.AllCar[carIdx].targetPlace==="D") {
          // rootSelf.AllCar[carIdx].drawAToD(rootSelf, 100, rootSelf.H / 2 + 20);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "A" && rootSelf.AllCar[carIdx].targetPlace==="C") {
          // rootSelf.AllCar[carIdx].drawAToC(rootSelf, 100, rootSelf.H / 2 + 20);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "A" && rootSelf.AllCar[carIdx].targetPlace==="B") {
          rootSelf.AllCar[carIdx].drawAToB(rootSelf, 100, rootSelf.H / 2 + 20);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "A" && rootSelf.AllCar[carIdx].targetPlace==="A") {
          ;
        }

        if(rootSelf.AllCar[carIdx].sourcePlace === "C" && rootSelf.AllCar[carIdx].targetPlace==="D") {
          rootSelf.AllCar[carIdx].drawCToD(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "C" && rootSelf.AllCar[carIdx].targetPlace==="A") {
          // rootSelf.AllCar[carIdx].drawCToA(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "C" && rootSelf.AllCar[carIdx].targetPlace==="B") {
          // rootSelf.AllCar[carIdx].drawCToB(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "C" && rootSelf.AllCar[carIdx].targetPlace==="C") {
          ;
        }

        if(rootSelf.AllCar[carIdx].sourcePlace === "B" && rootSelf.AllCar[carIdx].targetPlace==="D") {
          // rootSelf.AllCar[carIdx].drawBToD(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "B" && rootSelf.AllCar[carIdx].targetPlace==="A") {
          rootSelf.AllCar[carIdx].drawBToA(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "B" && rootSelf.AllCar[carIdx].targetPlace==="B") {
          ;
        }
        if(rootSelf.AllCar[carIdx].sourcePlace === "B" && rootSelf.AllCar[carIdx].targetPlace==="C") {
          // rootSelf.AllCar[carIdx].drawBToC(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        }
      }
    }
  },
  mounted(){
    this.setCanvasDivWAndH();
    const canvas = document.querySelector('canvas');
    this.context = canvas.getContext('2d');
    this.context.beginPath();
    this.context.strokeStyle = 'White'; // 线条颜色
    this.context.lineWidth = 1.0;
    // 画实线
    //左侧路的上下沿
    this.drawLine(100, this.H/2-this.RoadW,this.W/2-this.RoadW, this.H/2-this.RoadW);
    this.drawLine(100, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H/2+this.RoadW);
    //右侧路的上下沿
    this.drawLine(this.W/2+this.RoadW, this.H/2-this.RoadW,this.W-100, this.H/2-this.RoadW)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W-100, this.H/2+this.RoadW)
    //上方路的左右边
    this.drawLine(this.W/2-this.RoadW, 100,this.W/2-this.RoadW, this.H/2-this.RoadW)
    this.drawLine(this.W/2+this.RoadW, 100,this.W/2+this.RoadW, this.H/2-this.RoadW)
    //下方路的左右边
    this.drawLine(this.W/2-this.RoadW, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H-100)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W/2+this.RoadW, this.H-100)
    //重复代码，意义不明
    // this.drawLine(this.W/2-this.RoadW, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H-10)
    // this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W/2+this.RoadW, this.H-10)
    this.context.setLineDash([5, 5]) // 上下左右道路中间的虚线
    this.drawLine(this.W/2, 100,this.W/2, this.H/2-this.RoadW)
    this.drawLine(this.W/2, this.H/2+this.RoadW,this.W/2, this.H-100)
    this.drawLine(100, this.H/2,this.W/2-this.RoadW, this.H/2)
    this.drawLine(this.W/2+this.RoadW, this.H/2,this.W-100, this.H/2)

    //绘制位置坐标：A、B、C、D作为上右下左的路口起始位置
    let startPositions = [
      {x: 40, y: this.H/2 - this.RoadW - 10, width: 60, height: 140, color: "#abb8c3"},//左
      {x: this.W - 100, y: this.H/2 - this.RoadW - 10, width: 60, height: 140, color: "#cf2e2e"},//右
      {x: this.W/2-this.RoadW - 10, y: 40, width: 140, height: 60, color: "#00d084"},//上
      {x: this.W/2-this.RoadW - 10, y: this.H - 100, width: 140, height: 60, color: "#9b51e0"}//下
    ]
    this.startPositions = startPositions;
    this.drawStartPosition(startPositions);
    //绑定点击事件，当点击彩色区域时，会创建新的车的实例
    // this.initClickEvent();
    this.setTrafficLXAndY();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
    position: relative;
    margin: 20px auto;
}
#myCanvas{
  // width:1008px;
  // height:540px;
  position: absolute;
  background: #3F6FBB;
}
.MyCanvas {
  position: relative;
}
.legend{
  position:absolute;
  left:50px;
  bottom:20px;
}
.legcar{
  float:left;
  margin:20px;
  display:inline;
}
p{
  color:#fff;
  font-size: 12px;
  text-align: center;
  line-height:30px;
  display:inline;
  float:left;
}
.leg{
  float:left;
}
.NormalCar {
    position: absolute;
}
.trafficLight {
  position: absolute;
  top: 50%;
  left: 48%;
  transform: translate(-50%, -50%);
}


</style>

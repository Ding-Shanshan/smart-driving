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
        <!-- <trafficLight2  class="trafficLight" id="trafficL1" ></trafficLight2> -->
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
      H:652,
      W:1000,
      RoadW:60,
      carW:10,
      carH:20,
      car1X:524,
      car1Y:490,
      AllCar : [],
      carIdx : 0,
      // obstructsInAllRoads : {

      // },
      obstructsInAllRoads : [],
      obstructsInEachRoad : {

      },
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
      // trafficL.style.top = (this.H/2-this.RoadW-32) + "px";
      // trafficL.style.left = (this.W/2+this.RoadW - 4) + "px"; 
      trafficL.style.top = 260 + "px"
      trafficL.style.left = 465 + "px"
      // 左右方向红绿灯
      let trafficL2 = document.getElementsByClassName("trafficLight")[0];
      // trafficL2.style.top = (this.H/2 + this.RoadW + 16) + "px";
      // trafficL2.style.left = (this.W/2 - this.RoadW -50) + "px";
      trafficL2.style.top = 286 + "px"
      trafficL2.style.left = 430 + "px"
    },
    //绘制道路边缘线
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
     // 绘制路面
    drawRoad(){
      this.context.beginPath();
      this.context.fillStyle = '#1851B1';//#3F6FBB
      this.context.fillRect(100, this.H/2-this.RoadW, this.W-200, this.RoadW*2);
      // this.context.fillStyle = '#3F6FBB';
      this.context.fillRect(this.W/2-this.RoadW, 100, this.RoadW*2, this.H-200);
      // this.context.rect(positions[idx].x, positions[idx].y, positions[idx].width, positions[idx].height);
    },
    textConnection(data) {
      //获取兄弟组件中传过来的参数，通过总数和百分比计算出普通车和智能车的数量
      let smartCarTargetNum = parseInt(data.totalNum) * parseFloat(data.proportion)
      let normalCarTargetNum = parseInt(data.totalNum) - smartCarTargetNum
      // 车辆行驶方式（直线/直线+转弯）
      let drivingRoute=data.drivingRoute;
      // 生成车辆的时间间隔
      let trafficFlow = parseInt(data.trafficFlow) * 1000;
      // let normalCarTargetNum = 2;
      // let smartCarTargetNum = 0;
      //已经生成的两类车的数量
      let normalCarCurNum = 0;
      let smartCarCurNum = 0;
      //车的类别
      let Types = ["NormalCar","SmartCar"];
      let rootSelf = this;
      let globalid = setInterval(createIdxAndobjs,trafficFlow);
      function createIdxAndobjs(){
        // 测试
        
        if(normalCarCurNum + smartCarCurNum === parseInt(data.totalNum)){
          clearInterval(globalid);
        }
        else{
        let Places = ["A","B","C","D"];
        let sourceIdx;
        let targetIdx;
        // 行驶路线为直线+转弯
        if(drivingRoute==1)
        {
           sourceIdx = Math.floor(Math.random()*4);
           targetIdx = Math.floor(Math.random()*4);
        }else{
        // 行驶路线为直线
          sourceIdx = Math.floor(Math.random()*4);
          switch(sourceIdx){
            case 0:targetIdx=1;break;
            case 1:targetIdx=0;break;
            case 2:targetIdx=3;break;
            case 3:targetIdx=2;break;
            default:break;
          }
        }
         // 避免起点终点重叠
         if(targetIdx===sourceIdx){
           targetIdx=(targetIdx+1)%4;
         }
         let targetPlace = Places[targetIdx];
         let sourcePlace = Places[sourceIdx];
      //  let sourcePlace = Places[3];
       //  let targetPlace = Places[2];
        // let carIdx = document.getElementsByTagName("img").length-2;
        // let car = Car.createNewCar("Normal","A",targetPlace,carIdx);
        let car = undefined
        if((sourcePlace+targetPlace) in rootSelf.obstructsInAllRoads){
          ;
        }
        else{
          rootSelf.obstructsInAllRoads[sourcePlace+targetPlace] = [];
        }
        // console.log(rootSelf.obstructsInAllRoads[sourcePlace+targetPlace]);
        //两者都少于预期生成的数量时，随机生成
        if( normalCarCurNum < normalCarTargetNum && smartCarCurNum < smartCarTargetNum){
          let carTypeIdx = Math.floor(Math.random() * Types.length);
          if(Types[carTypeIdx] === "NormalCar"){
            normalCarCurNum++;
          } 
          else{
            smartCarCurNum++;
          }
          car = Car.createNewCar(rootSelf,Types[carTypeIdx],sourcePlace,targetPlace,rootSelf.carIdx);
          rootSelf.AllCar[rootSelf.carIdx] = car; 
        }//一旦有一个生成数量够了，就只生成另一种
        else if(normalCarCurNum < normalCarTargetNum){
          car = Car.createNewCar(rootSelf, "NormalCar",sourcePlace,targetPlace,rootSelf.carIdx); 
          normalCarCurNum++;
          rootSelf.AllCar[rootSelf.carIdx] = car; 
        }
        else if(smartCarCurNum < smartCarTargetNum){
          car = Car.createNewCar(rootSelf, "SmartCar",sourcePlace,targetPlace,rootSelf.carIdx); 
          smartCarCurNum++;
          rootSelf.AllCar[rootSelf.carIdx] = car; 
        }

        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "D" && rootSelf.AllCar[rootSelf.carIdx].targetPlace ==="A"){
          rootSelf.AllCar[rootSelf.carIdx].drawDToA(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "D" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="C") {
          rootSelf.AllCar[rootSelf.carIdx].drawDToC(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "D" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="B") {
          rootSelf.AllCar[rootSelf.carIdx].drawDToB(rootSelf,rootSelf.W / 2 + (rootSelf.RoadW-rootSelf.carW)/2 ,rootSelf.H - 100);
        } 
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "D" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="D") {
          ;
        }

        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "A" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="D") {
          rootSelf.AllCar[rootSelf.carIdx].drawAToD(rootSelf, 100, rootSelf.H / 2 + ((rootSelf.RoadW - rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "A" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="C") {
          rootSelf.AllCar[rootSelf.carIdx].drawAToC(rootSelf, 100, rootSelf.H / 2 + ((rootSelf.RoadW - rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "A" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="B") {
          rootSelf.AllCar[rootSelf.carIdx].drawAToB(rootSelf, 100, rootSelf.H / 2 + ((rootSelf.RoadW - rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "A" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="A") {
          ;
        }

        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "C" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="D") {
          rootSelf.AllCar[rootSelf.carIdx].drawCToD(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "C" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="A") {
          rootSelf.AllCar[rootSelf.carIdx].drawCToA(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "C" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="B") {
          rootSelf.AllCar[rootSelf.carIdx].drawCToB(rootSelf, rootSelf.W / 2 -rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2), 100);
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "C" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="C") {
          ;
        }

        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "B" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="D") {
          rootSelf.AllCar[rootSelf.carIdx].drawBToD(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "B" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="A") {
          rootSelf.AllCar[rootSelf.carIdx].drawBToA(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "B" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="B") {
          ;
        }
        if(rootSelf.AllCar[rootSelf.carIdx].sourcePlace === "B" && rootSelf.AllCar[rootSelf.carIdx].targetPlace==="C") {
          rootSelf.AllCar[rootSelf.carIdx].drawBToC(rootSelf, rootSelf.W - 100, rootSelf.H / 2 - rootSelf.RoadW + ((rootSelf.RoadW-rootSelf.carW)/2));
        }
        }
        rootSelf.carIdx++;
      }
    }
  },
  mounted(){
    this.setCanvasDivWAndH();
    const canvas = document.querySelector('canvas');
    this.context = canvas.getContext('2d');
    this.context.beginPath();
    this.drawRoad();
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
    // 防止道路线画成虚线，所以画两次
    this.drawLine(this.W/2-this.RoadW, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H-100)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W/2+this.RoadW, this.H-100)
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

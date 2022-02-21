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
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartDriving',
  props: {
    msg: String
  },
  data() {
    return {
      H : Math.trunc((window.screen.availHeight - 200)/100)*100,
      W : Math.trunc((window.screen.availWidth  - 300)/100)*100,
      RoadW:60,
      carW:10,
      carH:20,
      car1X:524,
      car1Y:490,
      }
  },
  methods: {
    setCanvasDivWAndH() {
      let canvasDiv = document.getElementsByClassName("MyCanvas")[0];
      canvasDiv.style.width = this.W + "px";
      canvasDiv.style.height = this.H + "px";
    },
    //绘制路面
    drawLine(x,y,x1,y1){
        this.context.moveTo(x, y);
        this.context.lineTo(x1, y1);
        this.context.stroke(); // 画线
    },
    //绘制起始地等方块,可以通过点击起始地，创建目的地随机的，固定类型的车辆
    //目前只完成点击D，生成目的地为A的普通车辆
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
          if(idx === 3) {
            this.drawDToA(this,this.W / 2 + 25,this.H - 100);
          }
        }

      }
    },
    //获取当前鼠标点击的像素位置
    getEventPosition(ev) {
      let x, y;
      if (ev.layerX || ev.layerX == 0) {
          x = ev.layerX;
          y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera
          x = ev.offsetX;
          y = ev.offsetY;
      }
      return { x: x, y: y };
    },
    //初始化事件，绑定点击的动作
    initClickEvent() {
      let canvas = document.querySelector('canvas');
      console.log("初始化点击事件");
      let _self = this;
      canvas.onclick = function fn1(e){
          var p = _self.getEventPosition(e);
          console.log(p);
          _self.drawStartPosition(_self.startPositions,p);
      }
    },
    //绘制从D向A出发的普通车辆
    drawDToA(_self,sx,sy) {
        let tx = sx;
        let ty = sy;
        let len =  document.getElementsByTagName("img").length;
        let curIdx = len - 2;
        let id = setInterval(frame,80);
        function frame() {
            if(ty === _self.H/2 + _self.RoadW) {
                clearInterval(id);
                //调用旋转方法
                let normalCar = document.getElementsByClassName("NormalCar"+curIdx)[0];
                normalCar.classList.add("trans");
                let flag = 0;
                setTimeout(function() {
                  flag = 1;
                },3500);
                function checkFlag() {
                  if(flag === 1){
                    clearInterval(checkIdx);
                    _self.drawRightToLeftLines(_self,_self.W / 2 + 5 + _self.carH, _self.H / 2 + _self.RoadW,curIdx);
                  }
                }
                let checkIdx = setInterval(checkFlag,80);
                
            }
            else{
                ty = sy - 2;
                sx = tx;
                sy = ty;
                let father = document.getElementsByClassName("MyCanvas")[0];
                let normalCar = document.createElement("img");
                normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
                normalCar.setAttribute("width","10");
                normalCar.setAttribute("height","20");
                normalCar.setAttribute("class","NormalCar"+curIdx);
                normalCar.style.position = "absolute";
                normalCar.style.left = (sx+20) + "px";
                normalCar.style.top = sy + "px";
                try {
                    father.removeChild(document.getElementsByClassName('NormalCar'+curIdx)[0]);
                }
                catch(err) {
                    console.log("there is no img");
                }
                father.appendChild(normalCar);

            }
        }
    },
    //绘制从D向C出发的普通车辆
    drawDToC(_self,sx,sy) {
        let tx = sx;
        let ty = sy;
        let len =  document.getElementsByTagName("img").length;
        let curIdx = len - 2;
        let id = setInterval(frame,80);
        function frame() {
            if(ty === 80) {
                clearInterval(id);
                console.log("stopped");
            }
            else{
                ty = sy - 2;
                sx = tx;
                sy = ty;
                let father = document.getElementsByClassName("MyCanvas")[0];
                let normalCar = document.createElement("img");
                normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
                normalCar.setAttribute("width","10");
                normalCar.setAttribute("height","20");
                normalCar.setAttribute("class","NormalCar"+curIdx);
                normalCar.style.position = "absolute";
                normalCar.style.left = (sx+20) + "px";
                normalCar.style.top = sy + "px";
                try {
                    father.removeChild(document.getElementsByClassName('NormalCar'+curIdx)[0]);
                }
                catch(err) {
                    console.log("there is no img");
                }
                father.appendChild(normalCar);
            }
        }
    },
    //绘制从D向B出发的普通车辆
    drawDToB(_self,sx,sy) {
        let tx = sx;
        let ty = sy;
        let len =  document.getElementsByTagName("img").length;
        let curIdx = len - 2;
        let id = setInterval(frame,80);
        function frame() {
            if(ty === _self.H / 2 + _self.RoadW) {
                clearInterval(id);
                console.log("stopped");
                //调用旋转方法
                let normalCar = document.getElementsByClassName("NormalCar"+curIdx)[0];
                normalCar.classList.add("transToRight");
                let flag = 0;
                setTimeout(function() {
                  flag = 1;
                },3500);
                function checkFlag() {
                  if(flag === 1){
                    clearInterval(checkIdx);
                    _self.drawLeftToRightLines(_self,_self.W / 2 + 5 + _self.carH,_self.H / 2 + _self.RoadW,curIdx);
                  }
                }
                let checkIdx = setInterval(checkFlag,80);
                
            }
            else{
                ty = sy - 2;
                sx = tx;
                sy = ty;
                let father = document.getElementsByClassName("MyCanvas")[0];
                let normalCar = document.createElement("img");
                normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
                normalCar.setAttribute("width","10");
                normalCar.setAttribute("height","20");
                normalCar.style.cssText = `position: absolute;`;
                normalCar.setAttribute("class","NormalCar"+curIdx);
                normalCar.style.position = "absolute";
                normalCar.style.left = (sx+20) + "px";
                normalCar.style.top = sy + "px";
                try {
                    father.removeChild(document.getElementsByClassName('NormalCar'+curIdx)[0]);
                }
                catch(err) {
                    console.log("there is no img");
                }
                father.appendChild(normalCar);
            }
        }
    },
    //绘制车辆从右向左移动
    drawRightToLeftLines(_self,sx,sy,idx) {
        let tx = sx;
        let ty = sy;
        let normalCar = document.getElementsByClassName("NormalCar"+idx)[0];
        let r2l = setInterval(frame,80);
        function frame() {
            if(tx === 220) {
                clearInterval(r2l);
                console.log("stopped");
            }
            else{
                sx = tx;
                sy = ty;
                normalCar.style.left = tx + "px";
                normalCar.style.top = ty + "px";
                tx = sx - 2;
            }
        }
    },
    //绘制车辆从左向右移动
    drawLeftToRightLines(_self,sx,sy,idx) {
        let tx = sx;
        let ty = sy;
        let normalCar = document.getElementsByClassName("NormalCar"+idx)[0];
        let r2l = setInterval(frame,80);
        function frame() {
            if(tx === 1360) {
                clearInterval(r2l);
                console.log("stopped");
            }
            else{
                sx = tx;
                sy = ty;
                normalCar.style.left = tx + "px";
                normalCar.style.top = ty + "px";
                tx = sx + 2;
            }
        }
    },
    textConnection(data) {
      console.log(data);
      console.log("传来的方向");
      if(data["sourcePlace"] === "D" && data["targetPlace"]==="A"){
        this.drawDToA(this,this.W / 2 + 5 ,this.H - 100);
      }
      if(data["sourcePlace"] === "D" && data["targetPlace"]==="C") {
        this.drawDToC(this,this.W / 2 + 5,this.H - 100);
      }
      if(data["sourcePlace"] === "D" && data["targetPlace"]==="B") {
        this.drawDToB(this,this.W / 2 + 5,this.H - 100);
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
    this.initClickEvent();
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
  line-height:60px;
  display:inline;
  float:left;
}
.leg{
  float:left;
}
.NormalCar {
    position: absolute;
}

</style>

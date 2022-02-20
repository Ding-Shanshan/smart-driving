<template>
  <div class="hello">
    <canvas id="myCanvas" :width="W" :height="H" ></canvas>
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
</template>

<script>
import imgSrc1 from '../assets/images/cars_normal.png'
import imgSrc2 from '../assets/images/cars_smart.png'
export default {
  name: 'SmartDriving',
  props: {
    msg: String
  },
  data() {
    return {
      H:540,
      W:1008,
      RoadW:60,
      carW:20,
      carH:40,
      car1X:524,
      car1Y:490    
      }
  },
  methods: {
    drawLine(x,y,x1,y1){
      this.context.moveTo(x, y);
      this.context.lineTo(x1, y1);
      this.context.stroke(); // 画线
   },
  },
  mounted(){
    const canvas = document.querySelector('canvas')
    this.context = canvas.getContext('2d')
    var context1 = canvas.getContext('2d')
    this.context.beginPath();
    this.context.strokeStyle = 'White'; // 线条颜色
    this.context.lineWidth = 1.0;
    // 画实线
    this.drawLine(100, this.H/2-this.RoadW,this.W/2-this.RoadW, this.H/2-this.RoadW)
    this.drawLine(100, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H/2+this.RoadW)
    this.drawLine(this.W/2+this.RoadW, this.H/2-this.RoadW,this.W-100, this.H/2-this.RoadW)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W-100, this.H/2+this.RoadW)
    this.drawLine(this.W/2-this.RoadW, 10,this.W/2-this.RoadW, this.H/2-this.RoadW)
    this.drawLine(this.W/2+this.RoadW, 10,this.W/2+this.RoadW, this.H/2-this.RoadW)
    this.drawLine(this.W/2-this.RoadW, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H-10)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W/2+this.RoadW, this.H-10)
    this.drawLine(this.W/2-this.RoadW, this.H/2+this.RoadW,this.W/2-this.RoadW, this.H-10)
    this.drawLine(this.W/2+this.RoadW, this.H/2+this.RoadW,this.W/2+this.RoadW, this.H-10)
    this.context.setLineDash([5, 5]) // 虚线
    this.drawLine(this.W/2, 10,this.W/2, this.H/2-this.RoadW)
    this.drawLine(this.W/2, this.H/2+this.RoadW,this.W/2, this.H-10)
    this.drawLine(100, this.H/2,this.W/2-this.RoadW, this.H/2)
    this.drawLine(this.W/2+this.RoadW, this.H/2,this.W-100, this.H/2)
    // 画车车
    var img1 = new Image();
    img1.src=imgSrc1;
    var y1=530;
    img1.onload=function(){
      var timeInt=setInterval(function(){
        context1.clearRect(524,y1,20,40)
         y1=y1-1;
         context1.drawImage(img1,524,y1,20,40)
          if(y1<-20)
          {
           context1.clearRect(524,y1,20,40)
          clearInterval(timeInt)
          }
        //  console.log("111")
      },20)
     
    }

    var img2 = new Image();
    img2.src=imgSrc2;
    var y2=530;
    var x2=464;
    var deg2=0;
    img2.onload=function(){
           
      var timeInt=setInterval(function(){
        //  context1.clearRect(x2,y2,20,40)
          if(y2>320)
          {
            
            context1.clearRect(x2,y2,20,40)
            y2=y2-1;
            context1.drawImage(img2,464,y2,20,40)
             
          }
          if(y2<=320&&y2>=310)
          {
             context1.save()
             context1.save()
             context1.translate(x2,y2)
             context1.rotate(-deg2*Math.PI/180);
             context1.clearRect(-1,-1,22,42)
             context1.restore();
              x2=x2-0.5;
             y2=y2-0.2;
            deg2=deg2+(90/51);
            context1.translate(x2,y2)
            context1.rotate(-deg2*Math.PI/180);
           context1.clearRect(2,1,20,40)
            context1.fill()
            context1.drawImage(img2,0,0,20,40)
           
            context1.restore();
          }
          if(y2<310){
            
           context1.save();
            // context1.clearRect(-20,-10,30,50)
           context1.clearRect(x2,y2-20,42,22)
            x2=x2-1;
            context1.translate(x2,y2)
            context1.rotate(-90*Math.PI/180);
            context1.drawImage(img2,0,0,20,40)
            context1.restore();
            
          }
          if(x2<60)
          {
            context1.clearRect(x2,y2-20,42,22)
            clearInterval(timeInt)
          }
      },10)
     
    }
    // var img = document.getElementById("car_normal0")
    // this.context.drawImage(img,524,490,20,40)
    // img.src = '../assets/cars_normal.png';
    // setTimeout(function(){this.context.drawImage(img,0,0)},1000)
    // this.W/2+this.RoadW/2-this.carW/2
    // setInterval(function(){ 
    //   this.car1Y=this.car1Y-5 
    //   }, 1000);

    
      
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
    position: relative;
    margin: 20px auto;
}
#myCanvas{
  width:1008px;
  height:540px;
  background: #3F6FBB;
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
</style>

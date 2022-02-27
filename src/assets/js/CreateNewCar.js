import { createStructuralDirectiveTransform } from "@vue/compiler-core";
import {intersectionBTOA,intersectionATOB,intersectionCTOD,intersectionDTOC} from "./intersection.js"
var number = 0;
function carNumber( ){
    number = number+1;
    console.log(number);
}


let Car = {
    createNewCar: function(type, sourcePlace, targetPlace, index) {
        let car = {};
        car.type = type;
        car.sourcePlace = sourcePlace;
        car.targetPlace = targetPlace;
        car.index = index;
        //获取红绿灯
        let light=document.querySelectorAll('#trafficL0')
        let lightlist=light[0].childNodes;
        let light1=document.querySelectorAll('#trafficL1')
        let lightlist1=light1[0].childNodes;
        // console.log(lightlist[0].style.opacity)
        car.showInfo = function() {
            console.log(car.type, car.sourcePlace, car.targetPlace);
        };
        car.drawDToA = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (ty === _self.H / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
                    normalCar.classList.add("trans");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawRightToLeftLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW, car.index);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";

                }
            }
        };
        //绘制车辆从右向左移动
        car.drawRightToLeftLines = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
            let r2l = setInterval(frame, 80);

            function frame() {
                if (tx <= 100) {
                    clearInterval(r2l);
                    carNumber();
                } else {
                    // 红绿灯
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                    tx = sx - 2;
                }
            }
        };
        car.drawDToB = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (ty === _self.H / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
                    normalCar.classList.add("transToRight");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawLeftToRightLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        //绘制车辆从左向右移动
        car.drawLeftToRightLines = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
            let r2l = setInterval(frame, 80);

            function frame() {
                if (tx >= _self.W - 100) {
                    clearInterval(r2l);
                    carNumber();
                } else {
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                    tx = sx + 2;
                }
            }
        };
        car.drawDToC = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag=1;    //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate=0;   //加速速度
            let slowdown=2;     //减速速度
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (ty === 100) { 
                    clearInterval(id);
                    carNumber();
                } else {
                     // jxd
                     console.log(ty)
                     if(ty===360)
                     {
                         // 判断路口情况 jxd
                          flag=intersectionDTOC(ty,lightlist1);
                     }
                     // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                     switch(flag){
                         case 0:break;    //停车
                         case 1: ty = sy - 2; sx = tx;sy = ty;break;    //正常行驶
                         case 2: if(slowdown<=0)
                                 {  
                                     flag=intersectionDTOC(ty,lightlist1);   
                                 }else{
                                     slowdown=slowdown-0.04; ty = sy - slowdown; sx = tx;sy = ty;
                                 }
                                 break;   //减速,每次速度减0.1，速度为0时,状态改为停车
                         case 3:accelerate=accelerate+0.04;ty = sy - accelerate; sx = tx;sy = ty;
                                 if(accelerate>=2)
                                         {
                                             flag=1;
                                         }
                                 break;   //加速,速度到达2时，状态变为正常行驶
                         default:break;
                         }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawAToD = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (tx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
                    normalCar.classList.add("transToDown");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH, car.index);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    tx = sx + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawTopToDownLines = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
            let r2l = setInterval(frame, 80);

            function frame() {
                if (ty >= _self.H - 100) {
                    clearInterval(r2l);
                    carNumber();
                } else {
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                }
            }
        };
        car.drawAToC = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (tx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
                    normalCar.classList.add("transToTop");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH, car.index);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    tx = sx + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";

                }
            }
        };
        car.drawDownToTopLines = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
            let r2l = setInterval(frame, 80);

            function frame() {
                if (ty <= 100) {
                    clearInterval(r2l);
                    carNumber();
                } else {
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                }
            }
        };
        car.drawAToB = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag=1;    //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate=0;   //加速速度
            let slowdown=2;     //减速速度

            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (tx === _self.W - 100) {
                    clearInterval(id);
                    carNumber();
                } else {
                      // jxd
                      if(tx===370)
                      {
                          // 判断路口情况 jxd
                           flag=intersectionATOB(tx,lightlist);
                      }
                      // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                      switch(flag){
                          case 0:break;    //停车
                          case 1: tx = sx + 2;sx = tx;sy = ty;break;    //正常行驶
                          case 2: if(slowdown<=0)
                                  {  
                                      flag=intersectionATOB(tx,lightlist);   
                                  }else{
                                      slowdown=slowdown-0.04; tx=sx+slowdown; sx=tx;sy=ty; 
                                  }
                                  break;   //减速,每次速度减0.1，速度为0时,状态改为停车
                          case 3:accelerate=accelerate+0.04;tx = sx + accelerate;sx = tx;sy = ty;
                                  if(accelerate>=2)
                                          {
                                              flag=1;
                                          }
                                  break;   //加速,速度到达2时，状态变为正常行驶
                          default:break;
                                        }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawCToB = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (ty === _self.H / 2 - _self.carH - _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
                    normalCar.classList.add("transTopToRight");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawLeftToRightLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), _self.H / 2 - _self.carH - _self.RoadW, car.index);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawCToA = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (ty === _self.H / 2 - _self.RoadW - _self.carH) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar" + car.index)[0];
                    normalCar.classList.add("transToLeft");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawRightToLeftLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), self.H / 2 - _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawCToD = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag=1;    //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate=0;   //加速速度
            let slowdown=2;     //减速速度
            normalCar.setAttribute("src", "/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", "NormalCar" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (ty === _self.H - 100) {
                    clearInterval(id);
                    carNumber();
                } else {
                    // jxd
                    console.log(ty)
                    if(ty===118)
                    {
                        // 判断路口情况 jxd
                         flag=intersectionCTOD(ty,lightlist1);
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch(flag){
                        case 0:break;    //停车
                        case 1: ty = sy + 2; sx = tx;sy = ty;break;    //正常行驶
                        case 2: if(slowdown<=0)
                                {  
                                    flag=intersectionCTOD(ty,lightlist1);   
                                }else{
                                    slowdown=slowdown-0.04; ty = sy + slowdown; sx = tx;sy = ty;
                                }
                                break;   //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:accelerate=accelerate+0.04;ty = sy + accelerate; sx = tx;sy = ty;
                                if(accelerate>=2)
                                        {
                                            flag=1;
                                        }
                                break;   //加速,速度到达2时，状态变为正常行驶
                        default:break;
                        }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawBToC = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (tx === _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
                    normalCar.classList.add("transRightToTop");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2));
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawBToD = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 80);

            function frame() {
                if (tx === _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow" + car.index)[0];
                    normalCar.classList.add("transRightToDown");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2));
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawBToA = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag=1;    //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate=0;   //加速速度
            let slowdown=2;     //减速速度

            normalCar.setAttribute("src", require("../images/cars_normal90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", "NormalCarRow" + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow' + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);
            function frame() {
                if (tx === 100) {
                    carNumber();
                    clearInterval(id);
                } else {
                    // jxd
                    if(tx===610)
                    {
                        // 判断路口情况 jxd
                         flag=intersectionBTOA(tx,lightlist);
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch(flag){
                        case 0:break;    //停车
                        case 1: tx = sx - 2;sx = tx;sy = ty;break;    //正常行驶
                        case 2: if(slowdown<=0)
                                {  
                                    flag=intersectionBTOA(tx,lightlist);   
                                }else{
                                    slowdown=slowdown-0.04; tx=sx-slowdown; sx=tx;sy=ty; 
                                }
                                break;   //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:accelerate=accelerate+0.04;tx = sx - accelerate;sx = tx;sy = ty;
                                if(accelerate>=2)
                                        {
                                            flag=1;
                                        }
                                break;   //加速,速度到达2时，状态变为正常行驶
                        default:break;
                        }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    }
                   
                }
            
        };
        return car;
    }
}

export {
    Car,number
}
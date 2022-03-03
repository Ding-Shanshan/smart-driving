import { createStructuralDirectiveTransform } from "@vue/compiler-core";
import { del } from "vue-demi";
import { intersectionBTOA, intersectionATOB, intersectionCTOD, intersectionDTOC, intersectionDTOA, intersectionATOC, intersectionCTOB, intersectionBTOD } from "./intersection.js"
var number = 0;

function carNumber() {
    number = number + 1;
}
// 路口直行车组
let downToUpCars=new Array(); // 路口中从下到上的车
let upToDownCars=new Array(); // 路口中从上到下的车
let rightToLeftCars=new Array(); // 路口中从右到左的车
let leftToRightCars=new Array(); // 路口中从左到右的车
// 右转大队
let downToRightCars=new Array();
let upToLeftCars=new Array();
let leftToDownCars=new Array(); // 路口中从左到下的车
let rightToUpCars=new Array(); // 路口中右到上的车
// 左转大队
let downToLeftCars=new Array(); // 路口中从下到左的车
let upToRightCars=new Array();
let rightToDownCars=new Array();
let leftToUpCars=new Array();

let Car = {
    createNewCar: function(rootSelf, type, sourcePlace, targetPlace, index) {
        let car = {};
        car.type = type;
        car.sourcePlace = sourcePlace;
        car.targetPlace = targetPlace;
        car.index = index;
        car.rootSelf = rootSelf
        if (car.type === "NormalCar") {
            car.img = "cars_normal";
            car.speed = 1;
        } else {
            car.img = "cars_smart";
            car.speed = 2;
        }
        //获取红绿灯
        let light = document.querySelectorAll('#trafficL0')
        let lightlist = light[0].childNodes;
        let light1 = document.querySelectorAll('#trafficL1')
        let lightlist1 = light1[0].childNodes;
        car.showInfo = function() {
        };
        // 下到左左转
        car.drawDToA = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // sign用来记录车辆行驶状态，0停车，1正常速度，2减速，3加速
            let sign = 1;
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    let ifCar=upToDownCars.length===0&&upToLeftCars.length===0&&upToRightCars.length===0;
                    if (sy === 360) {
                        // 判断对面是否有车
                        if(ifCar){
                            // 判断路口情况 jxd
                            sign = intersectionDTOC(sy, lightlist1);
                        }else{
                            sign=2;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if (sy <= 310) {
                                sign = intersectionDTOA(sy, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            if (sy <= 310) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionDTOA(sy, lightlist1);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sy = sy - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            downToLeftCars.push(car.index);
                            clearInterval(id);
                            //加上旋转属性
                            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                            normalCar.classList.add("trans");
                            let flag = 0;
                            setTimeout(function() {
                                downToLeftCars.shift();
                                flag = 1;
                            }, 3500);

                            function checkFlag() {
                                if (flag === 1) {
                                    clearInterval(checkIdx);
                                    car.drawRightToLeftLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW, car.index);
                                }
                            }
                            let checkIdx = setInterval(checkFlag, 80);
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";

                }
            }
        };
        //绘制车辆从右向左移动
        car.drawRightToLeftLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sx <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    // 红绿灯
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    sx = sx - car.speed;
                }
            }
        };
        // 下到右右转
        car.drawDToB = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy === _self.H / 2 + _self.RoadW) {
                    downToRightCars.push(car.index);
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("transToRight");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                        downToRightCars.shift();
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawLeftToRightLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    sy = sy - car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        //绘制车辆从左向右移动
        car.drawLeftToRightLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sx >= _self.W - 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);

                } else {
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    sx = sx + car.speed;
                }
            }
        };
        // 下到上 直行
        car.drawDToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].length;
            _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].push(car.y);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar=upToRightCars.length===0&&rightToUpCars.length===0;
                if (sy <= 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx];
                } else {
                    if (_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] !== undefined) {
                        if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    // jxd
                    if (sy === 360) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            flag = intersectionDTOC(sy, lightlist1);
                        }else{
                            flag=2;
                        }
                    }else if(sy === 310){
                        downToUpCars.push(car.index);
                    }else if(sy === 190){
                        downToUpCars.shift();
                    if (obsFlag === 2 || flag === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            if (sx == 310) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green") {
                                    flag = 1;
                                } else {
                                    flag = 2;
                                }
                            }
                            if (obsFlag === 2 || flag === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30 || sx == 310) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3
                                }
                                if(ifCar){
                                    flag = intersectionDTOC(sy, lightlist1);
                                }
                                if (obsFlag === 2 || flag === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sy = sy - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            sy = sy - accelerate;
                            if (accelerate >= car.speed) {
                                if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            } else {
                                if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.y = sy;
                    _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx] = car.y;
                }
            }
        
        
        };
        car.drawAToD = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    leftToDownCars.push(car.index);
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("transToDown");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                        leftToDownCars.shift();
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH, car.index);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    sx = sx + car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
            
        };
        car.drawTopToDownLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sy >= _self.H - 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    sy = sy + car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 左到上左转
        car.drawAToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let sign = 1;
            let slowdown = 2; //减速速度
            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    // 判断是否有车
                    let ifCar=rightToLeftCars.length===0&&rightToUpCars.length===0&&rightToDownCars.length===0;
                    if (sx === 370) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionATOC(sx, lightlist);
                        }else{
                            sign=2;
                        }
                    }
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if (sx >= 420) {
                                sign = intersectionATOC(sx, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            if (sx >= 420) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionATOC(sx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sx = sx + slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            leftToUpCars.push(car.index);
                            //加上旋转属性
                            clearInterval(id);
                            //加上旋转属性
                            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                            normalCar.classList.add("transToTop");
                            let flag = 0;
                            setTimeout(function() {
                                flag = 1;
                                leftToUpCars.shift();
                            }, 3500);

                            function checkFlag() {
                                if (flag === 1) {
                                    clearInterval(checkIdx);
                                    car.drawDownToTopLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH, car.index);
                                }
                            }
                            let checkIdx = setInterval(checkFlag, 80);
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";




                }
            }
        };
        car.drawDownToTopLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sy <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    sy = sy - car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawAToB = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            let obsFlag = 1;

            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.padding = " 0px 3px 0px 3px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.x = sx;
            car.pathIdx = _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].length;
            _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].push(car.x);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar=rightToDownCars.length===0&&downToRightCars.length===0;
                if (sx >= _self.W - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx];
                } else {
                    if (_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] !== undefined) {
                        if (car.x + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    // jxd
                    if (sx === 370) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionATOB(sx, lightlist);
                        }else{
                            sign=2;
                        }
                    }
                    if (obsFlag === 2 || sign === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if (car.x + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            if (sx == 420) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green") {
                                    sign = 1;
                                } else {
                                    sign = 2;
                                }
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if (car.x + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] || sx == 420) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.x + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                                if(ifCar){
                                    sign = intersectionATOB(sx, lightlist);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sx = sx + slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            sx = sx + accelerate;
                            if (accelerate >= car.speed) {
                                if (car.x + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            } else {
                                if (car.x + 30 <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx] = car.x;
                }
            }
        };
        // 上到右左转
        car.drawCToB = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let sign = 1;
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    let ifCar=downToUpCars.length===0&&downToLeftCars.length===0&&downToRightCars.length===0;
                    if (sy === 118) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionCTOB(sy, lightlist1);
                        }else{
                            sign=2;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if (sy > 168) {
                                sign = intersectionCTOB(sy, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            if (sy > 168) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionCTOB(sy, lightlist1);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sy = sy + slowdown;
                            }

                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            upToRightCars.push(car.index);
                            clearInterval(id);
                            //加上旋转属性
                            clearInterval(id);
                            //加上旋转属性
                            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                            normalCar.classList.add("transTopToRight");
                            let flag = 0;
                            setTimeout(function() {
                                flag = 1;
                                upToRightCars.shift();
                            }, 3500);

                            function checkFlag() {
                                if (flag === 1) {
                                    clearInterval(checkIdx);
                                    car.drawLeftToRightLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), _self.H / 2 - _self.carH - _self.RoadW, car.index);
                                }
                            }
                            let checkIdx = setInterval(checkFlag, 80);
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawCToA = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy === _self.H / 2 - _self.RoadW - _self.carH) {
                    upToLeftCars.push(car.index);                    
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("transToLeft");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                        upToLeftCars.shift();
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawRightToLeftLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), self.H / 2 - _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    sy = sy + car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 上到下 直行
        car.drawCToD = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;

            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].length;
            _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].push(car.y);
            console.log(_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar=downToLeftCars.length===0&&leftToDownCars.length===0;
                if (sy >= _self.H - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx];
                } else {
                    if (_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] !== undefined) {
                        if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    // jxd
                    if (sy === 118) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            flag = intersectionCTOD(sy, lightlist1);
                        }else{
                            flag=2;
                        }
                    }else if(sy===170){
                        upToDownCars.push(car.index);
                    }else if(sy===310){
                        upToDownCars.shift();
                    if (obsFlag === 2 || flag === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            if (sy == 168) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green") {
                                    flag = 1;
                                } else {
                                    flag = 2;
                                }
                                console.log(flag)
                            }
                            if (obsFlag === 2 || flag === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] || sy == 168) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                                if(ifCar){
                                    flag = intersectionCTOD(sy, lightlist1);
                                }
                                if (obsFlag === 2 || flag === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sy = sy + slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            sy = sy + accelerate;
                            if (accelerate >= car.speed) {
                                if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            } else {
                                if (car.y + 30 <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.y = sy;
                    _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx] = car.y;
                }
            }
            }
        };
        car.drawBToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx === _self.W / 2 + _self.RoadW) {
                    rightToUpCars.push(car.index);
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("transRightToTop");
                    let flag = 0;
                    setTimeout(function() {
                        flag = 1;
                        rightToUpCars.shift();
                    }, 3500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2));
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    sx = sx - car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 右到下 左转
        car.drawBToD = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    let ifCar = leftToRightCars.length===0&&leftToUpCars.length===0&&leftToDownCars.length===0;
                    if (sx === 610) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionBTOD(sx, lightlist);
                        }else{
                            sign=2;
                        }

                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (sx < 560) {
                                sign = intersectionBTOD(sx, lightlist);
                            }
                            break; //正常行驶
                        case 2:
                            if (sx < 560) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionBTOD(sx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sx = sx - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            rightToDownCars.push(car.index);
                            clearInterval(id);
                            //加上旋转属性
                            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                            normalCar.classList.add("transRightToDown");
                            let flag = 0;
                            setTimeout(function() {
                                flag = 1;
                                rightToDownCars.shift();
                            }, 3500);

                            function checkFlag() {
                                if (flag === 1) {
                                    clearInterval(checkIdx);
                                    car.drawTopToDownLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2));
                                }
                            }
                            let checkIdx = setInterval(checkFlag, 80);
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 右到左 直行
        car.drawBToA = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            let obsFlag = 1;

            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.padding = " 0px 3px 0px 3px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.x = sx;
            car.pathIdx = _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].length;
            _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].push(car.x);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar=leftToUpCars.length===0&&upToLeftCars.length===0;
                if (sx <= 100) {
                    carNumber();
                    clearInterval(id);
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx];
                } else {
                    if (_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] !== undefined) {
                        if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    if (sx === 610) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionBTOA(sx, lightlist);
                        }else{
                            sign=2;
                        }
                    }else if(sx===560){
                        rightToLeftCars.push(car.index);
                    }else if(sx===420){
                        rightToLeftCars.shift();
                    }
                    if (obsFlag === 2 || sign === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            if (sx == 562) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green") {
                                    sign = 1;
                                } else {
                                    sign = 2;
                                }
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30 || sx == 562) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3
                                }
                                if(ifCar){
                                    sign = intersectionBTOA(sx, lightlist);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                sx = sx - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            sx = sx - accelerate;
                            if (accelerate >= car.speed) {
                                if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            } else {
                                if (car.x <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }

                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx] = car.x;
                }

            }

        };
        return car;
    }
}
}

export {
    Car,
    number
}
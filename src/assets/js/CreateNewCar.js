import { createStructuralDirectiveTransform } from "@vue/compiler-core";
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
            car.img = "cars_normal"
        } else {
            car.img = "cars_smart"
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
            let tx = sx;
            let ty = sy;
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
                    if (ty === 360) {
                        // 判断对面是否有车
                        if(ifCar){
                            // 判断路口情况 jxd
                            sign = intersectionDTOC(ty, lightlist1);
                        }else{
                            sign=2;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            ty = sy - 2;
                            sx = tx;
                            sy = ty;
                            if (ty <= 310) {
                                sign = intersectionDTOA(ty, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            // 进入路口
                            if (ty <= 310) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionDTOA(ty, lightlist1);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                ty = sy - slowdown;
                                sx = tx;
                                sy = ty;
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
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (tx <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
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
        // 下到右右转
        car.drawDToB = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
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
                if (ty === _self.H / 2 + _self.RoadW) {
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
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (tx >= _self.W - 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);

                } else {
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                    tx = sx + 2;
                }
            }
        };
        // 下到上 直行
        car.drawDToC = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
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
                let ifCar=upToRightCars.length===0&&rightToUpCars.length===0;
                if (ty === 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    // jxd
                    if (ty === 360) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            flag = intersectionDTOC(ty, lightlist1);
                        }else{
                            flag=2;
                        }
                    }else if(ty === 310){
                        downToUpCars.push(car.index);
                    }else if(ty === 190){
                        downToUpCars.shift();
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (flag) {
                        case 0:
                            break; //停车
                        case 1:
                            ty = sy - 2;
                            sx = tx;
                            sy = ty;
                            break; //正常行驶
                        case 2:
                            if (slowdown <= 0) {
                                if(ifCar){
                                    flag = intersectionDTOC(ty, lightlist1);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                ty = sy - slowdown;
                                sx = tx;
                                sy = ty;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            ty = sy - accelerate;
                            sx = tx;
                            sy = ty;
                            if (accelerate >= 2) {
                                flag = 1;
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
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
                if (tx === (_self.W / 2 - _self.RoadW - _self.carH)) {
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
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (ty >= _self.H - 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                }
            }
        };
        // 左到上左转
        car.drawAToC = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
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
                    if (tx === 370) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionATOC(tx, lightlist);
                        }else{
                            sign=2;
                        }
                    }
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            tx = sx + 2;
                            sx = tx;
                            sy = ty;
                            if (tx >= 420) {
                                sign = intersectionATOC(tx, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            if (tx >= 420) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionATOC(tx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                tx = sx + slowdown;
                                sx = tx;
                                sy = ty;
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
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let r2l = setInterval(frame, 30);

            function frame() {
                if (ty <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
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
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
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
                let ifCar=rightToDownCars.length===0&&downToRightCars.length===0;
                if (tx === _self.W - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    // jxd
                    if (tx === 370) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionATOB(tx, lightlist);
                        }else{
                            sign=2;
                        }
                    }else if(tx===440){
                        leftToRightCars.push(car.index);
                    }else if(tx===580){
                        leftToRightCars.shift();
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            tx = sx + 2;
                            sx = tx;
                            sy = ty;

                            if (tx == 420) {
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
                            break; //正常行驶
                        case 2:
                            if (tx == 420) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionATOB(tx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                tx = sx + slowdown;
                                sx = tx;
                                sy = ty;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            tx = sx + accelerate;
                            sx = tx;
                            sy = ty;
                            if (accelerate >= 2) {
                                sign = 1;
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 上到右左转
        car.drawCToB = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
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
                    if (ty === 118) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionCTOB(ty, lightlist1);
                        }else{
                            sign=2;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            ty = sy + 2;
                            sx = tx;
                            sy = ty;
                            if (ty > 168) {
                                sign = intersectionCTOB(ty, lightlist1);
                            }
                            break; //正常行驶
                        case 2:
                            if (ty > 168) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionCTOB(ty, lightlist1);
                                }                                
                            } else {
                                slowdown = slowdown - 0.04;
                                ty = sy + slowdown;
                                sx = tx;
                                sy = ty;
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
            let tx = sx;
            let ty = sy;
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
                if (ty === _self.H / 2 - _self.RoadW - _self.carH) {
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
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 上到下 直行
        car.drawCToD = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let flag = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
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
                let ifCar=downToLeftCars.length===0&&leftToDownCars.length===0;
                if (ty === _self.H - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                } else {
                    // jxd
                    if (ty === 118) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            flag = intersectionCTOD(ty, lightlist1);
                        }else{
                            flag=2;
                        }
                    }else if(ty===170){
                        upToDownCars.push(car.index);
                    }else if(ty===310){
                        upToDownCars.shift();
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (flag) {
                        case 0:
                            break; //停车
                        case 1:
                            ty = sy + 2;
                            sx = tx;
                            sy = ty;
                            break; //正常行驶
                        case 2:
                            if (slowdown <= 0) {
                                if(ifCar){
                                    flag = intersectionCTOD(ty, lightlist1);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                ty = sy + slowdown;
                                sx = tx;
                                sy = ty;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            ty = sy + accelerate;
                            sx = tx;
                            sy = ty;
                            if (accelerate >= 2) {
                                flag = 1;
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
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
                if (tx === _self.W / 2 + _self.RoadW) {
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
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        // 右到下 左转
        car.drawBToD = function(_self, sx, sy) {
            let tx = sx;
            let ty = sy;
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
                    if (tx === 610) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionBTOD(tx, lightlist);
                        }else{
                            sign=2;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            tx = sx - 2;
                            sx = tx;
                            sy = ty;
                            if (tx < 560) {
                                sign = intersectionBTOD(tx, lightlist);
                            }
                            break; //正常行驶
                        case 2:
                            if (tx < 560) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionBTOD(tx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                tx = sx - slowdown;
                                sx = tx;
                                sy = ty;
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
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
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
                let ifCar=leftToUpCars.length===0&&upToLeftCars.length===0;
                if (tx <= 100) {
                    carNumber();
                    clearInterval(id);
                    father.removeChild(normalCar);
                } else {
                    // jxd
                    if (tx === 610) {
                        // 判断路口情况 jxd
                        if(ifCar){
                            sign = intersectionBTOA(tx, lightlist);
                        }else{
                            sign=2;
                        }
                    }else if(tx===560){
                        rightToLeftCars.push(car.index);
                    }else if(tx===420){
                        rightToLeftCars.shift();
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            tx = sx - 2;
                            sx = tx;
                            sy = ty;
                            if (tx == 562) {
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
                            break; //正常行驶
                        case 2:
                            if (tx == 562) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if(ifCar){
                                    sign = intersectionBTOA(tx, lightlist);
                                }
                            } else {
                                slowdown = slowdown - 0.04;
                                tx = sx - slowdown;
                                sx = tx;
                                sy = ty;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            accelerate = accelerate + 0.04;
                            tx = sx - accelerate;
                            sx = tx;
                            sy = ty;
                            if (accelerate >= 2) {
                                sign = 1;
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
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
    Car,
    number
}
import { createStructuralDirectiveTransform } from "@vue/compiler-core";
import { del } from "vue-demi";
import { intersectionBTOA, intersectionATOB, intersectionCTOD, intersectionDTOC, intersectionDTOA, intersectionATOC, intersectionCTOB, intersectionBTOD } from "./intersection.js"

<<<<<<< HEAD
let slowdownSSC=0.15 // 智能车减速速度
let slowdownSNC=0.1 // 普通车减速速度
let safeDis=45

=======
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
// 路口直行车组
let downToUpCars = new Array(); // 路口中从下到上的车
let upToDownCars = new Array(); // 路口中从上到下的车
let rightToLeftCars = new Array(); // 路口中从右到左的车
let leftToRightCars = new Array(); // 路口中从左到右的车
// 右转大队
let downToRightCars = new Array();
let upToLeftCars = new Array();
let leftToDownCars = new Array(); // 路口中从左到下的车
let rightToUpCars = new Array(); // 路口中右到上的车
// 左转大队
let downToLeftCars = new Array(); // 路口中从下到左的车
let upToRightCars = new Array();
let rightToDownCars = new Array();
let leftToUpCars = new Array();

<<<<<<< HEAD
function carNumber() {
    window.number = window.number + 1;
    // console.log(window.number);
}
// 车辆初始化
function carInit(father,car){
    let normalCar = document.createElement("img");
    normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
    normalCar.setAttribute("width", "10");
    normalCar.setAttribute("height", "20");
    normalCar.setAttribute("class", car.type + car.index);
    normalCar.style.padding = "3px 0px 3px 0px";
    normalCar.style.border = "solid  0px 1px 0px 1px";
    normalCar.style.position = "absolute";
    normalCar.style.left = car.x + "px";
    normalCar.style.top = car.y + "px";
    try {
        father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
    } catch (err) {}
    father.appendChild(normalCar);
    return normalCar;
}

function turnLeft(car,obsDis,lookDis){
    
=======
// 挂载统计车辆数量函数，用于判断开始结束条件
window.number = 0;

function carNumber() {
    window.number = window.number + 1;
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
}

let Car = {
    createNewCar: function(rootSelf, type, sourcePlace, targetPlace, index) {
        let car = {};
        car.type = type;
        car.sourcePlace = sourcePlace;
        car.targetPlace = targetPlace;
        car.index = index;
        car.rootSelf = rootSelf
        car.slowdown = 2
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
        let father = document.getElementsByClassName("MyCanvas")[0];
        car.showInfo = function() {};
        // 下到左左转
        car.drawDToA = function(_self, sx, sy) {
            // sign用来记录车辆行驶状态，0停车，1正常速度，2减速，3加速
            car.sign = 1;
            car.accelerate = 0; //加速速度
            car.slowdown = 2; //减速速度
            car.y = sy;car.x=sx
            let normalCar=carInit(father,car)
            // 路段加坐标
            if(_self.obstructsInAllRoads["DC"]==undefined)_self.obstructsInAllRoads["DC"]=[]
            car.pathIdx = _self.obstructsInAllRoads["DC"].length;
            _self.obstructsInAllRoads["DC"].push(car.y);
            
            let id = setInterval(frame, 30);
            
            function frame() {
                {
                    let ifCar = upToDownCars.length === 0 && upToLeftCars.length === 0 && upToRightCars.length === 0;
                    let lookFlag=false // 观察红绿灯
                    let enterFlag=false // 进入路口
                    enterFlag=car.y <= 310?true:false
                    if (car.type == 'NormalCar') {
                        // 普通车
<<<<<<< HEAD
                        car.y === 360?lookFlag=true:lookFlag=false
                        // 判断路口情况 jxd
                    } else {
                        // 智能车
                        car.y === 334?lookFlag=true:lookFlag=false
=======
                        if (sy === 440) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionDTOA(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                    } else {
                        // 智能车
                        if (sy === 414) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionDTOA(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
                    }

                    if(lookFlag){
                        ifCar?car.sign = intersectionDTOA(sy, lightlist1, car.type):car.sign = 2;
                    }
                    if(enterFlag==false){
                        // 判定和前车的距离
                        if (_self.obstructsInAllRoads["DC"][car.pathIdx - 1] !== undefined) {
                            if(car.y <= _self.obstructsInAllRoads["DC"][car.pathIdx - 1] + safeDis){
                                car.sign = 2
                            }else{
                                car.sign = 1
                            }
                        } else {
                            car.sign = 1;
                        }
                    }else{
                        ifCar?car.sign = intersectionDTOA(car.y, lightlist1, car.type):car.sign=0;
                        car.slowdown = 0;
                    }
                    
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (car.sign) {
                        case 0:
                            break; //停车
                        case 1:
<<<<<<< HEAD
                            car.y = car.y - car.speed;
                            car.slowdown = 2;
                            break; //正常行驶
                        case 2:
                            if (car.slowdown > 0) {
                                car.type === 'NormalCar' ? (car.slowdown=car.slowdown-slowdownSNC) : (car.slowdown =car.slowdown-slowdownSSC);
                                car.y = car.y - car.slowdown;
=======
                            sy = sy - car.speed;
                            if (sy <= 390) {
                                sign = intersectionDTOA(sy, lightlist1, car.type);
                            }
                            break; //正常行驶
                        case 2:
                            if (sy <= 390) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (ifCar) {
                                    sign = intersectionDTOA(sy, lightlist1, car.type);
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sy = sy - slowdown;
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            // 开始转弯，一旦开始，就不在路口停车
                            delete _self.obstructsInAllRoads["DC"][car.pathIdx];
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
                    normalCar.style.left = car.x + "px";
                    normalCar.style.top = car.y + "px";
                    if(enterFlag==false) {
                        _self.obstructsInAllRoads["DC"][car.pathIdx] = car.y;
                    }
                }
            }
            
        };
        //绘制车辆从右向左移动
        car.drawRightToLeftLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            // 路段加坐标
            if(_self.obstructsInAllRoads["BA"]==undefined){
                _self.obstructsInAllRoads["BA"]=[]
                car.pathIdx = _self.obstructsInAllRoads["BA"].length;
                _self.obstructsInAllRoads["BA"].push(sx);
            }else{
                // 找到插入位置
                var i=0
                for(;i<_self.obstructsInAllRoads["BA"].length&&525>_self.obstructsInAllRoads["BA"][i];i++){
                }
                car.pathIdx = i;
                _self.obstructsInAllRoads["BA"].splice(i,1,sx);
            }
            let r2l = setInterval(frame, 30);
            function frame() {
                if (sx <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads["BA"][car.pathIdx]
                } else {
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    sx = sx - car.speed;
                    _self.obstructsInAllRoads["BA"][car.pathIdx]=sx;
                    let dis=sx-_self.obstructsInAllRoads["BA"][car.pathIdx-1]
                    if(dis<=30){
                        if(car.speed>0)car.speed-=0.2
                    }else{
                        car.speed=car.type === "NormalCar"?1:2
                    }
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
            } catch (err) {}
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
            // 路段加坐标
            if(_self.obstructsInAllRoads["AB"]==undefined){
                _self.obstructsInAllRoads["AB"]=[]
                car.pathIdx = _self.obstructsInAllRoads["AB"].length;
                _self.obstructsInAllRoads["AB"].push(sx);
            }else{
                // 找到插入位置
                var i=0
                for(;i<_self.obstructsInAllRoads["AB"].length&&sx<_self.obstructsInAllRoads["AB"][i];i++){
                }
                car.pathIdx = i;
                _self.obstructsInAllRoads["AB"].splice(i,1,sx);
            }
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sx >= _self.W - 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads["AB"][car.pathIdx]

                } else {
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    sx = sx + car.speed;
                    _self.obstructsInAllRoads["AB"][car.pathIdx]=sx;
                    let dis=_self.obstructsInAllRoads["AB"][car.pathIdx-1]-sx
                    if(dis<=30){
                        if(car.speed>0)car.speed-=0.2
                    }else{
                        car.speed=car.type === "NormalCar"?1:2
                    }
                }
            }
        };
        // 下到上 直行
        car.drawDToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // jxd
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
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
            // 路段加坐标
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].length;
            _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace].push(car.y);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = upToRightCars.length === 0 && rightToUpCars.length === 0;
                // 结束时清除时钟，删除节点，清除路段中坐标
                if (sy <= 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx];
                } else {
                    // 判定和前车的距离
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
                    if (car.type == 'NormalCar') {
                        // 普通车
                        if (sy === 440) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionDTOC(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        // 智能车
                        if (sy === 414) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionDTOC(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    // 进入路口和出路口
                    if (sy === 312) {
                        downToUpCars.push(car.index);
                    } else if (sy === 190) {
                        downToUpCars.shift();
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
                            if (sx == 390) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green" && ifCar) {
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
                            if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30 || sy == 390) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.y <= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3
                                }
                                if (ifCar) {
                                    sign = intersectionDTOC(sy, lightlist1, car.type);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sy = sy - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            car.type == 'NormalCar' ? (accelerate = accelerate + 0.04) : (accelerate = accelerate + 0.08);
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
        // 从左到下 右转
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
            } catch (err) {}
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
        // 从路口到下
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
            // let father = document.getElementsByClassName("MyCanvas")[0];
            car.sign = 1;
            car.slowdown = 2; //减速速度
            car.y = sy;car.x=sx
            // let normalCar=carInit(father,car,"../images/" + car.img + "90.png")
            let normalCar = document.createElement("img");
            
            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = car.y + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            // 路段加坐标
            if(_self.obstructsInAllRoads["AB"]==undefined)_self.obstructsInAllRoads["AB"]=[]
            car.pathIdx = _self.obstructsInAllRoads["AB"].length;
            _self.obstructsInAllRoads["AB"].push(car.x);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = rightToLeftCars.length === 0 && rightToUpCars.length === 0 && rightToDownCars.length === 0;
                let lookFlag=false // 观察红绿灯
                let enterFlag=false // 进入路口
                enterFlag=car.x >= 420?true:false
                if (car.type == 'NormalCar') {
                    // 普通车
                    car.x === 370?lookFlag=true:lookFlag=false
                    // 判断路口情况 jxd
                } else {
                    // 智能车
                    car.x === 394?lookFlag=true:lookFlag=false
                }
                if(lookFlag){
                    ifCar?car.sign = intersectionATOC(car.x, lightlist, car.type):car.sign = 2;
                }
                if(enterFlag==false){
                    // 判定和前车的距离
                    if (_self.obstructsInAllRoads["AB"][car.pathIdx - 1] !== undefined) {
                        if(car.x >= _self.obstructsInAllRoads["AB"][car.pathIdx - 1] - safeDis){
                            car.sign = 2
                        }else{
                            car.sign = 1
                        }
                    } else {
                        car.sign = 1;
                    }
                }else{
                    ifCar?car.sign = intersectionATOC(car.x, lightlist, car.type):car.sign=0;
                    car.slowdown = 0;
                }
                switch (car.sign) {
                    case 0:
                        break; //停车
                    case 1:
                        car.x = car.x + car.speed;
                        car.slowdown = 2;
                        break; //正常行驶
                    case 2:
                        if (car.slowdown > 0) {
                            car.type == 'NormalCar' ? (car.slowdown -=  slowdownSNC) : (car.slowdown -=  slowdownSSC);
                            car.x = car.x + car.slowdown;
                        }
                        break; //减速,每次速度减0.1，速度为0时,状态改为停车
                    case 3:
                        delete _self.obstructsInAllRoads["AB"][car.pathIdx];
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
                normalCar.style.left = car.x + "px";
                normalCar.style.top = car.y + "px";
                if(enterFlag==false) {
                    _self.obstructsInAllRoads["AB"][car.pathIdx] = car.x;
                }
            }
        };
        car.drawDownToTopLines = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            // 路段加坐标
            if(_self.obstructsInAllRoads["DC"]==undefined){
                _self.obstructsInAllRoads["DC"]=[]
                car.pathIdx = _self.obstructsInAllRoads["DC"].length;
                _self.obstructsInAllRoads["DC"].push(sy);
            }else{
                // 找到插入位置
                var i=0
                for(;i<_self.obstructsInAllRoads["DC"].length&&sy>_self.obstructsInAllRoads["DC"][i];i++){
                }
                car.pathIdx = i;
                _self.obstructsInAllRoads["DC"].splice(i,1,sy);
            }
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sy <= 100) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads["DC"][car.pathIdx]
                } else {
                    sy = sy - car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    _self.obstructsInAllRoads["DC"][car.pathIdx]=sy;
                    let dis=sy-_self.obstructsInAllRoads["DC"][car.pathIdx-1]
                    if(dis<=safeDis){
                        if(car.speed>0)car.speed-=0.15
                    }else{
                        car.speed=car.type === "NormalCar"?1:2
                    }
                }
            }
        };
        // 左到右直行
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
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = rightToDownCars.length === 0 && downToRightCars.length === 0;
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
                    if (car.type == 'NormalCar') {
                        if (sx === 370) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionATOB(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 394) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionATOB(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    if (sx === 440) {
                        leftToRightCars.push(car.index);
                    } else if (sx === 560) {
                        leftToRightCars.shift();
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
                                if (nowLight1 == "green" && ifCar) {
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
                                if (ifCar) {
                                    sign = intersectionATOB(sx, lightlist, car.type);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sx = sx + slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            car.type == 'NormalCar' ? (accelerate = accelerate + 0.04) : (accelerate = accelerate + 0.08);
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
            car.sign = 1;
            car.accelerate = 0; //加速速度
            car.slowdown = 2; //减速速度
            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            car.y = sy;car.x=sx
            // 路段加坐标
            if(_self.obstructsInAllRoads["CD"]==undefined)_self.obstructsInAllRoads["CD"]=[]
            car.pathIdx = _self.obstructsInAllRoads["CD"].length;
            _self.obstructsInAllRoads["CD"].push(car.y);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    let ifCar = downToUpCars.length === 0 && downToLeftCars.length === 0 && downToRightCars.length === 0;
                    let lookFlag=false // 观察红绿灯
                    let enterFlag=false // 进入路口
                    enterFlag=car.y >= 168?true:false
                    if (car.type == 'NormalCar') {
<<<<<<< HEAD
                        // 普通车
                        car.y === 118?lookFlag=true:lookFlag=false
                        // 判断路口情况 jxd
                    } else {
                        // 智能车
                        car.y === 142?lookFlag=true:lookFlag=false
=======
                        if (sy === 192) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionCTOB(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                    } else {
                        if (sy === 216) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionCTOB(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
                    }

                    if(lookFlag){
                        ifCar?car.sign = intersectionCTOB(car.y, lightlist1, car.type):car.sign = 2;
                    }
                    if(enterFlag==false){
                        // 判定和前车的距离
                        if (_self.obstructsInAllRoads["CD"][car.pathIdx - 1] !== undefined) {
                            if(car.y >= _self.obstructsInAllRoads["CD"][car.pathIdx - 1] - safeDis){
                                car.sign = 2
                            }else{
                                car.sign = 1
                            }
                        } else {
                            car.sign = 1;
                        }
                    }else{
                        ifCar?car.sign = intersectionCTOB(car.y, lightlist1, car.type):car.sign=0;
                        car.slowdown = 0;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (car.sign) {
                        case 0:
                            break; //停车
                        case 1:
<<<<<<< HEAD
                            car.y = car.y + car.speed;
                            car.slowdown = 2;
                            break; //正常行驶
                        case 2:
                            if (car.slowdown > 0) {
                                car.type == 'NormalCar' ? (car.slowdown -= slowdownSNC) : (car.slowdown -= slowdownSSC);
                                car.y = car.y + car.slowdown;
=======
                            sy = sy + car.speed;
                            if (sy > 242) {
                                sign = intersectionCTOB(sy, lightlist1, car.type);
                            }
                            break; //正常行驶
                        case 2:
                            if (sy > 242) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (ifCar) {
                                    sign = intersectionCTOB(sy, lightlist1, car.type);
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sy = sy + slowdown;
>>>>>>> 5ca7e6a5237994363305485206f9672fb0b6fbf9
                            }

                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            upToRightCars.push(car.index);
                            clearInterval(id);
                            delete _self.obstructsInAllRoads["CD"][car.pathIdx];
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
                    normalCar.style.left = car.x + "px";
                    normalCar.style.top = car.y + "px";
                    // 更新路段中坐标
                    if(enterFlag==false) {
                        _self.obstructsInAllRoads["CD"][car.pathIdx] = car.y;
                    }
                }
            }
        };
        // 上到左 右转
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
            } catch (err) {}
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
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
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
            // console.log(_self.obstructsInAllRoads[car.sourcePlace + car.targetPlace]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = downToLeftCars.length === 0 && leftToDownCars.length === 0;
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
                    if (car.type == 'NormalCar') {
                        if (sy === 192) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionCTOD(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sy === 216) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionCTOD(sy, lightlist1, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    if (sy === 170) {
                        upToDownCars.push(car.index);
                    } else if (sy === 310) {
                        upToDownCars.shift();
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
                            if (sy == 246) {
                                var nowLight1; // 获取红绿灯
                                for (let i = 0; i < 3; i++) {
                                    if (lightlist[i].style.opacity == 1) {
                                        nowLight1 = lightlist[i].className; //获取红绿灯
                                    }
                                }
                                if (nowLight1 == "green" && ifCar) {
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
                            if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1] || sy == 246) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (car.y + 30 >= _self.obstructsInAllRoads[car.sourcePlace + car.targetPlace][car.pathIdx - 1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                                if (ifCar) {
                                    sign = intersectionCTOD(sy, lightlist1, car.type);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sy = sy + slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            car.type == 'NormalCar' ? (accelerate = accelerate + 0.04) : (accelerate = accelerate + 0.08);
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

        };
        // 右到上右转
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
            } catch (err) {}
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
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                {
                    let ifCar = leftToRightCars.length === 0 && leftToUpCars.length === 0 && leftToDownCars.length === 0;
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionBTOD(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                    } else {
                        if (sx === 586) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionBTOD(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (sign) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (sx < 560) {
                                sign = intersectionBTOD(sx, lightlist, car.type);
                            }
                            break; //正常行驶
                        case 2:
                            if (sx < 560) {
                                slowdown = 0;
                            }
                            if (slowdown <= 0) {
                                if (ifCar) {
                                    sign = intersectionBTOD(sx, lightlist, car.type);
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
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
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = leftToUpCars.length === 0 && upToLeftCars.length === 0;
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
                    // jxd
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionBTOA(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 586) {
                            // 判断路口情况 jxd
                            if (ifCar) {
                                sign = intersectionBTOA(sx, lightlist, car.type);
                            } else {
                                sign = 2;
                            }
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    if (sx === 560) {
                        rightToLeftCars.push(car.index);
                    } else if (sx === 420) {
                        rightToLeftCars.shift();
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
                                if (nowLight1 == "green" && ifCar) {
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
                                if (ifCar) {
                                    sign = intersectionBTOA(sx, lightlist, car.type);
                                }
                                if (obsFlag === 2 || sign === 2) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 3;
                                }
                            } else {
                                car.type == 'NormalCar' ? (slowdown = slowdown - 0.04) : (slowdown = slowdown - 0.08);
                                sx = sx - slowdown;
                            }
                            break; //减速,每次速度减0.1，速度为0时,状态改为停车
                        case 3:
                            car.type == 'NormalCar' ? (accelerate = accelerate + 0.04) : (accelerate = accelerate + 0.08);
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

export {
    Car,
}
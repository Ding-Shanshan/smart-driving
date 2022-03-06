import { intersectionBTOA, intersectionATOB, intersectionCTOD, intersectionDTOC, intersectionDTOA, intersectionATOC, intersectionCTOB, intersectionBTOD } from "./intersection.js"
window.number = 0;

let slowdownSSC=0.15 // 智能车减速速度
let slowdownSNC=0.1 // 普通车减速速度
let safeDis=45

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

function carNumber() {
    number = number + 1;
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
            let sign = 1;
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);
            
            function frame() {
                let ifCar = upToDownCars.length === 0 && upToLeftCars.length === 0 && upToRightCars.length === 0;                
                // 进入路口 开始转弯                
                if(sy <= _self.H / 2 + _self.RoadW){
                    if(ifCar){
                        clearInterval(id);
                    downToLeftCars.push(car.index);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("DToA");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);
                    // 转弯结束
                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            downToLeftCars.shift();
                            car.drawRightToLeftLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW, ((_self.RoadW - _self.carW) / 2) + _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                    }
                }
                else{
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] !== undefined){
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    let lookFlag=false // 观察红绿灯
                    // let enterFlag=false // 进入路口
                    // enterFlag=car.y <= 390?true:false
                    if (car.type == 'NormalCar') {
                        // 普通车
                        car.y === 440?lookFlag=true:lookFlag=false
                        // 判断路口情况 jxd
                    } else {
                        // 智能车
                        car.y === 414?lookFlag=true:lookFlag=false
                    }
                    if (obsFlag === 2 || sign === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }

                    if(lookFlag){
                        ifCar?sign = intersectionDTOA(sy, lightlist1, car.type):sign = 2;
                    }
                    // if (car.type == 'NormalCar') {
                    //     // 普通车
                    //     if (sy === 440) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionDTOA(sy, lightlist1, car.type);
                    //     }
                    //     if (obsFlag === 2 || sign === 2) {
                    //         obsFlag = 2;
                    //     } else {
                    //         obsFlag = 1;
                    //     }
                    // } else {
                    //     // 智能车
                    //     if (sy === 414) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionDTOA(sy, lightlist1, car.type);
                    //     }
                    //     if (obsFlag === 2 || sign === 2) {
                    //         obsFlag = 2;
                    //     } else {
                    //         obsFlag = 1;
                    //     }
                    // }
                    

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sy <= 390) {
                                sign = intersectionDTOA(sy, lightlist1, car.type);
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                if (sy <= 390) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                // 距离小了直接停车
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30 || sy == 310) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                                sign = intersectionDTOA(sy, lightlist1, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
            
        };
        //绘制车辆从右向左移动
        car.drawRightToLeftLines = function(_self, sx, sy, add) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            car.y = sy;
            car.x = sx;
            let r2l = setInterval(frame, 30);
            function frame() {
                if (sx <= 100 + add) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] !== undefined){
                            //在路上的就判断是否和当前车在同一路段
                            //如果前面某辆车到达目的地，不再判断
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0]+30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                                        // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                slowdown = 0;
                            }
                            else{
                                if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    // 红绿灯
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x - add;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x - add;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;   
                }
            }
        };
        // 下到右右转
        car.drawDToB = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + ".png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    normalCar.classList.add("DToB");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                        downToRightCars.shift();
                    }, 1500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawLeftToRightLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW, _self.carW + ((_self.RoadW - _self.carW) / 2));
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                    slowdown = 0;
                            }
                            else{
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
        //绘制车辆从左向右移动
        car.drawLeftToRightLines = function(_self, sx, sy, add) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            car.y = sy;
            car.x = sx;
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sx >= _self.W - 100 - add) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                                        // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                    slowdown = 0;
                            }
                            else{
                                if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x + add + 30 <= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x + add;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x + add;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;   
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
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] !== undefined){
                            //在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
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
                            ifCar?sign = intersectionDTOC(sy, lightlist1, car.type):sign = 2;
                        }
                        // if (obsFlag === 2 || sign === 2) {
                        //     obsFlag = 2;
                        // } else {
                        //     obsFlag = 1;
                        // }
                    } else {
                        // 智能车
                        if (sy === 414) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionDTOC(sy, lightlist1, car.type):sign = 2;
                        }
                    }
                    // 进入路口和出路口
                    if (sy === 392) {
                        downToUpCars.push(car.index);
                    } else if (sy === 266) {
                        downToUpCars.shift();
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
                            sy = sy - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sy === 390) {
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
                            if(former === undefined){
                                if (sy === 390) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30 || sy == 310) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3
                                    }
                                }
                                if(ifCar) sign = intersectionDTOC(sy, lightlist1, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    if(car.x <= (_self.H / 2 + _self.RoadW) && car.curPath !== "-" + car.targetPlace){
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
        // 从左到下 右转
        car.drawAToD = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    normalCar.classList.add("AToD");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                        leftToDownCars.shift();
                    }, 1500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + (_self.RoadW - _self.carW)/2, _self.carH + ((_self.RoadW - _self.carW) / 2) + _self.carW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                    slowdown = 0;
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x + 30 <= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }

        };
        car.drawTopToDownLines = function(_self, sx, sy, add) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            car.y = sy;
            car.x = sx;
            let r2l = setInterval(frame, 30);
            function frame() {
                if (sy >= _self.H - 100 - add) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                slowdown = 0;
                            }
                            else{
                                if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y + add + 30 <= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }

                    // sy = sy + car.speed;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y + add;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y + add;   
                }
            }
        };
        // 左到上左转
        car.drawAToC = function(_self, sx, sy) {
            // let father = document.getElementsByClassName("MyCanvas")[0];
            car.y = sy;car.x=sx
            // let normalCar=carInit(father,car,"../images/" + car.img + "90.png")
            let normalCar = document.createElement("img");
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                if(sx >= _self.W / 2 - _self.RoadW - _self.carH){
                    if(ifCar){
                        //加上旋转属性
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("AToC");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + (_self.RoadW - _self.carW)/2, _self.RoadW + ((_self.RoadW - _self.carW) / 2) + _self.carH);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                    }
                }
                else{
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] == undefined){}
                        else{
                        //在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    let lookFlag=false // 观察红绿灯
                    // let enterFlag=false // 进入路口
                    // enterFlag=car.x >= 420?true:false
                    if (car.type == 'NormalCar') {
                        // 普通车
                        sx === 370?lookFlag=true:lookFlag=false
                        // 判断路口情况 jxd
                    } else {
                        // 智能车
                        sx === 394?lookFlag=true:lookFlag=false
                    }
                    if(lookFlag){
                        ifCar?sign = intersectionATOC(sx, lightlist, car.type):sign = 2;
                    }
                    // if (car.type == 'NormalCar') {
                    //     if (sx === 370) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionATOC(sx, lightlist, car.type);
                    //     }
                    //     if (obsFlag === 2 || sign === 2) {
                    //         obsFlag = 2;
                    //     } else {
                    //         obsFlag = 1;
                    //     }
                    // } else {
                    //     if (sx === 394) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionATOC(sx, lightlist, car.type);
                    //     }
                    if (obsFlag === 2 || sign === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sx >= 420) {
                                sign = intersectionATOC(sx, lightlist1, car.type);
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                if (sx >= 420) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                                sign = intersectionATOC(sx, lightlist, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x + 30 <= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                // }
            }
        };
        car.drawDownToTopLines = function(_self, sx, sy, add) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.getElementsByClassName(car.type + car.index)[0];
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            car.y = sy;
            car.x = sx;
            let r2l = setInterval(frame, 30);

            function frame() {
                if (sy <= 100 + add) {
                    clearInterval(r2l);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1]+30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1]+30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                slowdown = 0;
                            }
                            else{
                                if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1]+30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1]+30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1]+30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y - add;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y - add;   
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
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
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
                            ifCar?sign = intersectionATOB(sx, lightlist, car.type):sign = 2;
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 394) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionATOB(sx, lightlist, car.type):sign = 2;
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
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
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
                            if(former === undefined){
                                if (sx == 562) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                                if(ifCar)sign = intersectionATOB(sx, lightlist, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x + 30 <= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    if(car.x >= (_self.W / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace){
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
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
            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.padding = "3px 0px 3px 0px";
            normalCar.style.border = "solid  0px 1px 0px 1px";
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                let ifCar = downToUpCars.length === 0 && downToLeftCars.length === 0 && downToRightCars.length === 0;
                if(sy == _self.H / 2 - _self.RoadW - _self.carH){
                    if(ifCar){
                        upToRightCars.push(car.index);
                        clearInterval(id);
                        //加上旋转属性
                        let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                        normalCar.classList.add("CToB");
                        let flag = 0;
                        setTimeout(function() {
                            delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                            car.curPath = "-" + car.targetPlace;
                            _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                            if(car.curPath in _self.obstructsInEachRoad){
                                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                            }
                            else{
                                _self.obstructsInEachRoad[car.curPath] = [];
                                car.curRoadIdx = 0;
                                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                            }
                        }, 500);
                        // 转弯结束
                        setTimeout(function() {
                            flag = 1;
                            upToRightCars.shift();
                        }, 3000);

                        function checkFlag() {
                            if (flag === 1) {
                                clearInterval(checkIdx);
                                car.drawLeftToRightLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), _self.H / 2 - _self.RoadW - _self.carH, _self.carH + _self.RoadW + ((_self.RoadW - _self.carW) / 2) + _self.carW);
                            }
                        }
                        let checkIdx = setInterval(checkFlag, 80);
                    }
                }
                else{
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    let lookFlag=false // 观察红绿灯
                    // let enterFlag=false // 进入路口
                    // enterFlag=car.y >= 242?true:false
                    if (car.type == 'NormalCar') {
                        // 普通车
                        car.y === 192?lookFlag=true:lookFlag=false
                        // 判断路口情况 jxd
                    } else {
                        // 智能车
                        car.y === 216?lookFlag=true:lookFlag=false
                    }
                    // if (car.type == 'NormalCar') {
                    //     if (sy === 118) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionCTOB(sy, lightlist1, car.type);
                    //     }
                    //     if (obsFlag === 2 || sign === 2) {
                    //         obsFlag = 2;
                    //     } else {
                    //         obsFlag = 1;
                    //     }
                    // } else {
                    //     if (sy === 142) {
                    //         // 判断路口情况 jxd
                    //         sign = intersectionCTOB(sy, lightlist1, car.type);
                    //     }
                    if (obsFlag === 2 || sign === 2) {
                        obsFlag = 2;
                    } else {
                        obsFlag = 1;
                    }
                    // }

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sy === 242) {
                                sign = intersectionCTOB(sy, lightlist1, car.type);
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                if (sy === 242) {
                                    slowdown = 0;
                                }
                            }else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1] || sy == 168) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                                sign = intersectionCTOB(sy, lightlist1, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y + 30 <= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
        // 上到左 右转
        car.drawCToA = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "-.png"));
            normalCar.setAttribute("width", "10");
            normalCar.setAttribute("height", "20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy >= _self.H / 2 - _self.RoadW - _self.carH) {
                    upToLeftCars.push(car.index);                    
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("CToA");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                        upToLeftCars.shift();
                    }, 1500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawRightToLeftLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), self.H / 2 - _self.RoadW - _self.carH, ((_self.RoadW - _self.carW) / 2) + _self.carH);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                                        // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                    slowdown = 0;
                            }
                            else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y + 30 <= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
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
            car.curPath = car.sourcePlace;
            car.y = sy;
            car.x = sx;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
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
                            ifCar?sign = intersectionCTOD(sy, lightlist1, car.type):sign = 2;
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sy === 216) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionCTOD(sy, lightlist1, car.type):sign = 2;
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    if (sy === 246) {
                        upToDownCars.push(car.index);
                    } else if (sy === 366) {
                        upToDownCars.shift();
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sy == 246) {
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
                            if(former === undefined){
                                if (sy === 246) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1] || sy == 168) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                                sign = intersectionCTOD(sy, lightlist1, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.y + 30 <= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    if(car.y >= (_self.H / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace){
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }

        };
        // 右到上右转
        car.drawBToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度

            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
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
                    normalCar.classList.add("BToC");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                        rightToUpCars.shift();
                    }, 1500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), (_self.RoadW - _self.carW) / 2);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);

                } else {
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                    slowdown = 0;
                            }
                            else{
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
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

            let obsFlag = 1;
            normalCar.setAttribute("src", require("../images/" + car.img + "-90.png"));
            normalCar.setAttribute("width", "20");
            normalCar.setAttribute("height", "10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class", car.type + car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {}
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                let ifCar = leftToRightCars.length === 0 && leftToUpCars.length === 0 && leftToDownCars.length === 0;                
                if(sx <= _self.W / 2 + _self.RoadW){
                    if(ifCar){
                        rightToDownCars.push(car.index);
                        clearInterval(id);
                        //加上旋转属性
                        let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                        normalCar.classList.add("BToD");
                        let flag = 0;
                        setTimeout(function() {
                            delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                            car.curPath = "-" + car.targetPlace;
                            _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                            if(car.curPath in _self.obstructsInEachRoad){
                                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                            }
                            else{
                                _self.obstructsInEachRoad[car.curPath] = [];
                                car.curRoadIdx = 0;
                                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                            }
                        }, 500);
                        setTimeout(function() {
                            flag = 1;
                            rightToDownCars.shift();
                        }, 3000);

                        function checkFlag() {
                            if (flag === 1) {
                                clearInterval(checkIdx);
                                car.drawTopToDownLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.carW - ((_self.RoadW - _self.carW) / 2), _self.RoadW + _self.carW + ((_self.RoadW - _self.carW) / 2));
                            }
                        }
                        let checkIdx = setInterval(checkFlag, 80);
                    }
                }
                else{
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionBTOD(sx, lightlist, car.type):sign === 2;
                        }
                        // if (obsFlag === 2 || sign === 2) {
                        //     obsFlag = 2;
                        // } else {
                        //     obsFlag = 1;
                        // }
                    } else {
                        if (sx === 586) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionBTOD(sx, lightlist, car.type):sign === 2;
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
                            sx = sx - car.speed;
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sx < 560) {
                                sign = intersectionBTOD(sx, lightlist, car.type);
                            }
                            if (obsFlag === 2 || sign === 2) {
                                obsFlag = 2;
                            } else {
                                obsFlag = 1;
                            }
                            break; //正常行驶
                        case 2:
                            if(former === undefined){
                                if (sx === 562) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30 || sx == 562) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                                sign = intersectionBTOD(sx, lightlist, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
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
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            //确定全局位置
            car.pathIdx = _self.obstructsInAllRoads.length;
            _self.obstructsInAllRoads.push([car.x,car.y,car.curPath]);
            //当前道路上的位置
            if(car.curPath in _self.obstructsInEachRoad){
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
            else{
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
            }
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
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for(let i=0;i<car.curRoadIdx;i++){
                        if(_self.obstructsInEachRoad[car.curPath][i] === undefined){
                            ;//如果前面某辆车到达目的地，不再判断
                        }
                        else{//在路上的就判断是否和当前车在同一路段
                            if(_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath){
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {//如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {//如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    // jxd
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            ifCar?sign = intersectionBTOA(sx, lightlist, car.type): sign = 2;
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 586) {
                            // 判断路口情况 jxd
                            sign = intersectionBTOA(sx, lightlist, car.type);
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
                            if(former === undefined){//第一辆车，正常行驶
                                obsFlag = 1;
                            }
                            else{//不是第一辆车就判断距离
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
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
                            if(former === undefined){
                                if (sx === 562) {
                                    slowdown = 0;
                                }
                            }
                            else{
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30 || sx == 562) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if(former === undefined){
                                    obsFlag = 3
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                                if (ifCar) sign = intersectionBTOA(sx, lightlist, car.type);
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
                                if(former === undefined){
                                    obsFlag = 1;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if(former === undefined){
                                    obsFlag = 3;
                                }
                                else{
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                            }
                            break; //加速,速度到达2时，状态变为正常行驶
                        default:
                            break;
                    }

                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                    car.x = sx;
                    car.y = sy;
                    if(car.x <= (_self.W / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace){
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if(car.curPath in _self.obstructsInEachRoad){
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                        else{
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x,car.y,car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }

            }

        };
        return car;
    }
}
}

export {
    Car,
}
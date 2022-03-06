import { intersectionBTOA, intersectionATOB, intersectionCTOD, intersectionDTOC, intersectionDTOA, intersectionATOC, intersectionCTOB, intersectionBTOD } from "./intersection.js"
var number = 0;

function carNumber() {
    number = number + 1;
}

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
            console.log(car.type, car.sourcePlace, car.targetPlace);
        };
        car.drawDToA = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            // sign用来记录车辆行驶状态，0停车，1正常速度，2减速，3加速
            let sign = 1;
            let accelerate = 0; //加速速度
            let slowdown = 2; //减速速度
            let obsFlag = 1;
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy <= _self.H / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("DToA");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawRightToLeftLines(_self, _self.W / 2 + (_self.RoadW - _self.carW) / 2, _self.H / 2 + _self.RoadW, ((_self.RoadW - _self.carW) / 2) + _self.RoadW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    if (car.type == 'NormalCar') {
                        // 普通车
                        if (sy === 440) {
                            // 判断路口情况 jxd
                            sign = intersectionDTOA(sy, lightlist1, car.type);
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
                            sign = intersectionDTOA(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sy <= 390) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30 || sy == 390) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
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
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x - add <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy === _self.H / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("DToB");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy <= 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            sign = intersectionDTOC(sy, lightlist1, car.type);
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
                            sign = intersectionDTOC(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            if (sy == 390) {
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
                            if (former === undefined) {
                                if (sy === 390) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30 || sy == 390) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3
                                    }
                                }
                                sign = intersectionDTOC(sy, lightlist1, car.type);
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    if (car.x <= (_self.H / 2 + _self.RoadW) && car.curPath !== "-" + car.targetPlace) {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("AToD");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 1500);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + (_self.RoadW - _self.carW) / 2, _self.carH + ((_self.RoadW - _self.carW) / 2) + _self.carW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y + add + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
        car.drawAToC = function(_self, sx, sy) {
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            let sign = 1; //flag表示定时器下一次预计的车辆状态，0表示车辆停止，1表示车辆行驶，2表示减速停车，3表示起步加速
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx >= _self.W / 2 - _self.RoadW - _self.carH) {
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
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawDownToTopLines(_self, _self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + (_self.RoadW - _self.carW) / 2, _self.RoadW + ((_self.RoadW - _self.carW) / 2) + _self.carH);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                    if (car.type == 'NormalCar') {
                        if (sx === 370) {
                            // 判断路口情况 jxd
                            sign = intersectionATOC(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 394) {
                            // 判断路口情况 jxd
                            sign = intersectionATOC(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sx >= 420) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) {
                        if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
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
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
                                    if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y - add <= _self.obstructsInEachRoad[car.curPath][former][1] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx >= _self.W - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            sign = intersectionATOB(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 394) {
                            // 判断路口情况 jxd
                            sign = intersectionATOB(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx + car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sx == 562) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0] || sx == 420) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                                sign = intersectionATOB(sx, lightlist, car.type);
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x + 30 >= _self.obstructsInEachRoad[car.curPath][former][0]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    if (car.x >= (_self.W / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace) {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
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
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            car.curPath = car.sourcePlace;
            car.x = sx;
            car.y = sy;
            car.pathIdx = _self.obstructsInAllRoads.length;
            //当前道路上的位置
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy == _self.H / 2 - _self.RoadW - _self.carH) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("CToB");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawLeftToRightLines(_self, _self.W / 2 - _self.RoadW + ((_self.RoadW - _self.carW) / 2), _self.H / 2 - _self.RoadW - _self.carH, _self.carH + _self.RoadW + ((_self.RoadW - _self.carW) / 2) + _self.carW);
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    if (car.type == 'NormalCar') {
                        if (sy === 192) {
                            // 判断路口情况 jxd
                            sign = intersectionCTOB(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sy === 216) {
                            // 判断路口情况 jxd
                            sign = intersectionCTOB(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sy === 242) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1] || sy == 242) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy >= _self.H / 2 - _self.RoadW - _self.carH) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("CToA");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sy >= _self.H - 100) {
                    clearInterval(id);
                    carNumber();
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
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
                            sign = intersectionCTOD(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sy === 216) {
                            // 判断路口情况 jxd
                            sign = intersectionCTOD(sy, lightlist1, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sy = sy + car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sy === 246) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1] || sy == 246) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.y + 30 >= _self.obstructsInEachRoad[car.curPath][former][1]) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    if (car.y >= (_self.H / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace) {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }
                    _self.obstructsInAllRoads[car.pathIdx][0] = car.x;
                    _self.obstructsInAllRoads[car.pathIdx][1] = car.y;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][0] = car.x;
                    _self.obstructsInEachRoad[car.curPath][car.curRoadIdx][1] = car.y;
                }
            }
        };
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx === _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("BToC");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
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
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    obsFlag = 2;
                                } else {
                                    obsFlag = 1;
                                }
                            }
                            break; //正常行驶
                        case 2:
                            if (former === undefined) {
                                slowdown = 0;
                            } else {
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx <= _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName(car.type + car.index)[0];
                    normalCar.classList.add("BToD");
                    let flag = 0;
                    setTimeout(function() {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx]
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        }
                    }, 500);
                    setTimeout(function() {
                        flag = 1;
                    }, 3000);

                    function checkFlag() {
                        if (flag === 1) {
                            clearInterval(checkIdx);
                            car.drawTopToDownLines(_self, _self.W / 2 + _self.RoadW, _self.H / 2 - _self.carW - ((_self.RoadW - _self.carW) / 2), _self.RoadW + _self.carW + ((_self.RoadW - _self.carW) / 2));
                        }
                    }
                    let checkIdx = setInterval(checkFlag, 80);
                } else {
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            sign = intersectionBTOD(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else {
                        if (sx === 586) {
                            // 判断路口情况 jxd
                            sign = intersectionBTOD(sx, lightlist, car.type);
                        }
                        if (obsFlag === 2 || sign === 2) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    }
                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else {
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
                            if (former === undefined) {
                                if (sx === 562) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30 || sx == 562) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
            _self.obstructsInAllRoads.push([car.x, car.y, car.curPath]);
            //当前道路上的位置
            if (car.curPath in _self.obstructsInEachRoad) {
                car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            } else {
                _self.obstructsInEachRoad[car.curPath] = [];
                car.curRoadIdx = 0;
                _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
            }
            try {
                father.removeChild(document.getElementsByClassName(car.type + car.index)[0]);
            } catch (err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame, 30);

            function frame() {
                if (sx <= 100) {
                    carNumber();
                    clearInterval(id);
                    father.removeChild(normalCar);
                    delete _self.obstructsInAllRoads[car.pathIdx];
                    delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                } else {
                    //找到当前车辆前方的与当前车处于同一路段且同方向的车辆的pathIdx
                    let former = undefined;
                    for (let i = 0; i < car.curRoadIdx; i++) {
                        if (_self.obstructsInEachRoad[car.curPath][i] === undefined) {; //如果前面某辆车到达目的地，不再判断
                        } else { //在路上的就判断是否和当前车在同一路段
                            if (_self.obstructsInEachRoad[car.curPath][i][2] === car.curPath) {
                                former = i;
                            }
                        }
                    }
                    if (former !== undefined) { //如果找到了，当前车不是所在路段的第一辆车，就可以根据前方是否有车判断是否要停车
                        if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                            obsFlag = 2;
                        } else {
                            obsFlag = 1;
                        }
                    } else { //如果是第一辆车，那么可以不需要判断，直接正常行驶
                        obsFlag = 1;
                    }
                    // jxd
                    if (car.type == 'NormalCar') {
                        if (sx === 610) {
                            // 判断路口情况 jxd
                            sign = intersectionBTOA(sx, lightlist, car.type);
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

                    // 根据车辆预计行驶状态，控制车辆进行行驶 jxd
                    switch (obsFlag) {
                        case 0:
                            break; //停车
                        case 1:
                            sx = sx - car.speed;
                            if (former === undefined) { //第一辆车，正常行驶
                                obsFlag = 1;
                            } else { //不是第一辆车就判断距离
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
                            if (former === undefined) {
                                if (sx === 562) {
                                    slowdown = 0;
                                }
                            } else {
                                if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30 || sx == 562) {
                                    slowdown = 0;
                                }
                            }
                            if (slowdown <= 0) {
                                if (former === undefined) {
                                    obsFlag = 3
                                } else {
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 3;
                                    }
                                }
                                sign = intersectionBTOA(sx, lightlist, car.type);
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
                                if (former === undefined) {
                                    obsFlag = 1;
                                } else {
                                    if (car.x <= _self.obstructsInEachRoad[car.curPath][former][0] + 30) {
                                        obsFlag = 2;
                                    } else {
                                        obsFlag = 1;
                                    }
                                }
                            } else {
                                if (former === undefined) {
                                    obsFlag = 3;
                                } else {
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
                    if (car.x <= (_self.W / 2 - _self.RoadW) && car.curPath !== "-" + car.targetPlace) {
                        delete _self.obstructsInEachRoad[car.curPath][car.curRoadIdx];
                        car.curPath = "-" + car.targetPlace;
                        _self.obstructsInAllRoads[car.pathIdx][2] = car.curPath;
                        if (car.curPath in _self.obstructsInEachRoad) {
                            car.curRoadIdx = _self.obstructsInEachRoad[car.curPath].length;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
                        } else {
                            _self.obstructsInEachRoad[car.curPath] = [];
                            car.curRoadIdx = 0;
                            _self.obstructsInEachRoad[car.curPath].push([car.x, car.y, car.curPath]);
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

export {
    Car,
    number
}
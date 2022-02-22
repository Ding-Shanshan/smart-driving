let Car = {
    createNewCar : function(type,sourcePlace,targetPlace,index){
        let car = {};
        car.type = type;
        car.sourcePlace = sourcePlace;
        car.targetPlace = targetPlace;
        car.index = index;
        car.showInfo = function(){
            console.log(car.type,car.sourcePlace,car.targetPlace);
        };
        car.drawDToA = function(_self,sx,sy){
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === _self.H/2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
                    normalCar.classList.add("trans");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawRightToLeftLines(_self,_self.W / 2 + (_self.RoadW-_self.carW)/2, _self.H / 2 + _self.RoadW,car.index);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
    
                }
            }
        };
        //绘制车辆从右向左移动
        car.drawRightToLeftLines = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
            let r2l = setInterval(frame,80);
            function frame() {
                if(tx <= 100) {
                    clearInterval(r2l);
                }
                else{
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                    tx = sx - 2;
                }
            }
        };
        car.drawDToB = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === _self.H / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
                    normalCar.classList.add("transToRight");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawLeftToRightLines(_self,_self.W / 2 + (_self.RoadW-_self.carW)/2,_self.H / 2 + _self.RoadW);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        //绘制车辆从左向右移动
        car.drawLeftToRightLines = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
            let r2l = setInterval(frame,80);
            function frame() {
                if(tx >= _self.W - 100) {
                    clearInterval(r2l);
                }
                else{
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                    tx = sx + 2;
                }
            }
        };
        car.drawDToC = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === 100) {
                    clearInterval(id);
                }
                else{
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawAToD = function(_self,sx,sy){
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
                    normalCar.classList.add("transToDown");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawTopToDownLines(_self,_self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH,car.index);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                }
                else{
                    tx = sx + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawTopToDownLines = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
            let r2l = setInterval(frame,80);
            function frame() {
                if(ty >= _self.H - 100) {
                    clearInterval(r2l);
                }
                else{
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                }
            }
        };
        car.drawAToC = function(_self,sx,sy){
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === (_self.W / 2 - _self.RoadW - _self.carH)) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
                    normalCar.classList.add("transToTop");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawDownToTopLines(_self,_self.W / 2 - _self.RoadW - _self.carH, _self.H / 2 + _self.carH,car.index);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    tx = sx + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
    
                }
            }
        };
        car.drawDownToTopLines = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
            let r2l = setInterval(frame,80);
            function frame() {
                if(ty <= 100) {
                    clearInterval(r2l);
                }
                else{
                    ty = sy - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = tx + "px";
                    normalCar.style.top = ty + "px";
                }
            }
        };
        car.drawAToB = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === _self.W - 100) {
                    clearInterval(id);
                }
                else{
                    tx = sx + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };

        car.drawCToB = function(_self,sx,sy){
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === _self.H/2 - _self.carH - _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
                    normalCar.classList.add("transTopToRight");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawLeftToRightLines(_self,_self.W / 2 -_self.RoadW + ((_self.RoadW-_self.carW)/2), _self.H/2 - _self.carH - _self.RoadW, car.index);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        car.drawCToA = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === _self.H / 2 - _self.RoadW - _self.carH) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCar"+car.index)[0];
                    normalCar.classList.add("transToLeft");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawRightToLeftLines(_self,_self.W / 2 -_self.RoadW + ((_self.RoadW-_self.carW)/2), self.H / 2 - _self.RoadW);
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };



        car.drawCToD = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src","/img/cars_normal.cd369ee2.png");
            normalCar.setAttribute("width","10");
            normalCar.setAttribute("height","20");
            normalCar.setAttribute("class","NormalCar"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCar'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(ty === _self.H - 100) {
                    clearInterval(id);
                }
                else{
                    ty = sy + 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };


        car.drawBToC = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
                    normalCar.classList.add("transRightToTop");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawDownToTopLines(_self,_self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW-_self.carW)/2));
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };

        car.drawBToD = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.style.cssText = `position: absolute;`;
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === _self.W / 2 + _self.RoadW) {
                    clearInterval(id);
                    //加上旋转属性
                    let normalCar = document.getElementsByClassName("NormalCarRow"+car.index)[0];
                    normalCar.classList.add("transRightToDown");
                    let flag = 0;
                    setTimeout(function() {
                      flag = 1;
                    },3500);
                    function checkFlag() {
                      if(flag === 1){
                        clearInterval(checkIdx);
                        car.drawTopToDownLines(_self,_self.W / 2 + _self.RoadW, _self.H / 2 - _self.RoadW + ((_self.RoadW-_self.carW)/2));
                      }
                    }
                    let checkIdx = setInterval(checkFlag,80);
                    
                }
                else{
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };

        car.drawBToA = function(_self,sx,sy) {
            let tx = sx;
            let ty = sy;
            let father = document.getElementsByClassName("MyCanvas")[0];
            let normalCar = document.createElement("img");
            normalCar.setAttribute("src",require("../assets/images/cars_normal90.png"));
            normalCar.setAttribute("width","20");
            normalCar.setAttribute("height","10");
            normalCar.setAttribute("class","NormalCarRow"+car.index);
            normalCar.style.position = "absolute";
            normalCar.style.left = sx + "px";
            normalCar.style.top = sy + "px";
            try {
                father.removeChild(document.getElementsByClassName('NormalCarRow'+car.index)[0]);
            }
            catch(err) {
                console.log("there is no img");
            }
            father.appendChild(normalCar);
            let id = setInterval(frame,80);
            function frame() {
                if(tx === 100) {
                    clearInterval(id);
                }
                else{
                    tx = sx - 2;
                    sx = tx;
                    sy = ty;
                    normalCar.style.left = sx + "px";
                    normalCar.style.top = sy + "px";
                }
            }
        };
        return car;
    }
}

export {  
    Car  
}  
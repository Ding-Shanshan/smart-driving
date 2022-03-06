export function intersectionBTOA(tx,lightlist,type){
    // 判断当前车辆预计的行驶状态
        // 1、判断当前灯的状态
        // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
        var nowLight;    // 获取红绿灯
        var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
        var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
        var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
        var flag=1;
        for(let i=0;i<3;i++)
        {
            if(lightlist[i].style.opacity==1)
            {
                nowLight=lightlist[i].className; //获取红绿灯
            }
        }
        if((type==='NormalCar'&&tx===610)||(type==='SmartCar'&&tx===586))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
        {
            //如果为红灯并且剩余时间大于等于0.5s,减速停车
            if(nowLight=="red"&&sRedTime>=0.5)  
            {
                flag=2;
            }
            // 如果为红灯并且剩余时间小于0.5s,正常行驶
            if(nowLight=="red"&&sRedTime<0.5)
            {
                flag=1;
            }
                //如果为黄灯并且剩余时间大于等于0.5s,减速停车
            if(nowLight=="yellow"&&sYellowTime>=0.5)
            {
                flag=2;
            }
                // 如果为黄灯并且剩余时间小于0.5s,正常行驶
            if(nowLight=="yellow"&&sYellowTime<0.5)
            {
                flag=1;
            }
                //如果为黄灯并且剩余时间大于0.5s,正常行驶
            if(nowLight=="green"&&sGreenTime>=0.5)
            {
                flag=1;
            }
                // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                if(nowLight=="green"&&sGreenTime<0.5)
                {
                    flag=2;
                }
        }
        if((type==='NormalCar'&&tx>560&&tx<610)||(type==='SmartCar'&&tx>560&&tx<585)){
            if(nowLight=="green")
            {
                flag=3;
                // console.log("flag",flag)
            }else{
                flag=2;
            }
        }
        return flag;
    };

export function intersectionATOB(tx,lightlist,type){
    // 判断当前车辆预计的行驶状态
        // 1、判断当前灯的状态
        // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
        var nowLight;    // 获取红绿灯
        var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
        var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
        var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
        var flag=1;
        for(let i=0;i<3;i++)
        {
            if(lightlist[i].style.opacity==1)
            {
                nowLight=lightlist[i].className; //获取红绿灯
            }
        }
        if((type==='NormalCar'&&tx===370)||(type==='SmartCar'&&tx===394))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
        {
            //如果为红灯并且剩余时间大于等于0.5s,减速停车
            if(nowLight=="red"&&sRedTime>=0.5)  
            {
                flag=2;
            }
            // 如果为红灯并且剩余时间小于0.5s,正常行驶
            if(nowLight=="red"&&sRedTime<0.5)
            {
                flag=1;
            }
                //如果为黄灯并且剩余时间大于等于0.5s,减速停车
            if(nowLight=="yellow"&&sYellowTime>=0.5)
            {
                flag=2;
            }
                // 如果为黄灯并且剩余时间小于0.5s,正常行驶
            if(nowLight=="yellow"&&sYellowTime<0.5)
            {
                flag=1;
            }
                //如果为黄灯并且剩余时间大于0.5s,正常行驶
            if(nowLight=="green"&&sGreenTime>=0.5)
            {
                flag=1;
            }
            // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
            if(nowLight=="green"&&sGreenTime<0.5)
            {
                    flag=2;
            }
        }
        if((type==='NormalCar'&&tx>370&&tx<420)||(type==='SmartCar'&&tx>394&&tx<420)){
            if(nowLight=="green")
            {
                flag=3;
                // console.log("flag",flag)
            }else{
                flag=2;
            }
        }
        return flag;
    };
export function intersectionCTOD(ty,lightlist,type){
        // 判断当前车辆预计的行驶状态
            // 1、判断当前灯的状态
            // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
            var nowLight;    // 获取红绿灯
            var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
            var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var flag=1;
            for(let i=0;i<3;i++)
            {
                if(lightlist[i].style.opacity==1)
                {
                    nowLight=lightlist[i].className; //获取红绿灯
                }
            }
            if((type==='NormalCar'&&ty===118)||(type==='SmartCar'&&ty===142))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
            {
                //如果为红灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="red"&&sRedTime>=0.5)  
                {
                    flag=2;
                }
                // 如果为红灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="red"&&sRedTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="yellow"&&sYellowTime>=0.5)
                {
                    flag=2;
                }
                    // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="yellow"&&sYellowTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于0.5s,正常行驶
                if(nowLight=="green"&&sGreenTime>=0.5)
                {
                    flag=1;
                }
                // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                if(nowLight=="green"&&sGreenTime<0.5)
                {
                        flag=2;
                }
            }
            if((type==='NormalCar'&&ty>118&&ty<171)||(type==='SmartCar'&&ty>142&&ty<171)){
                // console.log("ty",ty)
                if(nowLight=="green")
                {
                    flag=3;
                    // console.log("flag",flag)
                }else{
                    flag=2;
                }
            }
           
            return flag;
        };
export function intersectionDTOC(ty,lightlist,type){
    // 判断当前车辆预计的行驶状态
            // 1、判断当前灯的状态
            // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
            var nowLight;    // 获取红绿灯
            var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
            var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var flag=1;
            for(let i=0;i<3;i++)
            {
                if(lightlist[i].style.opacity==1)
                {
                    nowLight=lightlist[i].className; //获取红绿灯
                }
            }
            if((type==='NormalCar'&&ty===360)||(type==='SmartCar'&&ty===334))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
            {
                //如果为红灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="red"&&sRedTime>=0.5)  
                {
                    flag=2;
                }
                // 如果为红灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="red"&&sRedTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="yellow"&&sYellowTime>=0.5)
                {
                    flag=2;
                }
                    // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="yellow"&&sYellowTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于0.5s,正常行驶
                if(nowLight=="green"&&sGreenTime>=0.5)
                {
                    flag=1;
                }
                // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                if(nowLight=="green"&&sGreenTime<0.5)
                {
                        flag=2;
                }
            }
            if((type==='NormalCar'&&ty<360&&ty>306)||(type==='SmartCar'&&ty<334&&ty>306)){
                // console.log("tx",nowLight)
                if(nowLight=="green")
                {
                    flag=3;
                    // console.log("flag",flag)
                }else{
                    flag=2;
                }
            }
            return flag;
    };
 export function intersectionDTOA(ty,lightlist,type){
        // 判断当前车辆预计的行驶状态
                // 1、判断当前灯的状态
                // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
                var nowLight;    // 获取红绿灯
                var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
                var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                var flag=1;
              
                for(let i=0;i<3;i++)
                {
                    if(lightlist[i].style.opacity==1)
                    {
                        nowLight=lightlist[i].className; //获取红绿灯
                    }
                }
                // console.log(type)
                if((type==='NormalCar'&&ty===360)||(type==='SmartCar'&&ty===334))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
                {
                 
                    //如果为红灯并且剩余时间大于等于0.5s,减速停车
                    if(nowLight=="red"&&sRedTime>=0.5)  
                    {
                        flag=2;
                    }
                    // 如果为红灯并且剩余时间小于0.5s,正常行驶
                    if(nowLight=="red"&&sRedTime<0.5)
                    {
                        flag=1;
                    }
                        //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                    if(nowLight=="yellow"&&sYellowTime>=0.5)
                    {
                        flag=2;
                    }
                        // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                    if(nowLight=="yellow"&&sYellowTime<0.5)
                    {
                        flag=1;
                    }
                        //如果为黄灯并且剩余时间大于0.5s,正常行驶
                    if(nowLight=="green"&&sGreenTime>=0.5)
                    {
                        flag=1;
                    }
                    // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                    if(nowLight=="green"&&sGreenTime<0.5)
                    {
                            flag=2;
                    }
                }
                if((type==='NormalCar'&&ty<360&&ty>306)||(type==='SmartCar'&&ty<334&&ty>306)){
                    // console.log("tx",nowLight)
                    if(nowLight=="green")
                    {
                        flag=3;
                        // console.log("flag",flag)
                    }else{
                        flag=2;
                    }
                }
                return flag;
        };
export function intersectionATOC(tx,lightlist,type){
            // 判断当前车辆预计的行驶状态
                    // 1、判断当前灯的状态
                    // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
                    var nowLight;    // 获取红绿灯
                    var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
                    var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                    var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                    var flag=1;
                    for(let i=0;i<3;i++)
                    {
                        if(lightlist[i].style.opacity==1)
                        {
                            nowLight=lightlist[i].className; //获取红绿灯
                        }
                    }
                    // console.log(nowLight)
                    if((type==='NormalCar'&&tx===370)||(type==='SmartCar'&&tx===394))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
                    {
                        //如果为红灯并且剩余时间大于等于0.5s,减速停车
                        if(nowLight=="red"&&sRedTime>=0.5)  
                        {
                            flag=2;
                        }
                        // 如果为红灯并且剩余时间小于0.5s,正常行驶
                        if(nowLight=="red"&&sRedTime<0.5)
                        {
                            flag=1;
                        }
                            //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                        if(nowLight=="yellow"&&sYellowTime>=0.5)
                        {
                            flag=2;
                        }
                            // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                        if(nowLight=="yellow"&&sYellowTime<0.5)
                        {
                            flag=1;
                        }
                            //如果为黄灯并且剩余时间大于0.5s,正常行驶
                        if(nowLight=="green"&&sGreenTime>=0.5)
                        {
                            flag=1;
                        }
                        // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                        if(nowLight=="green"&&sGreenTime<0.5)
                        {
                                flag=2;
                        }
                    }
                    if((type==='NormalCar'&&tx>370&&tx<422)||(type==='SmartCar'&&tx>394&&tx<422)){
                        // console.log("tx",nowLight)
                        if(nowLight=="green")
                        {
                            flag=3;
                            // console.log("flag",flag)
                        }else{
                            flag=2;
                        }
                    }
                    return flag;
            };
export function intersectionCTOB(ty,lightlist,type){
                // 判断当前车辆预计的行驶状态
                        // 1、判断当前灯的状态
                        // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
                        var nowLight;    // 获取红绿灯
                        var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
                        var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                        var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
                        var flag=1;
                        for(let i=0;i<3;i++)
                        {
                            if(lightlist[i].style.opacity==1)
                            {
                                nowLight=lightlist[i].className; //获取红绿灯
                            }
                        }
                        if((type==='NormalCar'&&ty===118)||(type==='SmartCar'&&ty===142))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
                        {
                            //如果为红灯并且剩余时间大于等于0.5s,减速停车
                            if(nowLight=="red"&&sRedTime>=0.5)  
                            {
                                flag=2;
                            }
                            // 如果为红灯并且剩余时间小于0.5s,正常行驶
                            if(nowLight=="red"&&sRedTime<0.5)
                            {
                                flag=1;
                            }
                                //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                            if(nowLight=="yellow"&&sYellowTime>=0.5)
                            {
                                flag=2;
                            }
                                // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                            if(nowLight=="yellow"&&sYellowTime<0.5)
                            {
                                flag=1;
                            }
                                //如果为黄灯并且剩余时间大于0.5s,正常行驶
                            if(nowLight=="green"&&sGreenTime>=0.5)
                            {
                                flag=1;
                            }
                            // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                            if(nowLight=="green"&&sGreenTime<0.5)
                            {
                                    flag=2;
                            }
                        }
                        if((type==='NormalCar'&&ty>118&&ty<171)||(type==='SmartCar'&&ty>142&&ty<171)){
                            // console.log("tx",nowLight)
                            if(nowLight=="green")
                            {
                                flag=3;
                                // console.log("flag",flag)
                            }else{
                                flag=2;
                            }
                        }
                        return flag;
                };
export function intersectionBTOD(tx,lightlist,type){
    // 判断当前车辆预计的行驶状态
            // 1、判断当前灯的状态
            // 2、根据灯的状态以及距离灯的位置来改变车辆行驶状态
            var nowLight;    // 获取红绿灯
            var sRedTime=0.5;       //车辆到达指定像素，红灯剩余时间
            var sGreenTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var sYellowTime=0.5;     //车辆到达指定像素，绿灯剩余时间
            var flag=1;
            for(let i=0;i<3;i++)
            {
                if(lightlist[i].style.opacity==1)
                {
                    nowLight=lightlist[i].className; //获取红绿灯
                }
            }
            if((type==='NormalCar'&&tx===610)||(type==='SmartCar'&&tx===586))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
            {
                //如果为红灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="red"&&sRedTime>=0.5)  
                {
                    flag=2;
                }
                // 如果为红灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="red"&&sRedTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于等于0.5s,减速停车
                if(nowLight=="yellow"&&sYellowTime>=0.5)
                {
                    flag=2;
                }
                    // 如果为黄灯并且剩余时间小于0.5s,正常行驶
                if(nowLight=="yellow"&&sYellowTime<0.5)
                {
                    flag=1;
                }
                    //如果为黄灯并且剩余时间大于0.5s,正常行驶
                if(nowLight=="green"&&sGreenTime>=0.5)
                {
                    flag=1;
                }
                // 如果为绿灯并且剩余时间小于等于0.5s,减速行驶
                if(nowLight=="green"&&sGreenTime<0.5)
                {
                    flag=2;
                }
            }
            if((type==='NormalCar'&&tx>550&&tx<610)||(type==='SmartCar'&&tx>550&&tx<585)){
                // console.log("tx",nowLight)
                if(nowLight=="green")
                {
                    flag=3;
                    // console.log("flag",flag)
                }else{
                    flag=2;
                }
            }
            return flag;
    };
    

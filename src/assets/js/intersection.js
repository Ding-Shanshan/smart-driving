export function intersectionBTOA(tx,lightlist){
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
        if(tx===610)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
        if(tx>560&&tx<610){
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

export function intersectionATOB(tx,lightlist){
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
        if(tx===370)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
        if(tx>370&&tx<420){
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
export function intersectionCTOD(ty,lightlist){
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
            if(ty===118)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
            if(ty>118&&ty<168){
                console.log("ty",ty)
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
export function intersectionDTOC(ty,lightlist){
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
            if(ty===360)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
            if(ty<360&&ty>310){
                console.log("tx",nowLight)
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
 export function intersectionDTOA(ty,lightlist){
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
                if(ty===360)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
                if(ty<360&&ty>306){
                    console.log("tx",nowLight)
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
export function intersectionATOC(tx,lightlist){
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
                    console.log(nowLight)
                    if(tx===370)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
                    if(tx>370&&tx<422){
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
export function intersectionCTOB(ty,lightlist){
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
                        if(ty===118)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
                        if(ty>118&&ty<171){
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
export function intersectionBTOD(tx,lightlist){
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
            if(tx===610)  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
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
            if(tx>550&&tx<610){
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
    

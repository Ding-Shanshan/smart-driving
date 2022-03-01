export function judgeObsBTOA(car){
    // 判断当前车辆预计的行驶状态

        var flag=1;

        if(car.x <= (car.rootSelf.obstructs[car.index-1]+20))  //在x行驶到路口前20像素开始根据红绿灯来判断是否减速
        {
            flag = 2;
        }
        else if(car.x > (car.rootSelf.obstructs[car.index-1]+20)){
            flag = 3;
        }

        return flag;
    };
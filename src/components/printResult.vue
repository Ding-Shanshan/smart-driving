<template>
  <div>
    <h4>运行结果</h4>
    <h4 id=mytime>{{runtime}}</h4>
  </div>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  props:['isRun'],
  setup(props) {
  let runtime = ref('00分00秒000毫秒')
   watch(
     ( ) => props.isRun,
     (newValue,oldValue) => {
       console.log('11')
       if(newValue === true && oldValue === false){
        var minute,second;
        minute = second = 0;
        var millisecond = 0;
        var int;
        //开始函数
        int = setInterval(timer,50);
        //计时函数
        function timer()
        {
          millisecond=millisecond+50;
          if(millisecond>=1000)
            {
              millisecond=0;
              second=second+1;
            }
          if(second>=60)
            {
              second=0;
              minute=minute+1;
            }
          runtime = minute+'分'+second+'秒'+millisecond+'毫秒'
          console.log(runtime)
        }
      }
     }
   )
    return {
      runtime
    }

  //       //重置函数
  //       // function Reset()
  //       // {
  //       //   window.clearInterval(int);
  //       //   millisecond=hour=minute=second=0;
  //       //   '00分00秒000毫秒';
  //       // }
  //       // //暂停函数
  //       // function stop()
  //       // {
  //       //   window.clearInterval(int);
  //       // }
  //         }
  //       }
  //     },
  }
}
</script>
<style lang="less" scoped>
h4 {
    text-align: center;
}
div {
    font-size: 14px;
    font-weight: 400;
}
</style>
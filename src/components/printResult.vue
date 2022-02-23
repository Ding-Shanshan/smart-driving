<template>
  <div>
    <h4>运行结果</h4>
    <h4 id=mytime>{{runtime}}</h4>
  </div>
</template>

<script>

export default {
  props:['isRun'],
  setup() {
    
  },
  data(){
      return{
        runTime:'',
        runtime:''
      }
    },
  watch:{
    isRun(newValue,oldValue){
      console.log(newValue,oldValue);
      if(newValue === true && oldValue ===false){
        var minute,second;
        minute=second=0;
        var millisecond=0;
        var int;
        //开始函数
        int=setInterval(timer,50);
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
          let runtime = minute+'分'+second+'秒'+millisecond+'毫秒'
          console.log(runtime)
        }
        //重置函数
        // function Reset()
        // {
        //   window.clearInterval(int);
        //   millisecond=hour=minute=second=0;
        //   '00分00秒000毫秒';
        // }
        // //暂停函数
        // function stop()
        // {
        //   window.clearInterval(int);
        // }
          }
        }
      },
  methods:{

  }
}
</script>

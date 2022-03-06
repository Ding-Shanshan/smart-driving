<template>
    <el-container>
        <!-- 头部 -->
        <el-header>
            <h1>SimID 模拟智能驾驶</h1>
        </el-header>
        <el-container>
            <!-- 主体 -->
            <el-main>
                <div class="simulationDiagram">
                    <simulationDiagram ref="moving"></simulationDiagram>
                </div>
            </el-main>
            <!-- 侧边栏 -->
            <el-aside width="300px">
                <!-- 参数调节面板 -->
                <div class="setParameters">
                    <setParameters  @createCar="createCar" @runchange="isRun"></setParameters>
                </div>
                <!-- 运行结果面板 -->
                <div class="printResult">
                    <printResult :isRun="isrun" :paramters="parameters"></printResult>
                </div>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
import simulationDiagram from "@/components/simulationDiagram.vue"
import setParameters from "@/components/setParameters.vue"
import printResult from "@/components/printResult.vue"
export default {
    data(){
        return{
            isrun:false,
            parameters: {
                totalNum: '30',
                proportion:'0.5',
            },
        }
    },
    components:{
        simulationDiagram,
        setParameters,
        printResult,
    },
    methods : {
        createCar(data) {
            console.log(data);
            this.cardata = data
            this.$refs.moving.textConnection(data);
        },
        isRun(val) {                        //获取是否运行，以及参数列表用于计时和表格生成
            this.isrun = val[0];
            this.parameters = val[1];
            var vm = this;
            var int;
            int = setInterval(judgeIsRun,50);
            function judgeIsRun(){
                if(window.number === val[1].totalNum*1){    //计时器停止条件为当到达终点的车数等于设定的总数
                    vm.isrun = false
                    window.number = 0
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-header{
    background-color: #fff;
    h1 {
        color: #569FF8;
    }
    border-bottom: 1px solid #DDDFE5;
}
.el-main {
    background-color: #fff;
    padding: 10px 0;
}
.el-aside{
    padding: 20px 20px 10px 10px;
    color: #303133;
    border-left: 1px solid #DDDFE5;
}
.setParameters {
    margin-bottom: 40px;
}
.time{
    width: 200px;
    height: 300px;
}
</style>
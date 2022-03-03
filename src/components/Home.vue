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
                    <printResult :isRun="isrun"></printResult>
                </div>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
import { number } from "../assets/js/CreateNewCar"
import simulationDiagram from "@/components/simulationDiagram.vue"
import setParameters from "@/components/setParameters.vue"
import printResult from "@/components/printResult.vue"
export default {
    data(){
        return{
            isrun:false
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
            this.$refs.moving.textConnection(data);
        },
        isRun(val) {
            this.isrun = val[0]
            var vm = this
            if(number === val[1].totalNum*1)
            Vue.prototype.$number = number
            var int;
            int = setInterval(judgeIsRun,50);
            function judgeIsRun(){
                if(number === val[1].totalNum*1)
                vm.isrun = false;
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
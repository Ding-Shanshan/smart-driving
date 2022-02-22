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
                    <setParameters  @createCar="createCar"></setParameters>
                </div>
                <!-- 运行结果面板 -->
                <div class="printResult">
                    <printResult/>
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
    components:{
        simulationDiagram,
        setParameters,
        printResult,
    },
    methods : {
        createCar(data) {
            console.log(data);
            this.$refs.moving.textConnection(data);
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
    h4 {
        font-size: 14px;
        text-align: center;
    }
}
.setParameters {
    margin-bottom: 40px;
}
</style>
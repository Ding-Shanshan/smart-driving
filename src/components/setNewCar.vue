<template>
    <div>
        <h4>新增车辆</h4>
        <el-form ref="createCarsParametersRef" :model="createCarsParameters" label-width="100px">
            <!-- 始发地 -->
            <el-form-item label="始发地：">
                <el-select v-model="createCarsParameters.sourcePlace" placeholder="sourcePlace">
                    <el-option label="A" value="A"></el-option>
                    <el-option label="B" value="B"></el-option>
                    <el-option label="C" value="C"></el-option>
                    <el-option label="D" value="D"></el-option>
                </el-select>
            </el-form-item>
            <!-- 目的地 -->
            <el-form-item label="目的地：">
                <el-select v-model="createCarsParameters.targetPlace" placeholder="targetPlace">
                    <el-option label="A" value="A"></el-option>
                    <el-option label="B" value="B"></el-option>
                    <el-option label="C" value="C"></el-option>
                    <el-option label="D" value="D"></el-option>
                </el-select>
            </el-form-item>
            <!-- 车辆类型 -->
            <el-form-item label="车辆类型：">
                <el-select v-model="createCarsParameters.catType" placeholder="Type of Cars">
                    <el-option label="普通车" value="Normal"></el-option>
                    <el-option label="智能车" value="Smart"></el-option>
                </el-select>
            </el-form-item>
            <!-- 运行 -->
            <el-form-item class="createCars">
                <el-button type="primary" @click="createCar">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 参数对象
            createCarsParameters: {
                sourcePlace : '',
                targetPlace : '',
                catType : ''
            }
        }
    },
    methods: {
        createCar() {
            console.log(this.createCarsParameters);
            this.$emit('createCar',this.createCarsParameters);
        }
    }
}
</script>

<style lang="less" scoped>

</style>
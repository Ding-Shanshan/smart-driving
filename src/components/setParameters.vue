<template>
    <div>
        <h4>参数调节</h4>
        <el-form ref="parametersRef" :model="parameters" label-width="100px">
            <!-- 车辆总数 -->
            <el-form-item label="车辆总数：">
                <el-select v-model="parameters.totalNum" placeholder="Total number of vehicles">
                    <el-option label="10" value="10"></el-option>
                    <el-option label="30" value="30"></el-option>
                    <el-option label="50" value="50"></el-option>
                    <el-option label="80" value="80"></el-option>
                </el-select>
            </el-form-item>
            <!-- 智能车比例 -->
            <el-form-item label="智能车比例：">
                <el-select v-model="parameters.proportion" placeholder="Proportion of smart cars">
                    <el-option label="0%" value="0"></el-option>
                    <el-option label="10%" value="0.1"></el-option>
                    <el-option label="30%" value="0.3"></el-option>
                    <el-option label="50%" value="0.5"></el-option>
                    <el-option label="80%" value="0.8"></el-option>
                    <el-option label="100%" value="1"></el-option>
                </el-select>
            </el-form-item>
            <!-- 智能车车速 -->
            <el-form-item label="智能车车速：">
                <el-select v-model="parameters.smartCarSpeed" placeholder="Speed of smart cars">
                    <el-option label="30km/h" value="30"></el-option>
                    <el-option label="60km/h" value="60"></el-option>
                    <el-option label="80km/h" value="80"></el-option>
                </el-select>
            </el-form-item>
            <!-- 普通车车速 -->
            <el-form-item label="普通车车速：">
                <el-select v-model="parameters.normalCarSpeed" placeholder="Speed of normal cars">
                    <el-option label="30km/h-50km/h" value="30,50"></el-option>
                    <el-option label="40km/h-70km/h" value="40,70"></el-option>
                    <el-option label="60km/h-90km/h" value="60,90"></el-option>
                </el-select>
            </el-form-item>
            <!-- 普通大车比例 -->
            <el-form-item label="大车比例：">
                <el-select v-model="parameters.bigCarproportion" placeholder="Proportion of big cars">
                    <el-option label="5%" value="5"></el-option>
                    <el-option label="10%" value="10"></el-option>
                    <el-option label="30%" value="30"></el-option>
                </el-select>
            </el-form-item>
            <!-- 运行 -->
            <el-form-item class="run">
                <el-button type="primary" @click="run">运行</el-button>
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
            parameters: {
                totalNum: '',
                proportion:'',
                smartCarSpeed:'',
                normalCarSpeed:[],
                bigCarproportion:'' 
            },
            isruning : false
        }
    },
    methods: {
        run() {
            console.log(this.parameters);
            this.$emit('createCar',this.parameters);
            this.isruning = true
            this.$emit('runchange',this.isruning)
        }
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
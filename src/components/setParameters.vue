<template>
    <div>
        <el-collapse>
        <el-collapse-item title="车辆参数" name="1">
        <el-form class="vehicleParameter" ref="parametersRef" :model="parameters" label-width="100px">
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
            <!-- 运行 -->
            <el-form-item class="run">
                <el-button type="primary" @click="run">运行</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        </el-collapse-item>
        <el-collapse-item title="红绿灯参数" name="2">
        <div class="lightParameter">
            <!-- 上下方向红绿灯 -->
            <div class="light">
                <span>纵向红绿灯：</span>
                <el-radio-group v-model="light" @click="changeLightTwo">
                    <el-radio-button label="红灯"></el-radio-button>
                    <el-radio-button label="绿灯"></el-radio-button>
                    <el-radio-button label="默认"></el-radio-button>
                </el-radio-group>
            </div>
            <!-- 左右方向红绿灯 -->
            <div class="light2">
                <span>横向红绿灯：</span>
                <el-radio-group v-model="light2" @click="changeLightOne">
                    <el-radio-button label="红灯"></el-radio-button>
                    <el-radio-button label="绿灯"></el-radio-button>
                    <el-radio-button label="默认"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { useStore } from "vuex"
export default {
    data() {
        return {
            // 参数对象
            parameters: {
                totalNum: '30',
                proportion:'0.5',
            },
            light:'默认',
            light2:'默认',
            isruning : false
        }
    },
    methods: {
        run() {
            console.log(this.parameters);
            this.$emit('createCar',this.parameters);
            this.isruning = true
            this.$emit('runchange',[this.isruning,this.parameters])
        }
    },
    setup() {
        const store = useStore()
        const changeLightOne = (e) => {
            store.commit("changeLightOne", e.target.value)
        }
        const changeLightTwo = (e) => {
            store.commit("changeLightTwo", e.target.value)
        }
        return {
            changeLightOne,
            changeLightTwo,
        }
    },
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
.light,
.light2 {
    text-align: center;
    margin: 20px auto;
}
.light span,
.light2 span{
    color:#606266;
}

</style>
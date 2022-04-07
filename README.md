
# SimID 模拟智能驾驶项目
## 目录

- [项目背景](#项目背景)

- [项目需求](#项目需求)

- [安装与启动](#安装与启动)

- [项目介绍](#项目介绍)

- [使用手册](#使用手册)

- [项目设计](#项目设计)

- [贡献](#贡献)

  

## 项目背景
在智能驾驶成为热议的大背景环境下，本项目尝试模拟在不同交通情况下，智能车的引入能否对道路交通状况产生良好的改善效果
线上演示地址：https://yeecoder.github.io/#/home


## 项目需求

![image-20220307154800058](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/image-20220307154800058.png)

- 必选功能： 

固定道路，支持调整无人驾驶和普通驾驶车辆的比例，来模拟多辆车辆从起点到终点的驾驶情况

- 参考可选功能： 

在路口模拟红绿灯支持更丰富的道路情况（如多车道等） 

可更丰富动态配置车辆情况（包含车速、车辆大小）



## 安装与启动

本项目使用npm包管理工具，安装后可使用如下指令安装相关依赖并启动项目

```shell
npm install
```

```shell
npm run serve
```




## 项目介绍

![image-20220307150539426](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/image-20220307150539426.png)

### 	主要功能&亮点

- 页面分为主界面、参数调节面板、运行结果面板
- 车辆模拟：项目模拟车辆在十字路口的运行状况，包括转弯、避障、读取交通指示灯并调整状态等功能
- 红绿灯控制：搭载可操控变灯的红绿灯，增加了模拟状态的可扩展性
- 参数调节：可调节参数包括道路车辆`车辆总数`、`智能车比例`、`行驶路线`、`车流量`，可以根据需要调节模拟
- 运行结果：对运行结果进行了可视化处理，界面留有当此运行结果记录以及历史数据图表

### 	主要技术&框架

- 本项目基于vue 3框架构建

- 基于canvas完成对道路界面的搭建

- 使用Element plus作为UI框架

- 使用ECharts作为数据可视化原型

  

## 使用手册

  1. 在启动项目后来到模拟界面，你可以在侧边栏展开你需要的面板，在车辆参数面板中可以对`车辆总数`、`智能车比例`、`行驶路线`和`车流量`进行相关设置

  2. 红绿灯参数用于调节十字路口的横向及纵向红绿灯的变灯情况，可选`红灯`、`绿灯`、`默认`三种，调节后页面会展示对应选择，车辆也会自动做出对应选择

  3. 在运行结果模块记录了本次模拟运行的对应选择和结果，可依此对相关结果进行观察比对，同时历史记录模块记录了在不同参数下的运行结果图表可供参考比对

     

## 项目设计

### UI设计

​	UI原型图![空白页 Copy_状态 1 (1)](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/%E7%A9%BA%E7%99%BD%E9%A1%B5%20Copy_%E7%8A%B6%E6%80%81%201%20(1).png)





### 车辆模拟模块

![image-20220307154517515](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/image-20220307154517515.png)

#### **智能车和普通车的参数区别**

1. 为体现出智能车反应速度较快，在红绿灯处做出以下区分，提前判断红绿灯距离：智能车<普通车

2. 车速设定为智能车速度恒定，普通车速度随机

3. 加速度/减速度：智能车>普通车

   

#### 功能实现

- 车辆创建、直行、转弯

实现实例化车辆，建立车辆对象的基本属性和移动方法，车辆行驶时建立状态机，0：停车，1：正常行驶，2：减速，3：加速，其中转弯使用css3的animation特性实现

- 车辆行驶安全距离

为车辆在不同路段分别设置进出队列，通过后车对前车坐标的获取判断是否应当减速避让  

- 车辆行驶红绿灯判断

为车辆赋予四种行驶状态，分别为停车、正常行驶、减速、加速，在车辆将要到达十字路口的指定位置对红绿灯状态进行判断，从而控制后续车辆行驶状态。为防止到达十字路口时红绿灯突然转变，在紧接路口位置再次进行判断

- 车辆路口让行

分别创建直行、左转和右转进入路口的数组，在进入路口前进行判断，阻止可能出现碰撞的车辆进入路口，达到路口让行的目的

- 红绿灯控制

使用面向对象编程对红绿灯功能进行抽象提高代码复用性，使用状态管理工具vuex进行组件通信动态更改红绿灯变色，实习红绿灯时间同步



### 参数调节模块

![image-20220307154541487](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/image-20220307154541487.png)

#### 参数设置

- 车辆总数
- 智能车比例
- 行驶路线
- 车流量



![image-20220307154603149](https://gitee.com/zeng_xiaoxi/smart-driving/raw/master/pictures/image-20220307154603149.png)

### 运行结果面板

运行结果

历史数据

## 模拟数据分析

根据测试结果得出以下结论

- 智能车的比例增加与十字路口的交通状况改善总体呈现出正相关的趋势

- 在控制80辆车及大流量两个变量不变时，0%,30%,50%的智能车比例引入时的交通状况差距不大，根据模拟交通实际情况来看，原因为在道路拥堵的情况下，速度随机的普通车对智能车的“两面夹击”，使得智能车的性能得不到良好发挥，在智能车比例超过50%后，道路交通开始明显改善

- 分析数据中还发现随着智能车引入比例的增加，完成同一段路程的测试最长时间与最短时间差值变小，说明智能车的引入也使得交通状况更为稳定



## 贡献

| 张颖（组长） | 项目总体功能设计、页面布局、模块划分、车辆参数调节模块开发与优化，代码合并与修改                  |
| ------------ | ---------------------------- |
| 靳晓东        |车辆根据红绿灯状态行进、转弯或停车功能和选择行驶路线功能开发与优化                       |
| 刘凯伦        | 项目搭建、智能红绿灯控制模块开发与优化                             |
| 吕佳琦        | 可视化运行结果模块开发与优化，历史数据采集，写项目文档       |
| 曾佳          | 页面UI设计、道路模拟模块中canvas道路绘制、车辆让行功能开发与优化   |
| 赵博文        | 车辆动画实现、车辆实例封装、前后车车距保持功能开发与优化                             |


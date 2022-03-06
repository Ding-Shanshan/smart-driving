
# SimID 模拟智能驾驶项目
## 目录

- [项目背景](#项目背景)
- [项目特点](#项目特点)
- [安装与启动](#安装与启动)
- [使用手册](#使用手册)
- [贡献与鸣谢](#贡献与鸣谢)
- [开源协议](#开源协议)

## 项目背景
在智能驾驶成为热议的大背景环境下，本项目试图模拟在不同交通情况下，智能车的引入能否对道路交通状况产生良好的改善效果
## 项目介绍
- 本项目基于vue框架构建
- 基于canvas完成对道路界面的搭建
- 可调节参数包括道路车辆`车辆总数`、`智能车比例`、`行驶路线`、`车流量`，可以根据需要调节模拟
- 项目模拟车辆在十字路口的运行状况，包括转弯、避障、读取交通指示灯并调整状态等功能
- 搭载可操控变灯的红绿灯，增加了模拟状态的可扩展性
- 对运行结果进行了可视化处理，界面留有当此运行结果记录以及历史数据图表
## 安装与启动
 本项目使用npm包管理工具，安装后可使用如下指令安装相关依赖并启动项目
```shell
npm install
```
```shell
npm run serve
```

## 使用手册
1. 在启动项目后来到模拟界面，你可以在侧边栏展开你需要的面板，在车辆参数面板中可以对`车辆总数`、`智能车比例`、`行驶路线`和`车流量`进行相关设置
2. 红绿灯参数用于调节十字路口的横向及纵向红绿灯的变灯情况，可选`红灯`、`绿灯`、`默认`三种，调节后页面会展示对应选择，车辆也会自动做出对应选择
3. 在运行结果模块记录了本次模拟运行的对应选择和结果，可依此对相关结果进行观察比对，同时历史记录模块记录了在不同参数下的运行结果图表可供参考比对
  

## 贡献与鸣谢
## 开源协议

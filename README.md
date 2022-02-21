# smartdriving

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## MyChanges

添加setNewCar.vue文件，作为页面右下角的点击新增车辆面板。

修改Home.vue，使setNewCar.vue中点击创建后，能够调用simulationDiagram.vue中的创建方法。

在simulationDiagram.vue中，使用textConnection方法（函数名暂定）接收setNewCar.vue经过父组件Home.vue传来的新建车辆的起始地、目的地和车辆类型，并判断应当使用哪一个方法进行创建。

在simulationDiagram.vue中，使用

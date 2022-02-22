// function sleep(contrainer, color, duration) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       ['red', 'yellow', 'green'].forEach(item => {
//         contrainer.querySelector('.' + item).style.opacity = 0.1
//       })
//       contrainer.querySelector('.' + color).style.opacity = 1
//       console.log(duration, color);
//       resolve()
//     }, duration);
//   })
// }
// async function changeColor(contrainer, color, duration) {
//   // console.log('traffic-light ', color, contrainer);
//   await sleep(contrainer, color, duration);
// }
// export async function main(contrainer, redTime, yellowTime, greenTime) {
//   /**
//    * @param contrainer 交通灯容器
//    * @param redTime 红灯时间
//    * @param yellowTime 黄灯时间
//    * @param greenTime 绿灯时间
//    */
//   while (true) {
//     await changeColor(contrainer, 'red', redTime);
//     await changeColor(contrainer, 'yellow', yellowTime);
//     await changeColor(contrainer, 'green', greenTime);
//   }
// }

// 抽象重构
export class MyTrafficLight {
  constructor(contrainer, redTime, yellowTime, greenTime) {
    /**
   * @param contrainer 交通灯容器
   * @param redTime 红灯时间
   * @param yellowTime 黄灯时间
   * @param greenTime 绿灯时间
   */
    this.contrainer = contrainer;
    this.redTime = redTime;
    this.yellowTime = yellowTime;
    this.greenTime = greenTime;
    // 当前灯状态
    this.state = '';
  }

  // 获取当前灯的状态
  getState() {
    return this.state;
  }

  // sleep函数
  sleep(contrainer, color, duration) {
    return new Promise(resolve => {
      setTimeout(() => {
        ['red', 'yellow', 'green'].forEach(item => {
          contrainer.querySelector('.' + item).style.opacity = 0.1
        })
        contrainer.querySelector('.' + color).style.opacity = 1
        // console.log(duration);
        this.state = color;
        resolve()
      }, duration);
    })
  }
  // 改变颜色
  async changeColor(contrainer, color, duration) {
    // console.log('traffic-light ', color, contrainer);
    await this.sleep(contrainer, color, duration);
  }

  // 主函数
  async main() {
    while (true) {
      await this.changeColor(this.contrainer, 'red', this.redTime);
      await this.changeColor(this.contrainer, 'yellow', this.yellowTime);
      await this.changeColor(this.contrainer, 'green', this.greenTime);
    }
  }
}
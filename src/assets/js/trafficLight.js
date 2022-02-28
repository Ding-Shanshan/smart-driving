export class MyTrafficLight {
  constructor(contrainer, redTime, yellowTime, greenTime) {
    /**
   * @param contrainer 交通灯容器
   * @param {int} redTime 红灯时间
   * @param {int} yellowTime 黄灯时间
   * @param {int} greenTime 绿灯时间
   */
    this.contrainer = contrainer;
    this.redTime = redTime;
    this.yellowTime = yellowTime;
    this.greenTime = greenTime;
    // 记录count值，后续可通过增加count的值动态改变红绿灯的时间
    this.count = 0;
    // 当前灯状态
    this.state = 'green';
    // 
    this.timer = null;

    // 默认执行
    this.default();
  }

  // 获取当前灯的状态
  getState() {
    return this.state;
  }

  // 排他
  antiElse(color) {
    ['.green', '.yellow', '.red'].forEach(item => {
      this.contrainer.querySelector(item).style.opacity = 0.1;
    })
    this.contrainer.querySelector(color).style.opacity = 1;
  }

  // 默认效果
  default() {
    // 默认从绿灯开始，如果需要其他颜色，修改下面两行
    this.count = this.greenTime;
    this.antiElse('.green');
    // 更换思路，每隔一秒判断一次灯是否到时间
    this.timer = setInterval(() => {
      switch (this.state) {
        case 'green':
          if (this.count) {
            // this.count--
            this.count-=0.5
          } else {
            this.count = this.yellowTime;
            this.state = 'yellow';
            this.antiElse('.yellow');
          }
          break;

        case 'yellow':
          if (this.count) {
            this.count-=0.5
          } else {
            this.count = this.redTime;
            this.state = 'red';
            this.antiElse('.red');
          }
          break;

        case 'red':
          if (this.count) {
            this.count-=0.5
          } else {
            this.count = this.yellowTime;
            this.state = 'yellow2';
            this.antiElse('.yellow');
          }
          break;
        
        case 'yellow2':
        if (this.count) {
          this.count-=0.5
        } else {
          this.count = this.greenTime;
          this.state = 'green';
          this.antiElse('.green');
        }
        break;

        default:
          break;
      }
    }, 500)
  }

  // 更改颜色
  changeColor(color) {
    /**
     * @param {string} color 颜色的类名('.red')
     */
    // 清除默认效果
    clearInterval(this.timer);
    // 改变颜色
    this.antiElse(color);
  }
}


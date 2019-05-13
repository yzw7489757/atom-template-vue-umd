// 指向引导
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { getDriverLocal, setDriverLocal } from '@/utils/auth'

export default {
  data() {
    return {
      stepsOfApp: [
        {
          element: '#hamburger-container',
          popover: {
            title: '提示',
            description: '点击此处可切换页面',
            position: 'bottom'
          }
        }
      ]
    }
  },
  async mounted() {
    if (getDriverLocal(this.$el.id)) return
    this.driver = new Driver({
      className: 'driver',
      overlayClickNext: false,
      closeBtnText: '知道了',
      doneBtnText: '完成',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      allowClose: false,
      padding: 0,
      onReset: (el) => { setDriverLocal(this.$el.id) }
    })
    const thenReady = () => new Promise((resolve, reject) => {
      switch (this.$el.id) {
        case 'dashboard':
          if (this.isMobile) {
            this.$nextTick(() => {
              setTimeout(() => {
                this.driver.defineSteps(this.stepsOfApp)
                resolve()
              }, 2000)
            })
          }
          break
        default:
          break
      }
    })
    thenReady().then(() => this.driver.start())
  }
}

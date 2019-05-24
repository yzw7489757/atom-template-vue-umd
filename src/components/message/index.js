/* eslint-disable prefer-destructuring */
import Message from './message.vue'

// eslint-disable-next-line prefer-const
let { animateTime, duration } = Message.data()
const MESSAGE = {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Message', Message)
    function msg(type, text, callBack) {
      let msg
      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        // 如果传进来的是对象配置
        msg = text.text || ''
        if (text.duration) {
          duration = text.duration
        }
      }

      const VueMessage = Vue.extend({
        render(h) {
          // 渲染Message组件
          return h('Message', {
            props: {
              type,
              text: msg
            }
          })
        }
      })
      const newMessage = new VueMessage()
      const vm = newMessage.$mount()
      const el = vm.$el
      document.body.appendChild(el)
    }
    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$msg = {
      info(text, callBack) {
        msg('info', text || '', callBack)
      },
      success(text, callBack) {
        msg('success', text || '', callBack)
      },
      error(text, callBack) {
        msg('error', text || '', callBack)
      },
      warning(text, callBack) {
        msg('warning', text || '', callBack)
      }
    }
  }
}
export default MESSAGE
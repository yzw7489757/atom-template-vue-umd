import loadingCom from '@/components/loading/index.vue'
import Vue from 'vue'

export default {
  bind: (el, binding) => {
    // 拿到指令节点上的属性
    const text = el.getAttribute('loading-text') || ''
    const bg = el.getAttribute('loading-background') || ''
    // 创建遮罩层
    const templateWrap = document.createElement('div');
    if (text) {
      // 创建title提示文字
      const templateText = document.createElement('p');
      templateText.innerText = text
      templateText.className = 'y-loading-text'
      templateWrap.appendChild(templateText)
    }
    if (bg) templateWrap.style.backgroundColor = bg
    templateWrap.className = 'y-loading'
    //  仿element-ui中心节点
    // const round = document.createElement('div')
    // round.className = 'y-loading-round'
    const Round = Vue.extend({
      render(h) {
        return h(loadingCom)
      }
    })
    const newRound = new Round();
    const vm = newRound.$mount()
    const loadingEl = vm.$el
    templateWrap.appendChild(loadingEl)

    el.loadingElement = templateWrap
    const curStyle = window.getComputedStyle(el)
    const { position } = curStyle

    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }
    if (binding.value) {
      el.appendChild(templateWrap)
    }
  },
  update: (el, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  },
  unbind: (el) => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement)
    }
    el.loadingElement = null
  }
}
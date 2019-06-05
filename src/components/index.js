import Vue from 'vue'
import highLightAble from '@/components/highlightable'
import deleteButton from '@/components/deleteButton' // 删除modal

Vue.component('del-button', deleteButton)
Vue.component('high', highLightAble)
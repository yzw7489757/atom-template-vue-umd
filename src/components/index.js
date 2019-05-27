import Vue from 'vue'
import Input from '@/components/input'
import Button from '@/components/button'
import ButtonGroup from '@/components/buttonGroup'
import VForm from '@/components/form'
import FormItem from '@/components/formItem'
import Message from '@/components/message'
import Dialog from '@/components/dialog'
import highLightAble from '@/components/highlightable'

// import deleteButton from '@/components/deleteButton' // 删除modal

Vue.use(Message)
Vue.component('y-input', Input)
Vue.component('y-button', Button)
Vue.component('y-button-group', ButtonGroup)
Vue.component('y-form', VForm)
Vue.component('y-form-item', FormItem)
Vue.component('y-dialog', Dialog)
Vue.component('high', highLightAble)
// Vue.component('deleteButton', deleteButton)
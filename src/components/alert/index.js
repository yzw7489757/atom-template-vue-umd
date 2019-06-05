/* eslint-disable prefer-destructuring */
import Vue from 'vue'
import Notification from './alert';

let messageInstance;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice(options) {
  let duration = 3;
  let content = ''
  if (typeof options === 'string') {
    content = options
  } else {
    duration = options.duration
    content = options.content
  }
  const instance = getMessageInstance();
  instance.add({
    content,
    duration
  });
}

export default {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.prototype.$alert = notice;
  }
}
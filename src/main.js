import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import '@/styles/index.scss';
import '@/styles/reset.scss';
import service from './utils/request';
import timeFormat from '@/filter/timeFormat';
import store from './store';
import i18n from './lang';
import directive from '@/directive'
import '@/icons';
import '@/permission';

Vue.config.productionTip = false;
Vue.use(timeFormat);
Vue.use(directive)
Vue.prototype.$axios = axios;
Vue.prototype.$http = service;
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});

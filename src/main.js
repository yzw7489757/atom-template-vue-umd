import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import service from './utils/request';
import timeFormat from '@/filter/timeFormat';
import store from './store';
import i18n from './lang';
import directive from '@/directive'
import '@/styles/index.scss';
import '@/styles/reset.scss';
import '@/icons';
import '@/permission';
import '@/components';

Vue.use(timeFormat);
Vue.use(directive)
Vue.prototype.$axios = axios;
Vue.prototype.$http = service;
Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});

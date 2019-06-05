import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui'
import router from './router';
import timeFormat from '@/filter/timeFormat';
import store from './store';
import i18n from './lang';
import directive from '@/directive'
import '@/styles/index.scss';
import '@/styles/reset.scss';
import '@/icons';
import '@/router/controlRoutes';
import '@/components';

Vue.use(ElementUI)
Vue.use(timeFormat);
Vue.use(directive)
Vue.config.productionTip = false;
Vue.config.devtool = !process.env.NODE_ENV === 'production'
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});

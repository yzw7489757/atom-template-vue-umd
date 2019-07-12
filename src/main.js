import Vue from 'vue';
import App from './App';
import router from '@/router';
import store from '@/store';
import directive from '@/directive'
import '@/styles/index.scss';
import '@/styles/reset.scss';
import '@/icons';
import '@/router/handleRoute';
import '@/components';

Vue.use(directive)
Vue.config.productionTip = false;
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

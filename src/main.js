import Vue from 'vue';
import App from './App';
import router from '@/router';
import '@/styles/index.scss';
import '@/router/handleRoute';

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

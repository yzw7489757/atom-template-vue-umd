import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue').then(e => e.default),
  }
];

const router = new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});
export default router;

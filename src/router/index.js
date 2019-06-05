import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout'

Vue.use(Router);
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    name: 'home',
    meta: {
      title: '主页',
    },
    children: [
      {
        path: '1',
        component: () => import('@/views/home'),
        name: '1',
        meta: {
          title: '主页1',
          noCache: true,
          icon: 'home'
        },
      }
    ]
  },
];
export const asyncRouterMap = []
const router = new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});
export default router;

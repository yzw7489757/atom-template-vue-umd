import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import { getToken } from '@/utils/auth'; // 验权

NProgress.configure({ showSpinner: false });


const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) {
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    }
  } else {
    /* has no token */
    if (~whiteList.indexOf(to.path)) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

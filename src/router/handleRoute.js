import NProgress from 'nprogress'; // Progress 进度条
import router from './index'
import 'nprogress/nprogress.css';// Progress 进度条样式
// import { token } from '@/utils/auth'; // 验权

NProgress.configure({ showSpinner: false });

const whiteList = ['/'];
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  setTimeout(() => {
    next()
  }, 300)
});

router.afterEach(() => {
  NProgress.done();
});
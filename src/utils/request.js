import axios from 'axios';
import router from '@/router';
import { token } from '@/utils/auth'
// import store from '@/store'; // 取消请求 -- 6

// 重试次数，不要挂cdn axios，只有npm版本才能保存这个重试状态
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 配置切换路由取消请求,
// const { CancelToken } = axios //取消请求 -- 1
// const source = CancelToken.source() //取消请求 -- 2
// store.dispatch('ChangeRequestToken', source) //取消请求 -- 3

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_JAVA_REQUEST_BASE_URL,
  timeout: 30000,
  // cancelToken: source.token //取消请求 -- 4
});

// request拦截器
service.interceptors.request.use((config) => {
  // config.cancelToken = store.getters.source.token //取消请求 -- 5
  if (token.get('token')) {
    config.headers.token = sessionStorage.getItem('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// response拦截器
service.interceptors
  .response.use((response) => {
    const res = response.data;
    if (res.code === 4029) {
    // token Invalid，please again Login
      window.sessionStorage.removeItem('token');
      router.push({ path: '/login' });
      return Promise.reject(res.message);
    }
    if (res.code !== 200) {
    // request success,but status Incorrect
      return Promise.reject(res.message);
    }
    return response.data;
  },
  (error) => {
    const { config } = error;
    //  If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    //  Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
    // request fail , rehandle...
      return Promise.reject(error);
    }
    config.__retryCount += 1;

    // Create new promise to handle exponential backOff
    const backOff = new Promise(((resolve) => {
    // console.log('Re-request Num:', config.__retryCount)
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    }));

    // Return the promise in which recalls axios to retry the request
    return backOff.then(() => service(config));
  },);

export default service;

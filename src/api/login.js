import request from '@/utils/request';
import { javaApi } from '@/utils/apiConfig';

export const login = data => request({
  // 登录
  ...javaApi,
  url: '/api/users/login',
  method: 'post',
  params: data,
});

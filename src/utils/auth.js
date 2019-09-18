/**
* @description 用户信息工具函数
* @author yuanziwen
* @since 19/05/21
*/


const TokenKey = 'token';
const UserInfoKey = 'userInfo';

export const token = {
  get() {
    return sessionStorage.getItem(TokenKey);
  },
  set(token) {
    return sessionStorage.setItem(TokenKey, token);
  },
  remove() {
    return sessionStorage.removeItem(TokenKey);
  }
};
export const userInfo = {
  get() {
    return JSON.parse(sessionStorage.getItem(UserInfoKey));
  },
  set(userInfo) {
    sessionStorage.setItem('uid', userInfo.uid);
    sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
  },
  remove() {
    return sessionStorage.removeItem(UserInfoKey);
  }
};

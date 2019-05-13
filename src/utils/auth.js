// import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserInfoKey = 'userInfo'
const MenuList = 'menuList'
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(UserInfoKey))
}

export function setUserInfo(userInfo) {
  sessionStorage.setItem('uid', userInfo.uid)
  sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfoKey)
}
export function setMenuList(menuList) {
  sessionStorage.setItem(MenuList, JSON.stringify(menuList))
}
export function getMenuList() {
  return JSON.parse(sessionStorage.getItem(MenuList))
}
export function setDriverLocal(elementClass) {
  localStorage.setItem(elementClass, true)
}
export function getDriverLocal(elementClass) {
  return localStorage.getItem(elementClass)
}

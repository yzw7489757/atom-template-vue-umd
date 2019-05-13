import { login } from '@/api/login'
import {
  getToken, setToken, setMenuList, removeToken, setUserInfo, removeUserInfo,
  getUserInfo
} from '@/utils/auth'


const user = {
  state: {
    token: getToken(),
    uid: 1,
    avatar: '',
    email: '',
    username: '',
    mobile: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userinfo) => {
      state.uid = userinfo.uid
      state.avatar = userinfo.avatar
      state.email = userinfo.email
      state.username = userinfo.username
      state.mobile = userinfo.mobile
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login({
          accountName: username,
          password: userInfo.password
        }).then((response) => {
          if (response.code === 200) {
            const { data } = response
            commit('SET_TOKEN', data.token)
            commit('SET_USERINFO', data)
            setToken(data.token)
            setUserInfo(data)
            resolve(response)
          } else {
            reject(new Error(response.message))
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    LogOut({ commit }, userInfo) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('uid')
      sessionStorage.removeItem('userInfo')
      return Promise.resolve()
    }
  }
}

export default user

import { asyncRouterMap, constantRouterMap } from '@/router'
import addRoutes from '@/utils/getRoutes'

export default {
  state: {
    routes: [...constantRouterMap], // 静态路由
    addRouters: [], // 动态添加的路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 合并路由
      state.addRouters = [...asyncRouterMap, ...routers]
      state.routers = [...asyncRouterMap, ...routers, ...constantRouterMap]
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        addRoutes().then((response) => {
          commit('SET_ROUTERS', response)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
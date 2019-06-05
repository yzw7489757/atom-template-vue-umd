import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import sideBar from './modules/sideBar'
import permissionRoutes from './modules/permissionRoutes'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    sideBar,
    permissionRoutes
  },
  getters
})

export default store

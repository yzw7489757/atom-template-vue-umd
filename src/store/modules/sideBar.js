import Cookies from 'js-cookie'

export default {
  state: {
    opened: !+Cookies.get('sidebar')
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      Cookies.set('sidebar', Number(state.sidebar))
      state.opened = !state.opened
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
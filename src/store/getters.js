const getters = {
  token: state => state.user.token,
  uid: state => state.user.uid,
  userInfo: state => state.user,
  sidebar: state => state.sideBar.opened,
  allRouters: state => state.permissionRoutes.routes,
  asyncRouters: state => state.permissionRoutes.addRouters,

}
export default getters

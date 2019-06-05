import Layout from '@/views/layout/Layout'
import { menu } from '@/utils/auth'

const routesComponents = [
  // {
  //   component: () => import('@/views/auditModule/financeDataExport/index.vue'),
  //   title: '财务数据导出',
  //   name: 'financeDataExport'
  // }
]
// const AsyncComponent = (path) => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import(path.replace('@', '..')),
//   // component: import('@/views/personalCenter/downloadMannagement/index.vue'),
//   // 异步组件加载时使用的组件
//   // loading: LoadingComponent,
//   // 加载失败时使用的组件
//   // error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })
// function getViews(path) {
//   return resolve => {
//     require.ensure([], (require) => {
//       resolve(require(path.replace('@', '..')))
//     })
//   }
// }
// function childComponentHander (path) {
//   return resolve => {
//     require.ensure([], (require) => {
//       resolve(require(path).replace('@', '..'))
//     })
//   }
// }
const getIcon = (path) => {
  path = path.replace('/', '')
  switch (path) {
    case '/home':
      return 'home'
    default:
      return ''
  }
}
function filterComponent(name) {
  const res = routesComponents.filter(item => item.name === name)[0]
  return res ? res.component : res
}
function asyncFilterComponent(routes) {
  const res = []
  routes.forEach((item) => {
    if (item.id) {
      if (!item.meta) item.meta = {}
      item.meta.id = item.id
      item.meta.fid = item.fid
    }
    item.meta.icon = getIcon(item.path)
    item.hidden = !!item.hidden
    item.noCache = true
    item.component = item.component ? filterComponent(item.name) : Layout
    if (item.children) {
      item.children = asyncFilterComponent(item.children)
    }
    res.push(item)
  })
  return res
}

export default () => new Promise((resolve, reject) => {
  resolve(asyncFilterComponent(menu.get()))
})

export const javaApi = {
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
  timeout: 30000
}

let ROOT
if (process.env.NODE_ENV === 'development') {
  // 开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
  ROOT = '/python'
} else {
  // 生产环境下的地址
  ROOT = process.env.VUE_APP_REQUEST_BASE_URL
}

export const pythonBaseURL = ROOT

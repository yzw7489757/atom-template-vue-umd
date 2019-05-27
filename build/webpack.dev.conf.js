const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('./webpack.base.conf');
const env = require('../env.development')
const path = require('path')
const util = require('./util');
const devApi = require('../env.development')
const portFinder = require('portfinder');
const devConfig = merge(config,{
  devtool: 'cheap-module-eval-source-map', // 代码追踪
  devServer: {
    hot: true, // 热更新
    port: 3000,
    open: true,
    quiet: true, // 关闭 webpack-dev-server 的提示，用 friendly-error-plugin
    overlay: true,
    host: 'localhost',
    overlay:{ warnings: false, errors: true },//出现编译error时，全屏覆盖显示
    clientLogLevel: 'warning', // 控制台提示信息级别是 warning 以上
    proxy:{
      // 代理
      '/api': {
        target: devApi.VUE_APP_REQUEST_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
  ]
})


module.exports = new Promise((resolve, reject) => {
  // 自动检测serve端口是否被占用,自增查找
  portFinder.basePort = 3000;
  portFinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devConfig.devServer.port = port
      devConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`running here: http://${devConfig.devServer.host}:${port}`,`or LAN http://${util.getIp}:${port}`],
        },
        onErrors:  undefined
      }))
      resolve(devConfig)
    }
  })
})

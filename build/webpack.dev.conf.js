const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const portFinder = require('portfinder');
const open = require('opn');
const config = require('./webpack.base.conf');
const util = require('./util');

const devConfig = merge(config, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port: 3000,
    host: 'localhost',
    quiet: true, // 关闭 webpack-dev-server 的提示，用 friendly-error-plugin
    overlay: { warnings: false, errors: true }, // 出现编译error时，全屏覆盖显示
    clientLogLevel: 'warning', // 控制台提示信息级别是 warning 以上
    after() {
      open(`http://localhost:${this.port}`);
    },
    proxy: {
      // '/api': {
      //   target: '',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});


module.exports = new Promise((resolve, reject) => {
  // 自动检测serve端口是否被占用,自增查找
  portFinder.basePort = 3000;
  portFinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      devConfig.devServer.port = port;
      devConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['\n\nApp running At: ', ` - Local :http://${devConfig.devServer.host}:${port}`, ` - LAN   :http://${util.getIp()}:${port}\n\nHappy development ^_^`],
        },
        onErrors: undefined
      }));
      resolve(devConfig);
    }
  });
});

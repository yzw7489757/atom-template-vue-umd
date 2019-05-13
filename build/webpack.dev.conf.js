const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('./webpack.base.conf');
const env = require('../env.development')
const path = require('path')
const util = require('./util');
module.exports = merge(config, {
  devtool: 'cheap-module-eval-source-map', // 代码追踪
  devServer: {
    hot: true, // 热更新
    port: 3000,
    open: true,
    quiet: true, // 关闭 webpack-dev-server 的提示，用 friendly-error-plugin
    overlay: true,
    host: 'localhost',
    clientLogLevel: 'warning', // 控制台提示信息级别是 warning 以上
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new util.WebpackShellPlugin({
      onBuildEnd: ['echo "\033[0;31mopen Browser: \'http://localhost:3000\'\033[0m"'] 
    })
  ]
});

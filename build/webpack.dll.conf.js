const webpack = require('webpack');
const { dependencies } = require('../package');
const { resolve } = require('./util');
const library = '[name]_lib'
const vendors = Object.keys(dependencies);
const excludeVendors = ['@babel/polyfill']; // 不打包进 vendor 的依赖
const path = require('path')
const rootPath = path.resolve(__dirname, '../');

excludeVendors.forEach((dep) => {
  const index = vendors.indexOf(dep);
  if (index > -1) {
    vendors.splice(index, 1);
  }
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    vendor: vendors,
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash:8].js',
    library
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve('dist/[name]-manifest.json'),
      name: library
    }),
  ],
};

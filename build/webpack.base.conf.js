const webpack = require('webpack');
const DllLinkPlugin = require('dll-link-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const dllConfig = require('./webpack.dll.conf.js');
const { name } = require('../package.json');
const Env = require('./env');

const {
  IS_PROD, resolve, eslint, optimizeLoaders, htmlInsertWebpack
} = require('./util');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/main.js',
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      ...eslint(),
      {
        test: /.(sc|c)ss$/,
        use: [
          ...optimizeLoaders('cache-sass', 'css'),
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          ...optimizeLoaders('cache-babel', 'js'),
          'babel-loader?cacheDirectory',
        ],
        include: resolve('src'),
      },
      {
        test: /\.vue$/,
        use: [
          ...optimizeLoaders('cache-vue', 'vue'),
          {
            loader: 'vue-loader',
            options: {
              cacheBusting: true,
              transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: 'xlink:href',
              },
            },
          },
        ],
        include: resolve('src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    ...htmlInsertWebpack(),
    new DllLinkPlugin({
      config: dllConfig,
      htmlMode: true,
    }),
    new WebpackBar({
      profile: true,
      name
    }),
    new WebpackBuildNotifierPlugin({
      title: name + IS_PROD ? ' Successful Build' : ' Successful startup is Running',
      logo: resolve('./public/favicon.png'),
      suppressSuccess: 'initial'
    }),
    new webpack.DefinePlugin({
      'process.env': Env
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash:8].css',
      chunkFilename: '[name]_[id].css'
    }),
    new VueLoaderPlugin()
  ],
  stats: {
    children: true, // 避免过多子信息
    builtAt: true, // 添加构建日期和构建时间信息
    cached: true, // 添加缓存（但未构建）模块的信息
    cachedAssets: true, // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
  }
};
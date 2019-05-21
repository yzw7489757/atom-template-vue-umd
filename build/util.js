'use strict';
const os = require('os');
const path = require('path');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssExtractLoader = require('mini-css-extract-plugin').loader;// 引入抽取 css 的 loader
const resolve = dir => path.resolve(__dirname, '../', dir);// 路径处理函数
const IS_PROD = process.env.NODE_ENV === 'production';// 环境判断

// eslint 配置
const getEslintRules = () => {
  let eslint = [];
  if (!IS_PROD) {
    eslint = [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
      include: resolve('src'),
      options: {
        formatter: require('eslint-friendly-formatter'), // eslint 友好提示
        emitWarning: true,
      },
    }];
  }
  return eslint;
};

// css loader 配置
const cssLoaders = () => {
  const loader = (loader,obj={}) => {
    return {
      loader: `${loader}-loader`,
      ...obj
    }
  }
  const generateCssLoaders = (loaderName) => {
    const baseLoader = IS_PROD ? [loader('css'), loader('postcss')] : [loader('css')];
    if (loaderName) baseLoader.push(loader(`${loaderName}`));
    if (IS_PROD) baseLoader.unshift(CssExtractLoader);    // 如果是生产环境就引入提取 css 的 loader
    return [loader('style'), ...baseLoader];
  };
  const loaderObj = {
    css: generateCssLoaders(), // 开发环境生成 ['style-loader', 'css-loader']
    '(scss|sass)': generateCssLoaders('sass'), // 开发环境生成 ['style-loader', 'css-loader', 'sass-loader']
  };
  const loaders = [];
  for (const name in loaderObj) {
    loaders.push({
      test: new RegExp(`\\.${name}$`),
      use: loaderObj[name]
    });
  }
  return loaders;
};
// 缓存配置，优化打包速度
const optimizeLoaders = (dir, name) => [{
    loader: 'cache-loader',
    options: {
      cacheDirectory: resolve(`.cache/${dir}`),
    },
  },
  {
    loader: 'thread-loader',
    options: {
      name,
      workers: os.cpus().length - 1,
      workerParallelJobs: 50,
      workerNodeArgs: ['--max-old-space-size=1024'],
      poolRespawn: !!IS_PROD,
      poolTimeout: 2000,
      poolParallelJobs: 50,
    },
  },
];

module.exports = {
  IS_PROD,
  resolve,
  optimizeLoaders,
  eslint: getEslintRules(),
  cssLoaders: cssLoaders(),
};
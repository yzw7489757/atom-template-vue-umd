'use strict';
const os = require('os');
const path = require('path');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 新建子进程
var exec = require('child_process').exec;
// 引入抽取 css 的 loader
const CssExtractLoader = require('mini-css-extract-plugin').loader;
// 路径处理函数
const resolve = dir => path.resolve(__dirname, '../', dir);
// 环境判断
const IS_PROD = process.env.NODE_ENV === 'production';
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
const loader = (loader) => {
  return {
    loader: `${loader}-loader`
  }
}
// css loader 配置
const cssLoaders = () => {
  const generateCssLoaders = (loaderName) => {
    // 生产环境使用 postcss-loader 进行后处理
    const baseLoader = IS_PROD ? [loader('css'), loader('postcss')] : [loader('css')];
    // 如果有名称则创建一个该名称的 loader 来解析，例如 scss、less、stylus
    if (loaderName) baseLoader.push(loader(`${loaderName}`));
    // 如果是生产环境就引入提取 css 的 loader
    if (IS_PROD) baseLoader.unshift(CssExtractLoader);
    // style-loader 在最前，插入到 html 里
    return [loader('style'), ...baseLoader];
  };
  const loaderObj = {
    css: generateCssLoaders(), // 开发环境生成 ['style-loader', 'css-loader']
    '(scss|sass)': generateCssLoaders('sass'), // 开发环境生成 ['style-loader', 'css-loader', 'stylus-loader']
  };
  const loaders = [];
  // 生成带 test 的完整 rule
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


function puts(error, stdout, stderr) {
  console.log(stdout);
}

function WebpackShellPlugin(options) {
  var defaultOptions = {
    onBuildStart: [],
    onBuildEnd: []
  };
  this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
  const options = this.options;

  compiler.plugin("compilation", compilation => {
    // 提交编译之前的回调 
    if (options.onBuildStart.length) {
      options.onBuildStart.forEach(script => exec(script, puts));
    }
  });

  compiler.plugin("emit", (compilation, callback) => {
    // 编译之后的回调 
    if (options.onBuildEnd.length) {
      options.onBuildEnd.forEach(script => exec(script, puts));
    }
    callback();
  });
};

module.exports = {
  IS_PROD,
  resolve,
  WebpackShellPlugin,
  // cache: cache(),
  optimizeLoaders,
  eslint: getEslintRules(),
  cssLoaders: cssLoaders(),
};
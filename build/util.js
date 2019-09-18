const os = require('os');
const path = require('path');
const threadLoader = require('thread-loader');
const CssExtractLoader = require('mini-css-extract-plugin').loader;
const friend = require('eslint-friendly-formatter');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        formatter: friend, // eslint 友好提示
        emitWarning: true,
      },
    }];
  }
  return eslint;
};


const htmlInsertWebpack = () => {
  const minify = {
    removeComments: true, // 注释
    collapseWhitespace: true, // 缩减文本空白
    removeAttributeQuotes: true, // 属性周围的引号
    removeEmptyAttributes: true // 所有空属性值
  };
  return [
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      favicon: resolve('./public/favicon.png'),
      chunksSortMode: 'none',
      ...(IS_PROD ? minify : {})
    })
  ];
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

function getIPAdress() {
  // 获取本地ip 开启局域网访问
  let useAddress;
  const interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach((key) => {
    const iface = interfaces[key].filter(alias => alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)[0];
    if (iface) {
      useAddress = iface.address;
    }
  });
  return useAddress;
}

module.exports = {
  IS_PROD,
  resolve,
  htmlInsertWebpack,
  getIp: getIPAdress,
  optimizeLoaders,
  eslint: getEslintRules,
};
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  rules: {
    'no-param-reassign':0,
    'no-console':0,
    'no-underscore-dangle':0,
    'no-extraneous-dependencies':0,
    'no-unused-expressions':0,
    'no-lonely-if':0,
    'no-bitwise':0,
    'func-names':0,
    'import/no-extraneous-dependencies':0,
    'import/prefer-default-export':0,
    'semi':0,
    'comma-dangle':0,
    'no-plusplus':0,
    'no-multi-assign':0,
    'no-shadow':0,
    'radix':0,
    'no-unused-vars':0,
    'prefer-rest-params':0,
    'linebreak-style': ["off", "windows"],
    'consistent-return':0,
    'eol-last':0,
    'max-len':0,
    'no-parsing-error':0
  }
};

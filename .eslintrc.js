module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier', 'jsdoc'],
  extends: ['eslint:recommended', 'plugin:jsdoc/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'jsdoc/require-description': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-jsdoc': 0,
  },
};

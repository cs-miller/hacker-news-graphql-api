module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  extends: ['airbnb-base', 'plugin:flowtype/recommended'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': false
  }
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'env'],
  extends: 'airbnb',
  rules: {
    'import/no-extraneous-dependencies': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'no-undef': ['off'],
    'react/react-in-jsx-scope': ['off']
  }
}

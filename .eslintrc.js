module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2020': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    // 只检查vue template 语法正确性
    'plugin:vue/vue3-essential',
    // 检查vue template 语法正确性，并且检验模板的代码风格
    // 'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'template-curly-spacing': 'off',
    'indent': ['error', 2],
    'semi': 'off',
    'quote-props': 'off',
    'no-trailing-spaces': 'off',
    'camelcase': 'off',
    'padded-blocks': 'off',
    'promise/param-names': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-expressions': 'off'
  }
}

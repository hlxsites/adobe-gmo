module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    // allow reassigning param
    'no-param-reassign': [2, { props: false }],
    'linebreak-style': ['error', 'unix'],
    'import/extensions': ['error', {
      js: 'always',
    }],
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'no-return-await': 'off',
    'no-restricted-syntax': 'off',
    'max-len': ['warn', { code: 140 }],
  },
};

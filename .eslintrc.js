module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    jasmine: false,
    jest: false,
    describe: false,
    xdescribe: false,
    before: false,
    beforeEach: false,
    it: false,
    xit: false,
    after: false,
    afterEach: false,
    expect: false,
  },
  rules: {
    'no-console': ['warn'],
    'semi': ['error', 'always'],
    'no-var': ['error'],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'caughtErrors': 'none' }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'prefer-arrow-callback': ['error', { 'allowNamedFunctions': true }],
    'space-before-function-paren': ['error', 'never']
  }
}

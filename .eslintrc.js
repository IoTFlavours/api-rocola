module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
    'import'
  ],
  'env': {
    'node': true,
  },
  "parserOptions": {
    'sourceType': 'script',
  },
  'rules': {
    'strict': ['error', 'safe'],
    'no-await-in-loop': 'off',
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-unused-expressions': ['error', { 'allowTernary': true }]
  },
};

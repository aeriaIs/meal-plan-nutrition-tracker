module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    // disable es-lint inline styles rule
    'react-native/no-inline-styles': 0,
  },
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};

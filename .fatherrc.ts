export default {
  target: 'browser',
  esm: 'babel',
  lessInBabelMode: true,
  cssModules: {
    generateScopedName: '[name][local]_[hash:base64:5]'
  },
};

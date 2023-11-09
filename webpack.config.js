// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line import/extensions
const packageJson = require('./package.json');

// List used to filter out properties from the copyDependencies array
// that are not supported by the CopyWebpackPlugin
// See https://webpack.js.org/plugins/copy-webpack-plugin/#patterns
const COPY_WEBPACK_PLUGIN_PATTERNS_PROPERTIES = [
  'from',
  'to',
  'context',
  'globOptions',
  'filter',
  'toType',
  'force',
  'priority',
  'transform',
  'transformAll',
  'noErrorOnMissing',
  'info',
];

// remove all unsupported properties from the json
const copyDependencyPatterns = packageJson.copyDependencies.map((dependency) => Object.keys(dependency)
  .filter((key) => COPY_WEBPACK_PLUGIN_PATTERNS_PROPERTIES.includes(key))
  .reduce((obj, key) => {
    obj[key] = dependency[key];
    return obj;
  }, {}));

module.exports = {
  entry: {},
  output: {
    path: __dirname,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyDependencyPatterns,
    }),
  ],
};

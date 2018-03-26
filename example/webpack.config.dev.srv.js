const { join } = require('path');
const merge = require('webpack-merge');
const ServerDevPlugin = require('../');

module.exports = {
  entry: {
    server: [
      'babel-polyfill',
      join(__dirname, './server.js')
    ]
  },

  output: {
    path: join(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  watchOptions: {
    poll: true
  },
  plugins: [
    new ServerDevPlugin()
  ],
  target: 'node',
  node: {
    net: 'empty',
    fs: 'empty',
    child_process: 'empty'
  }
};

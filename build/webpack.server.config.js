const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')

module.exports = merge(base, {
  target: 'node',
  entry: path.resolve(__dirname, '../client/entry-server.js'),
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    allowlist: [/\.css$/]
  }),
  module: {
    rules: [{
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: ['vue-style-loader', 'css-loader', 'less-loader']
    }],
  },
  plugins: [
    new VueSSRServerPlugin(),
    new WebpackBar()
  ]
})

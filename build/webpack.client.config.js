const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const base = require('./webpack.base.config')

const isPro = process.env.NODE_ENV === 'production'

let plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'development'
		),
		'process.env.VUE_ENV': '"client"'
	}),
	new VueSSRClientPlugin()
]

if (isPro) {
	plugins.push(
		new WebpackBar(),
		new CompressionPlugin(),
		new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    })
	)
}

module.exports = merge(base, {
	entry: path.resolve(__dirname, '../client/entry-client.js'),
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				isPro ? MiniCssExtractPlugin.loader : 'vue-style-loader',
				'css-loader'
			]
		}, {
			test: /\.less$/,
			use: [
				isPro ? MiniCssExtractPlugin.loader : 'vue-style-loader',
				'css-loader',
				'less-loader'
			]
		}]
	},
	plugins
})

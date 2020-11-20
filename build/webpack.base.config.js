const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isPro = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
	mode: isPro ? 'production' : 'development',
	output: {
		path: resolve('statics'),
		publicPath: '/statics/',
		filename: '[name].[chunkhash:8].js',
		chunkFilename: '[name].[chunkhash:8].js'
	},
	resolve: {
		alias: {
			'@': resolve('client')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader'
		}, {
			test: /\.(woff|eot|ttf)\??.*$/,
			loader: 'url-loader',
			options: {
				limit: 10000
			}
		}]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}

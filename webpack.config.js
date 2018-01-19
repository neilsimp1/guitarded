const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					esModule: true
				}
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					logLevel: 'warn',
					appendTsSuffixTo: [/\.vue$/]
				}
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('css-loader!sass-loader?outputStyle=compressed')
			}

			//,
			// {
			// 	test: /\.(html)$/,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[name].[ext]?[hash]'
			// 	}
			// }
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		},
		extensions: ['.js', '.ts']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	plugins: [
		new CopyWebpackPlugin(['src/index.html'], { ignore: [] }),
		new ExtractTextPlugin('assets/app.css')
	],
	target: 'web',
	devtool: '#eval-source-map'
}

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	// module.exports.plugins = (module.exports.plugins || []).concat([
	// 	new webpack.DefinePlugin({
	// 		'process.env': {
	// 			NODE_ENV: '"production"'
	// 		}
	// 	}),
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		sourceMap: true,
	// 		compress: {
	// 			warnings: false
	// 		}
	// 	})
	// ]);
}

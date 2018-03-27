const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const PROJECT_NAME = 'guitarkit';
const PROJECT_SHORTNAME = PROJECT_NAME;
const PUBLIC_PATH = 'dist/';

module.exports = {
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, PUBLIC_PATH),
		publicPath: PUBLIC_PATH,
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
		extensions: ['.js', '.ts', '.json']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	plugins: [
		new CopyWebpackPlugin([
			'src/index.html',
			{ from: 'src/img', to: 'assets' }
		], { ignore: [] }),
		new ExtractTextPlugin('assets/app.css'),
		new SWPrecacheWebpackPlugin({
			cacheId: PROJECT_NAME,
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'sw.js',
			//minify: true,
			navigateFallback: PUBLIC_PATH,
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
		}),
		new WebpackPwaManifest({
			name: PROJECT_NAME,
			short_name: PROJECT_SHORTNAME,
			description: 'guitar, yo',
			background_color: '#012',
			theme_color: '#878787',
			'theme-color': '#878787',
			start_url: '/',
			// icons: [{
			// 	src: path.resolve('src/images/icon.png'),
			// 	sizes: [96, 128, 192, 256, 384, 512],
			// 	destination: path.join('assets', 'icons')
			// }]
		})
	],
	target: 'web',
	devtool: '#eval-source-map'
}

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			}
		})
	]);
}

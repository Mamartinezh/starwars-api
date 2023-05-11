
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const ruleForJS = {
	test: /\.js$/,
	loader: 'babel-loader',
	options: {
		presets: [
			[
				'@babel/preset-react',
				{runtime: 'automatic'}
			]
		]
	}
}

const ruleForCSS = {
	test: /\.css$/,
	use: ['style-loader', 'css-loader']
}

const rules = [ruleForJS, ruleForCSS]

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build')
	},
	module: {rules},
	plugins: [ new htmlWebpackPlugin({template: './src/index.html'}) ],
	devServer: {
		open: true,
		port: 3000,
		compress: true
	}
}
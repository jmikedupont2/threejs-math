const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
//    debug: true,
    devtool: "source-map",
    entry: {
	'index':'./src/index.tsx'
    },
    devServer: {
	//contentBase: path.join(__dirname, 'build'),
	//compress: true,
	port : 9000,
    },
    plugins: [
//	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
//	new webpack.NoErrorsPlugin()
    ],
    output: {
	path: path.resolve( __dirname, 'dist' ),
	filename: 'main.js',
    },
    resolve: {
	extensions: [ '.ts', '.js' ],
    },
    module: {
	rules: [
	    {
		test: /\.(ts|js)x?$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: [
			    "@babel/preset-env",
			    "@babel/preset-react",
			    "@babel/preset-typescript",
			],
		    },
		},
	    },
	],
    },
    
    resolve: {
	extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, 'build'),
    },
};

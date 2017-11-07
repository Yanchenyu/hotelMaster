var webpack = require("webpack");
var path = require("path");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./index.js",
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }   // 这里的options表示要带的查询参数，表示打开CSS Modules功能    
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[                
                    'url-loader'
                ]
            },
            {
                test:/\.svg$/,
                use:[                
                    'svg-url-loader'
                ]
            }
        ]
    },
     output: {
		path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
	}
}
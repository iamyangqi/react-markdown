const path = require('path');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

delete devConfig.devServer;

module.exports = merge(devConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, './dist'),      // 输出的路径
        publicPath: './',                             // 公共资源路径
        filename: 'app/[name]_[hash:8].js',           // 打包后文件
        library: 'react-markdown-ts',                 // 包的名称、npm publish之后引入的module名
        libraryTarget: 'umd',                         // 包的引用方式
    },
    externals: {
        'react': 'react',                             //因为引入的肯定是react项目，所以不需要再将react打包进npm包
        'react-dom': 'react-dom'
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                removeComments: true,
                removeTagWhitespace: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                title: 'react-markdown'
            },
        }),
    ]
})
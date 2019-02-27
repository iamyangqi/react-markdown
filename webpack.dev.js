const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',                     // 热更新时保存状态
        path.resolve(__dirname, './src/index.jsx'),    // 指定编译入口
    ],
    output: {
        path: path.resolve(__dirname, './dist'),      // 输出的路径
        filename: 'app/[name]_[hash:8].js',           // 打包后文件
        library: 'react-markdown-ts',                 // 包的名称、npm publish之后引入的module名
        libraryTarget: 'umd',                         // 包的引用方式
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        port: 14574,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "babel-loader" },
                    { loader: "ts-loader" }
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { loader: 'url-loader?limit=8192' },
                ],
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use: [
                    // { loader: 'cache-loader' },
                    { loader: 'file-loader' },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    { loader: 'file-loader' },
                ],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),                 // 热更新
        new HtmlWebpackPlugin({                                   // 动态写入index.html
            template: path.resolve(__dirname, './index.html'),
            inject: true,
            title: 'react-markdown'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }
}
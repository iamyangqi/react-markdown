var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.resolve(__dirname, './src/index.jsx'),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app/[name]_[hash:8].js' // 打包后文件
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
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
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
};
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
//# sourceMappingURL=webpack.dev.js.map
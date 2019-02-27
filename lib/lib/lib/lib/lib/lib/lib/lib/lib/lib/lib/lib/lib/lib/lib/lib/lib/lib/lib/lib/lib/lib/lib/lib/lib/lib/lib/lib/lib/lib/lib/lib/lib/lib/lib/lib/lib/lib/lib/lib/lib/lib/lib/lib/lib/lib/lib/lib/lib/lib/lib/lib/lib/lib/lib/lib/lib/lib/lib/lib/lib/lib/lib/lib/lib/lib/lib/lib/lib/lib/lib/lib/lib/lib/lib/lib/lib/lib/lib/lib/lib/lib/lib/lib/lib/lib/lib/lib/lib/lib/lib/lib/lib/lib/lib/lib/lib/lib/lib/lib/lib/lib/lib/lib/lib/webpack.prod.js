var path = require('path');
var merge = require('webpack-merge');
var devConfig = require('./webpack.dev.js');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
delete devConfig.devServer;
module.exports = merge(devConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: 'app/[name]_[hash:8].js' // 打包后文件
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
                title: 'frontend'
            },
        }),
    ]
});
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
//# sourceMappingURL=webpack.prod.js.map
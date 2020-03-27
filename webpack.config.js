const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: './lib/es6_global/src/Root.bs.js'
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.join(__dirname, "bundledOutputs"),
        filename: '[name].js',
        publicPath: 'bundledOutputs/'
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader?name=img/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'bundledOutputs'),
        compress: true,
        port: 9000
    },
    plugins: [new HtmlWebpackPlugin({template: "./webpack/index.html"})]
};

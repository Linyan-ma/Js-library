const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./",
        open: true,
        port: 9000,
        inline: true,
        host: '0.0.0.0',
        compress: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: './css/[name].css'
        }),
    ]
});
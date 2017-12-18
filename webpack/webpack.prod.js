const common = require('./webpack.common.js');
const webpack = require('webpack')
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: './css/[name].css'
        }),
        // new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin()
    ]
});
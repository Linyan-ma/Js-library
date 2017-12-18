const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
var stat = fs.stat;
var datastr = [];
var filePath = path.resolve(__dirname, 'pages');


fs.readdir(filePath, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(function (filename) {
        if (!/\.(html)$/.test(filename)) {
            return false;
        } else {
            var item = filename.split(".")[0];
            datastr.push(item);
        }

    });

});
function MyPlugin(options) {
    this.options = options;
}

MyPlugin.prototype.apply = function (compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function (compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            for (var i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
    });
};
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: ['./entry.js'],
    output: {
        filename: './js/app.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MyPlugin({
            paths: ["./js/lib/zepto.temple.compo.js", "./conf/config.js"]
        }),
        new HtmlWebpackPlugin({
            title: '身份变更',
            template: path.resolve(__dirname, 'index.html'),
            thunks: datastr,
            inject: 'body'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader?sourceMap'
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: path.resolve(__dirname, 'dist/images/')
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true, //css压缩
                            url: false  //Enable/Disable url() handling
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })

                // use style-loader in development
                // fallback: "style-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};
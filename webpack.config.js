const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');

module.exports = {

    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: ['style-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }, 
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            optpng: {
                                quality: 100
                            }
                        }
                    }
                ]
            },
            {
                test: /.(eot|ttf|otf|woff2?|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./bundle.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: path.resolve(__dirname, './dist')
            },
            reload: true
        }),
        new CleanWebpackPlugin('./dist')
    ]
};

if(production) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
};
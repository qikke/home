const  merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(base, {
    mode:  'development',
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[hash].js',
        // publicPath: 'static'
    },
    devServer: {
        host: '0.0.0.0',
        port: '3000',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        historyApiFallback: {
        index: '/index.html'
        },
        proxy: {
            '/api': {
                target: 'http://qikke.cn/',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css' ,
            chunkFilename: '[id].css'
        }),
    ]
})

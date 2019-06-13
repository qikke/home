const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    // publicPath: 'static'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'image/[name]_[hash:7].[ext]'
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, '../client/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : 'css/[id].[hash].css'
    })
  ]
}

if (isDev) {
  config.mode = 'development'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '3000',
    contentBase: path.join(__dirname, '../dist'),
    hot: true
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config

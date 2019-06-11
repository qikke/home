const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV = 'development'

const config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, '../client/index.html')
    })
  ]
}

if(isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: '8099',
    contentBase: path.join(__dirname, '../dist'),
    hot: true
  }
}

module.exports = config

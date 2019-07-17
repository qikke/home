const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const config = {
  optimization: {
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            minChunks:1,
            priority: -10
          },
          utils: {
            name: 'utils',
            test: /utils/,
            reuseExistingChunk: true
          },
          default: {
            test: /[\\/]src[\\/]js[\\/]/,
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
    }
  },
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  devtool: 'cheap-module-source-map',
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
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
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
  // watch: true,
  // watchOptions: {
  //   poll: 1000,
  //   aggregateTimeout: 500,
  //   ignored: /node_modules/
  // },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/index.html')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
}

module.exports = config

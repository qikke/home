const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const paths = require('./paths')
const PreloadWebpackPlugin = require('preload-webpack-plugin');
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
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@c': paths.appSrc + '/components', 
      '@': paths.appSrc
    }
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
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 1,
          name: 'media/[name].[hash:8].[ext]',
        },
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
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',  
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
            }, 
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',  
            options: {
              importLoaders: 1
            }, 
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
      {//antd样式处理
        test:/\.css$/,
        exclude:/src/,
        use:[
            { loader: "style-loader",},
            {
                loader: "css-loader",
                options:{
                    importLoaders:1
                }
            }
        ]
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
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'asyncChunks',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
}

module.exports = config

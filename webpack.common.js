const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['@babel/polyfill', 'whatwg-fetch', './client/src/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        // include: path.resolve(__dirname, 'client/src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'fonts/webfonts'
      //     }
      //   }]
      // }
    ]
  }
};



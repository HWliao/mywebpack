/**
 * webpack config
 * Created by lenovo on 2017/1/7.
 */
'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/main')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]'
  },
  module: {
    loaders: [
      {
        // html --> dom
        test: /\.html$/,
        include: path.resolve(__dirname, './src'),
        loader: 'dom!html'
      },
      {
        // 小于8k图片转化为dataurl
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'url?limit=8192&name=./static/img/[hash].[ext]'
      },
      {
        // css
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      minify: false
    }),
    new webpack.ProvidePlugin({
      // 在所有模块中使用logger
      logger: path.resolve(__dirname, './src/js/utils/consoleUtil'),
//      $: 'jquery',
//      jQuery: 'jquery',
//      'window.jQuery': 'jquery',
//      'window.$': 'jquery',
    }),
    new webpack.NoErrorsPlugin()
  ],
  // 老版本jq,不知道怎么加入webpack模块系统.这里使用全局引用
  // 结合script-loader进行动态加载
  externals: {
    'jquery': 'window.jQuery'
  }
};
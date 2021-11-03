const path = require('path')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "/dist/",
    filename: "vuecountrycodeselector.min.js",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    vue: "vue"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: '/\.css$/',
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
            /*options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              limit: 2048
            }*/
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      //输出不显示警告
      compress: {
        warnings: false //默认值
      },
      //输出去掉注释
      output: {
        comments: false //默认值
      }
    })
  ]
}

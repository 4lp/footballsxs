var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App: './App',
    vendors: ['react'],
  },

  output: {
      path: path.resolve('./bundles/'),
      // path: ('/bundles'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      template: 'template.ejs'
    }),
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')

config.devtool = "#eval-source-map"

var ip = 'localhost'

config.entry = {
  App: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './App',
  ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('http://'+ ip +':3000/'),
  }}),
])

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }
)

module.exports = config
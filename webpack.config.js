var HtmlWebpackplugin=require('html-webpack-plugin');
var ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');
var extractCss = new ExtractTextWebpackPlugin('[name].css');
var webpack = new require('webpack');

module.exports={
  entry:{
    index: './index.js',
    basic: './basic.js'
  },
  output:{
    path: __dirname+'/dist',
    filename: "bundle_[name].js"
  },
  module:{
    loaders:[
      {test: /\.css$/, loader: extractCss.extract('style','css')},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.png$/, loader:'file?name=image/[name].[ext]'}
    ]
  },
  plugins:[
    new HtmlWebpackplugin({title:'Index Page', template:'template.html', filename:'index.html', chunks:['index']})
    ,new HtmlWebpackplugin({title:'Basic Page', template:'template.html', filename:'basic.html', chunks:['basic']})
    ,extractCss
    ,new webpack.HotModuleReplacementPlugin()
    ,new webpack.ProvidePlugin({
      $:'jquery',
      jquery:"jquery"
    })
    // ,new webpack.optimize.CommonsChunkPlugin('common','common.js')
  ]
};

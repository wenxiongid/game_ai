var projConfig = require('./proj.config.js');

var config = {
  entry: './src/js/index.js',
  output: {
    path: __dirname + '/dist/js/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?presets[]=es2015'],
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

if(projConfig.mergeCss){
  config.module.loaders.push({
    test: /\.css$/,
    loader: 'style!css'
  });
}

module.exports = config;
var projConfig = require('./proj.config.js');

var config = {
  entry: './src/js/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: 'ts-loader',
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: ['babel-loader?presets[]=es2015'],
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: __dirname + '/dist/js/',
    filename: 'index.js'
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
const path = require('path')
const commonConfig = require('./webpack.config.common.js')

const sourcePath = path.resolve(__dirname, '../src')

const config = Object.assign(commonConfig, {
  devtool: 'inline-source-map',
  module: {
    rules: commonConfig.module.rules.concat([{
      test: /\.(sass)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, 'postcss.config.js')
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
        }]
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, 'postcss.config.js')
            }
          }
        },
        {
          loader: 'sass-loader'
        }]
    }])
  },
  mode: 'development',
  output: {
    path: sourcePath,
    filename: 'js/[name].bundle.js'
  },

  devServer: {
    host: '0.0.0.0',
    port: 5000
  },
  stats: {
    colors: true
  }
})

module.exports = config

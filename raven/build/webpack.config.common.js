const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const fs = require('fs')

const sourcePath = path.resolve(__dirname, '../src')

const makeSprite = function makeSprite(folderName) {
  const name = folderName.replace('sprite_', '')
  return new SpritesmithPlugin({
    src: {
      cwd: path.resolve(sourcePath, `img/${folderName}`),
      glob: '*.png'
    },
    target: {
      image: path.resolve(sourcePath, `img/${name}_sprite.png`),
      css: [
        [path.resolve(sourcePath, `sass/${name}_sprite.sass`), {
          format: 'sass_template'
        }]
      ]
    },
    apiOptions: {
      cssImageRef: `../img/${name}_sprite.png`,
      generateSpriteName(spriteUrl) {
        const spriteUrlInfo = path.parse(spriteUrl)
        return `${name}_${spriteUrlInfo.name}`
      }
    },
    spritesmithOptions: {
      algorithm: 'top-down'
    },
    customTemplates: {
      sass_template: path.resolve(__dirname, 'template.sass')
    },
    logCreatedFiles: true
  })
}

const spritePluginList = []
const imgPath = path.resolve(sourcePath, 'img')
const files = fs.readdirSync(imgPath)
files.forEach((name) => {
  if (name.indexOf('sprite_') === 0) {
    const spriteDirPath = path.resolve(imgPath, name)
    const stat = fs.statSync(spriteDirPath)
    if (stat.isDirectory()) {
      spritePluginList.push(makeSprite(name))
    }
  }
})

const config = {
  entry: path.resolve(sourcePath, 'js', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules|\.d\.ts$/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(react-spring|@jdcop\/jdcop-ui-react|lottie-web|three|@jmfe\/viewkit-task)\/).*/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
          publicPath: '/'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(sourcePath, 'index.tpl.html'),
      filename: './index.html',
      inject: true,
      hash: false
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ].concat(spritePluginList),
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  devtool: 'source-map'
}

module.exports = config

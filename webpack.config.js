const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootPath = resolve(__dirname, '.')
const srcPath  = resolve(__dirname, './src')
const distPath = resolve(__dirname, './dist')
const staticPath = resolve(__dirname, './static')

const appConfig = {
  entry: {
    app: [
      'tslib',
      resolve(srcPath, 'app', './index.tsx'),
    ],
  },
  output: {
    path: resolve(distPath, 'app'),
    filename: 'js/[name].[hash].js',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash].[ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(distPath, 'app', './index.html'),
      template: resolve(rootPath, './index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: staticPath,
        to: resolve(distPath, 'app'),
      },
    ]),
  ],
  devServer: {
    contentBase: srcPath,
    watchContentBase: true,
  },
}

const functionsConfig = {
  target: 'node',
  entry: {
    share: [
      'tslib',
      resolve(srcPath, 'functions', 'share.ts'),
    ],
  },
  output: {
    path: resolve(distPath, 'functions'),
    filename: '[name].js',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}

module.exports = [appConfig, functionsConfig]

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = resolve(__dirname, '.')
const srcPath  = resolve(__dirname, './src')
const distPath = resolve(__dirname, './dist')

module.exports = {
  entry: {
    app: [
      'tslib',
      resolve(srcPath, './index.tsx'),
    ],
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
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
      filename: resolve(distPath, './index.html'),
      template: resolve(rootPath, './index.html'),
      inject: true,
    }),
  ],
  devServer: {
    contentBase: srcPath,
    watchContentBase: true,
  },
}
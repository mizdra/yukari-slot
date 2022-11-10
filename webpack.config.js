const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = resolve(__dirname, '.');
const srcPath = resolve(__dirname, './src');
const distPath = resolve(__dirname, './dist');
const staticPath = resolve(__dirname, './static');

const appConfig = {
  entry: {
    app: ['tslib', resolve(srcPath, 'app', './index.tsx')],
  },
  output: {
    path: resolve(distPath, 'app'),
    filename: 'js/[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: resolve(rootPath, 'tsconfig.json'),
        },
      },
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
    new CopyWebpackPlugin({
      patterns: [{ from: staticPath, to: resolve(distPath, 'app') }],
    }),
  ],
  devServer: {
    contentBase: srcPath,
    watchContentBase: true,
  },
};

module.exports = [appConfig];

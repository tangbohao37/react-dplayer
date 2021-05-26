const path = require('path');
const rootPath = process.cwd();
const srcPath = path.resolve(rootPath, 'example');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: [path.resolve(srcPath, './example.tsx')],
  },
  target: ['web'],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './example/assets'),
      types: path.resolve(__dirname, './types'),
    },
  },
  devServer: {
    open: true,
    https: false,
    disableHostCheck: true,
    contentBase: srcPath,
    historyApiFallback: true,
    hot: true,
    port: 8080,
    publicPath: '',
    noInfo: true,
    quiet: false,
    compress: false,
    stats: { colors: true },
  },
  output: {
    path: path.resolve(srcPath, '__BUILD__'),
    filename: '[name].js',
    publicPath: '',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devtool: 'cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcPath, 'index.html'),
    }),
  ],
  stats: { errorDetails: true },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(rootPath, 'babelrc/default/.babelrc'),
            },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};

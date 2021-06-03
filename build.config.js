const path = require('path');
const rootPath = process.cwd();
const srcPath = path.resolve(rootPath, 'example');
const webpack = require('webpack');
const libraryName = 'ReactDPlayer';

module.exports = {
  mode: 'development',
  entry: {
    bundle: [path.resolve(__dirname, 'web/dplayer.umd.js')],
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
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

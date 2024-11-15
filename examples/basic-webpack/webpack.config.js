// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(__dirname)

/** @type {webpack.Configuration} */
module.exports = {
  mode: 'development',
  // Update entry point to TypeScript
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // Update test regex to include tsx and ts files
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../../lib/src")  // Add this line
        ],
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx', // Handles both tsx and jsx
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    symlinks: true,
    alias: {
      'ng-react-toolkit': path.resolve(__dirname, '../../lib/src')
    }
  },
  devServer: {
    static: "./",

    // static: {
    //   directory: path.join(__dirname, 'dist'),
    // },
    port: 3000,
    hot: true
  }
};
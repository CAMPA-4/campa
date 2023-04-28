const path = require('path');
const build = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV;
// console.log(isProduction);

module.exports = {
  entry: './src/index.js', // where our entry point to the program is
  output: {
    path: path.resolve(__dirname, 'build'), // setting up directory name
    filename: 'bundle.js', // this is where our bundle will be, inside the build folder
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      // where we set up transpiling
      {
        test: /\.jsx?/,
        exclude: /node_modules/, // skip them because we assume they aren't written in jsx
        use: {
          loader: 'babel-loader', // the loader that transpiles jsx
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // transpiling es6 into es5 and react into readbable js
            // presets fire in reverse order
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
           // best for production . alternative to style-loader
          // 'style-loader', // best for dev, directly inject css into DOM via <style> tag
          'css-loader', // resolve all css into a single string
          'sass-loader', // transpile sass/scss into cs
          'postcss-loader',
          
        ],

      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // used to create a index file that is connected to our dynamically generated javascript
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
  ],
};

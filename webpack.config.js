// Webpack config file uses commonjs thats why we use module.exports and require()
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Allows us to use absolute filepath. __dirname refers to the current directory. From the current direcotry we point to the dist folder for our output
    filename: 'bundle.js', // By default the file name is main.js. This is the file that will be outputted in dis folder
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // This is where we want to serve from
    },
    port: 3000, // Opens the webpack server on port 3000
    open: true, // Ensures it opens in the broser immediately when the port is opened.
    hot: true, // Enables hot reloading
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // RegEx to find any file ending with .css
        use: [MiniCssExtractPlugin.loader, 'css-loader'], //We will apply style-loader and css loader to the test(any file ending with .css)
      },
      {
        test: /\.js$/, // Selecting files that end with .js
        exclude: /node_modules/, // We are excluding our node_modules
        // Use can be an object or an array
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Boilerplate', // The title of the html template
      filename: 'index.html', // This is the file name of the html that will be created in dist foldr
      template: './src/index.html', // This is the html file we are actively coding in in our src folder.
    }),
    new MiniCssExtractPlugin(),
  ],
};

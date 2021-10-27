const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    publicPath: '/',
  },
  target: 'node',
  devServer: {
    port: '9500',
    contentBase: ['./public'],
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        test: /\.(css|css)$/,
        exclude: /node_modules/,
        use: {
          loader: 'style-loader',
        },
      },
      {
        test: /\.(css|css)$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
};

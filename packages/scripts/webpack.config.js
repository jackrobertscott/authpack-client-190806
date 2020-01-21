const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = {
  development: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production',
}

const config = {
  mode: 'production',
  stats: {
    warnings: false,
    modules: false,
  },
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
    sdk: path.resolve(__dirname, 'src/sdk.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  devServer: {
    port: 5000,
    clientLogLevel: 'error',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: env.development,
            presets: ['@babel/typescript'],
          },
        },
      },
    ],
  },
  optimization: {
    /**
     * Minimize adds extra 10s on compile time.
     */
    minimize: env.production,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
      title: 'Index',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'home.html',
      template: 'src/home.html',
      title: 'Home',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'sdk.html',
      template: 'src/sdk.html',
      title: 'SDK',
    }),
  ],
}

module.exports = config

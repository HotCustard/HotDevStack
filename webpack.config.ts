import path = require('path');
import webpack = require('webpack');
import Dotenv = require('dotenv-webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');


console.log(`Processing with AUTH0_CLIENT_ID : ${process.env.AUTH0_CLIENT_ID}`);

const config: webpack.Configuration = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    path.join(__dirname, 'src', 'index.tsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  stats: {
    warnings: true,
  },
  plugins: [
    new Dotenv(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module: any) => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'auth0',
      minChunks: (module: any) => module.resource && (/auth0/).test(module.resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new HtmlWebpackPlugin({
      title: 'Hot Development Stack',
      template: path.join(__dirname, 'src', 'index.html'),
     // favicon:  path.join(__dirname, 'src', 'favicon.ico'),
      meta: [
        {
          name: 'description',
          content: 'Hotcustard web development boilerplate',
        },
      ],
      minify: {
        collapseWhitespace: true,
      },
    }),
    // new InlineChunkManifestHtmlWebpackPlugin({
    //   dropAsset: true,
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
    alias: { '@src': path.join(__dirname, 'src') },
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
          },
        }],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        include: path.join(__dirname, 'src'),
        enforce: 'pre',
      },
      {
        test: /\.css?$/,
        use: [{loader: 'style-loader'},      // creates style nodes from JS strings
             {loader: 'css-loader'}],         // translates CSS into CommonJS
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'},      // creates style nodes from JS strings
             {loader: 'css-loader'},         // translates CSS into CommonJS
             {loader: 'sass-loader'}],       // compiles Sass to CSS
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};

export default config;

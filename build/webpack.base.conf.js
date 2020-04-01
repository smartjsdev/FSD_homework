const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader',
          options: {
            // Base dir for absolute imports
            root: path.join(__dirname, '../src')
          }
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
     {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        publicPath: '../fonts/'
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true,
             root: path.join(__dirname, '../src') }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
//  ...PAGES.map(page => new HtmlWebpackPlugin({
//       template: `${PAGES_DIR}/${page}`,
//       filename: `./${page.replace(/\.pug/,'.html')}`
//     }))
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/cards/cards.pug`,
      filename: './cards.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/colors&type/colors&type.pug`,
      filename: './colors&type.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/formelements/formelements.pug`,
      filename: './formelements.html',
      inject: true
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/headers&footers/headers&footers.pug`,
    //   filename: './headers&footers/headers&footers.pug',
    //   inject: true
    // }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/index/index.pug`,
      filename: `./index.html`,
      inject: true
    })
  ],
  // devServer: {
  //   inline: true,
  //   hot: true,
  //   contentBase: 'dist',
  //   host: 'localhost',
  // },
}
"use strict";

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const renameOutputPlugin = require('rename-output-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const NgrockWebpackPlugin = require('ngrock-webpack-plugin')

const statConf = {
  assets: false,
  chunks: false,
  hash: true,
  version: false,
  errors: true,
  errorDetails: true,
  warnings: true
}

const alias = {
  'components': path.join(__dirname, 'app/components/index.js'),
  'services': path.join(__dirname, 'app/services/index.js')
}

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = env => {
  if (env === 'production-p') {
      return getProdSettings(env)
  }
  return getDevSettings(env)
}

function getProdSettings(module) {

  // the path(s) that should be cleaned
  let pathsToClean = [__dirname + '/dist/']

  // the clean options to use
  let cleanOptions = {
      verbose: true,
      dry: false
  }

  return {
      entry: {
          main: './app/main.js'
      },
      output: {
          path: __dirname + '/dist/',
          filename: './[name].js',
          library: '[name]'
      },
      devtool: 'source-map',
      module: {
          rules: [
              {
                  test: /\.(js|jsx?)$/,
                  exclude: [/node_modules/],
                  use: [
                      {
                          loader: 'babel-loader',
                          options: {
                              presets: [
                                  [
                                      'es2015', {
                                          'modules': false
                                      }
                                  ],
                                  'stage-0',
                                  'react'
                              ],
                              plugins: ['transform-runtime']
                          }
                      }
                  ]
              },                 {
                test: /\.less$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'
                ]
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /\.module\.css$/
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ],
                include: /\.module\.css$/
              }
          ]
      },
      devServer: {
          contentBase: [
              './', './app/'
          ],
          // stats: statConf,
          port: '3000',
          hot: true,
          historyApiFallback: true
      },
      plugins: [
          new CleanWebpackPlugin(pathsToClean, cleanOptions),
          new renameOutputPlugin({
              'main': 'bundle.min.js'
          }),
          new HtmlWebpackPlugin({template: "./app/index.html"}),
          new DynamicCdnWebpackPlugin({env: 'production'}),
          new CopyWebpackPlugin([
            {
              context: './media/',
              from: '**/*',
              to: './media/'
            }, {
              from: './app/config.js'
            }
          ])
          // ,
          // new BundleAnalyzerPlugin()
      ],
      resolve: {
          alias: alias
      }
  }
}

function getDevSettings(module) {
  return ({
      entry: {
          main: './app/main.js'
      },
      output: {
          path: __dirname,
          filename: './[name].js',
          library: '[name]'
      },
      devtool: 'inline-source-map',
      module: {
          rules: [
              {
                  test: /\.(js|jsx?)$/,
                  exclude: [/node_modules/],
                  use: [
                      {
                          loader: 'babel-loader',
                          options: {
                              presets: [
                                  [
                                      'es2015', {
                                          'modules': false
                                      }
                                  ],
                                  'stage-0',
                                  'react'
                              ],
                              plugins: ['transform-runtime']
                          }
                      }
                  ]
              }, 
              {
                test: /\.less$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'
                ]
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /\.module\.css$/
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ],
                include: /\.module\.css$/
              }
          ]
      },
      devServer: {
          contentBase: [
              './', './app/'
          ],
          stats: statConf,
          port: '3000',
          hot: true,
          historyApiFallback: true
      },
      plugins: [
          new HtmlWebpackPlugin({template: "./app/index.html"}),
        //   new NgrockWebpackPlugin()
      ],
      resolve: {
          alias: alias
      }
  })
}

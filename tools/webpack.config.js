var path = require('path');

// var ExtractTextPlugin = require('extract-text-webpack-plugin');
import pkg from '../package.json';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../build');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const minimizeCssOptions = {
    discardComments: {
        removeAll: true
    },
};

module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: isDebug ? 'development' : 'production',
    output: {
        // path: BUILD_DIR,
        publicPath: '',
        filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: isDebug ?
            '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../tools'),
                ],
                loader: 'babel-loader',
                options: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: isDebug,

                    // https://babeljs.io/docs/usage/options/
                    babelrc: true,
                    presets: [
                        // 一个可以自动决定Babel插件和预设
                        // https://github.com/babel/babel-preset-env
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: pkg.browserslist,
                                    forceAllTransforms: !isDebug, // for UglifyJS
                                },
                                //modules: false, // "amd" | "umd" | "systemjs" | "commonjs" | false, defaults to "commonjs".
                                useBuiltIns: false, // "usage" | "entry" | false, defaults to false.
                                debug: false, // boolean, defaults to false.
                            },
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                rules: [{
                        include: SRC_DIR,
                        loader: MiniCssExtractPlugin.loader
                    },

                    // Process internal/project styles (from src folder)
                    {
                        include: SRC_DIR,
                        loader: 'css-loader',
                        options: {
                            // CSS Loader https://github.com/webpack/css-loader
                            importLoaders: 1,
                            sourceMap: isDebug,
                            // CSS Modules https://github.com/css-modules/css-modules
                            modules: true,
                            localIdentName: isDebug ?
                                '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                            // CSS Nano http://cssnano.co/
                            minimize: isDebug ? false : minimizeCssOptions,
                        },
                    },

                    // Apply PostCSS plugins including autoprefixer
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './tools/postcss.config.js',
                            },
                        },
                    },
                ]
            },
            // Compile Sass to CSS
            // https://github.com/webpack-contrib/sass-loader
            // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
            {
                test: /\.(scss|sass)$/,
                include: SRC_DIR,
                rules: [
                    {
                        
                        loader: MiniCssExtractPlugin.loader
                    },

                    // Process internal/project styles (from src folder)
                    {
                        include: SRC_DIR,
                        loader: 'css-loader',
                        options: {
                            // CSS Loader https://github.com/webpack/css-loader
                            importLoaders: 1,
                            sourceMap: isDebug,
                            // CSS Modules https://github.com/css-modules/css-modules
                            modules: false,
                            // localIdentName: isDebug ?
                            //     '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                            // CSS Nano http://cssnano.co/
                            minimize: isDebug ? false : minimizeCssOptions,
                        },
                    },

                    // Apply PostCSS plugins including autoprefixer
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './tools/postcss.config.js',
                            },
                        },
                    },
                    {
                        include: SRC_DIR,
                        loader: 'sass-loader',
                    }
                ]
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',
            //   },
            
            {
                test :/\.jade$/,
                loader:'jade-loader'
            },
            {
                test :/\.pug$/,
                loader:'pug-loader'
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: isVerbose,
                        unused: true,
                        dead_code: true,
                        drop_console: !isDebug,
                    },
                    mangle: {},
                    output: {
                        comments: isDebug,
                    },
                    sourceMap: isDebug,
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },
    plugins: [        
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isDebug ? '[name].css' : '[name].[hash].css',
        })

    ],
    stats: {
        cached: isVerbose,
        cachedAssets: isVerbose,
        chunks: isVerbose,
        chunkModules: isVerbose,
        colors: true,
        hash: isVerbose,
        modules: isVerbose,
        reasons: isDebug,
        timings: true,
        version: isVerbose,
    },
};
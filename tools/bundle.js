/**
 * 
 */

import webpack from 'webpack';
import config from './webpack.config';
var path = require('path');
var rimraf = require('rimraf');
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../build');
const isDebug = !process.argv.includes('--release');
const MinifyPlugin = require("babel-minify-webpack-plugin");
/**
 * 从源文件中创建应用程序包。
 */
function bundle(htmls) {
    return new Promise((resolve, reject) => {
        config.plugins.unshift(new webpack.LoaderOptionsPlugin({
            options: {
                context: process.cwd() // or the same value as `context`
            }
        }));
        var buildPath = path.join(__dirname, '../build/dist');
        rimraf.sync(path.join(buildPath));
        config.output.path = buildPath;
        //现在先写死，刚来从配置信息里取
        var entry = path.join(__dirname, '../src/pug-loader')
        config.entry = entry;
        // if (!isDebug) {
        //     config.plugins.push(new MinifyPlugin({}, {
        //         sourceMap: isDebug
        //     }));
        // }
        webpack(config).run((err, stats) => {
            if (err) {
                return reject(err);
            }
            console.info(stats.toString(config.stats));
            if (stats.hasErrors()) {
                return reject(new Error('Webpack compilation errors'));
            }
            return resolve();
        });
    });
}

export default bundle;
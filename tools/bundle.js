/**
 * 
 */

import webpack from 'webpack';
import config from './webpack.config';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var rimraf = require('rimraf');
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../build');
const isDebug = !process.argv.includes('--release');
console.log(`---------------isDebug：${isDebug}-----------`);
// const MinifyPlugin = require("babel-minify-webpack-plugin");
/**
 * 从源文件中创建应用程序包。
 */
async function bundle(pages) {
    let tasks=[];
    pages.forEach((item)=>{
        let {dist,entry,template,head,data}=item;
        let result =buildWebpack({...config},dist,entry,template,head,data);   
        tasks.push(result);    
    })    
}

async function buildWebpack(config,dist,entry,template,head,data){
    return new Promise((resolve, reject) => {
        config.plugins.unshift(new webpack.LoaderOptionsPlugin({
            options: {
                context: process.cwd() // or the same value as `context`
            }
        }));
        var buildPath = path.join(__dirname, `../build/${dist}`);
        rimraf.sync(path.join(buildPath));
        config.output.path = buildPath;
        //现在先写死，刚来从配置信息里取
        var centry = path.join(__dirname, `../src/${entry}`)
        config.entry = centry;  
        config.plugins=config.plugins||[];
        config.plugins.push(new HtmlWebpackPlugin({
            template:path.resolve(__dirname, `../src/${template}`),
            title:head.title||'',
            filename:head.filename,
            meta:head.meta,
            minify:!isDebug,
            templateParameters:data
        }));    
        webpack(config).run((err, stats) => {
            if (err) {
                return reject({code:400,message:err});
            }
            console.info(stats.toString(config.stats));
            if (stats.hasErrors()) {
                return reject({code:500,message:new Error('Webpack compilation errors')});
            }
            return resolve({code:200,message:'ok'});
        });
    });
}
export default bundle;
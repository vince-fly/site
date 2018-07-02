/**
 * 编译所有文件.
 */


import clean from './clean';
import copy from './copy';
import run from './run';
import bundle from './bundle';

import pages from '../src/page/index/index.json';
run(clean);
run(copy);
run(bundle,pages);

// async function getname() {
//     return new Promise((resolve,reject)=>{
//         resolve("aaaaaaaaaaaaaaaaaa");
//     })
// }

// async function testConsole(){
//     let name = await getname();
//     console.log(name);
//     console.log('111111111111111111111');
// }

// run(testConsole);

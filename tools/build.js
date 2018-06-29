/**
 * 编译所有文件.
 */


import clean from './clean';
import run from './run';
import bundle from './bundle';
import copy from './copy';
run(clean);
run(copy);
run(bundle);

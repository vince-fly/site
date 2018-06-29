/**
 * 编译所有文件.
 */


import clean from './clean';
import run from './run';
import bundle from './bundle';

run(clean);
run(bundle);

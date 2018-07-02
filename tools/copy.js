/**
 *
 */

import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
// import pkg from '../package.json';
import { format } from './run';

/**
 * 拷贝静态文件，比如 robots.txt,favicon.ico等到输出文件夹。
 */
async function copy(dist="assets") {
  await makeDir('build');
  await Promise.all([  
    copyDir('public', `build/${dist}`),
  ]);

  // if (process.argv.includes('--watch')) {
  //   const watcher = chokidar.watch(['public/**/*'], { ignoreInitial: true });

  //   watcher.on('all', async (event, filePath) => {
  //     const start = new Date();
  //     const src = path.relative('./', filePath);
  //     const dist = path.join(
  //       `build/${dist}/`,
  //       src.startsWith('src') ? path.relative('src', src) : src,
  //     );
  //     switch (event) {
  //       case 'add':
  //       case 'change':
  //         await makeDir(path.dirname(dist));
  //         await copyFile(filePath, dist);
  //         break;
  //       case 'unlink':
  //       case 'unlinkDir':
  //         cleanDir(dist, { nosort: true, dot: true });
  //         break;
  //       default:
  //         return;
  //     }
  //     const end = new Date();
  //     const time = end.getTime() - start.getTime();
  //     console.info(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
  //   });
  // }
}

export default copy;

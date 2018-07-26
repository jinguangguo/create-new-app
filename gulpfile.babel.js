/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午2:18
 */


import log4js from 'log4js';
import BrowserSync from 'browser-sync';
import requireDir from 'require-dir';

global.logger = log4js.getLogger();
global.browserSync = BrowserSync.create();

// https://www.npmjs.com/package/log4js
logger.level = 'debug';

requireDir('./gulp', { recurse: true });
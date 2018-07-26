/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 下午12:40
 */

import gulp from 'gulp';
import sequence from 'gulp-sequence';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

gulp.task('dev', sequence(
    ['clean:dev'],
    ['html:dev', 'js:dev', 'scss:dev', 'img:dev', 'favicon:dev']
));
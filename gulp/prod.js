/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 下午1:00
 */

import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('prod', sequence(
    ['clean:dev', 'clean:prod'],
    'html:prod',
    ['dep:prod', 'js:prod'],
    'scss:prod',
    ['img:prod', 'favicon:prod']
));
/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 下午12:41
 */

import gulp from 'gulp';
import clean from 'gulp-clean';

gulp.task('clean:dev', () => {
    return gulp.src('./dev', {read: false})
        .pipe(clean());
});

gulp.task('clean:prod', () => {
    return gulp.src('./prod', {read: false})
        .pipe(clean());
});
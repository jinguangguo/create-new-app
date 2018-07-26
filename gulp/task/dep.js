/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午6:15
 */

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import md5 from 'gulp-md5-plus';

gulp.task('dep:dev', function () {
    return gulp.src('./lib/dep/**/*')
        .pipe(gulp.dest('./dev/dep'))
});

gulp.task('dep:prod', ['dep:dev'], function () {
    return gulp
        .src('./dev/dep/*.js')
        .pipe(uglify())
        .pipe(md5(6, './prod/**/*.html'))
        .pipe(gulp.dest('./prod/dep'));
});

/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午2:13
 */

import gulp from 'gulp';
import swig from 'gulp-swig';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';

gulp.task('html:dev', () => {
    return gulp.src('./src/*.html')
        .pipe(swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(replace('scss', 'css'))
        .pipe(gulp.dest('./dev'));
});

gulp.task('html:watch', ['html:dev'], () => {

    gulp.watch([
        './src/*.html'
    ], function (event) {
        let path = event.path;
        return todo(path);
    });

    function todo(path) {
        return gulp.src(path)
            .pipe(swig({defaults: { cache: false }}))
            .pipe(replace('scss', 'css'))
            .pipe(gulp.dest('./dev'))
            .pipe(browserSync.stream());
    }
});

gulp.task('html:prod', ['html:dev'], () => {
    return gulp.src('./dev/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./prod'));
});
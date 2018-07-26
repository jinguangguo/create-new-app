/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午3:06
 */

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import md5 from 'gulp-md5-plus';
import pxtorem from 'gulp-pxtorem';

gulp.task('scss:dev', function () {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(pxtorem())        // https://github.com/cuth/postcss-pxtorem
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/css'))
        .pipe(browserSync.stream());
});

gulp.task('scss:watch', function () {

    const files = './src/scss/*.scss';

    gulp.watch([
        './src/component/**/*.scss',
        './src/include/**/*.scss',
        './src/scss/base/*.scss',
        './src/module/**/*.scss'
    ], (event) => {
        let path = event.path;
        if (path.indexOf('include') >= 0 || path.indexOf('base') >= 0 || path.indexOf('module') >= 0) {
            return todo();
        } else {
            return todo(path);
        }
    });

    gulp.watch(files, (event) => {
        return todo(event.path);
    });

    return todo();

    function todo(path = files) {
        logger.info('============ ' + path);
        return gulp.src(path)
            .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer())
                .pipe(pxtorem())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dev/css'))
            .pipe(browserSync.stream());
    }

});

gulp.task('scss:prod', ['scss:dev'], function () {
    return gulp.src('./dev/css/**/*.css')
        .pipe(webpcss({
            webpClass:'.webp',
            replace_from:/\.(png|jpg|jpeg)/,
            replace_to:'.webp',
        }))
        .pipe(cleanCSS())
        .pipe(md5(6, './prod/**/*.html'))
        .pipe(gulp.dest('./prod/css'));
});
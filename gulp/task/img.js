/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 下午12:16
 */

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import md5 from 'gulp-md5-plus';
import webp from 'gulp-webp';

import util from '../util';

gulp.task('img:dev', function () {
    return gulp.src([
        './src/img/*.{png,gif,jpg,jpeg}',
        './src/module/**/*.{png,gif,jpg,jpeg}',
        './src/include/**/*.{png,gif,jpg,jpeg}'
    ])
        .pipe(util.removeDirname())
        .pipe(gulp.dest('./dev/img'))
});

gulp.task('img:watch', function () {

    const files = [
        './src/img/*.{png,gif,jpg,jpeg,ico}',
        './src/include/**/*.{png,gif,jpg,jpeg,ico}',
        './src/module/**/*.{png,gif,jpg,jpeg,ico}'
    ];

    function todo(path = files) {
        return gulp.src(path)
            .pipe(util.removeDirname())
            .pipe(gulp.dest('./dev/img'))
            .pipe(browserSync.stream());
    }

    gulp.watch(files, function (event) {
        return todo(event.path);
    });

    return todo();

});

gulp.task('img:prod-min', ['img:dev'], function () {
    return gulp.src([
        './dev/img/*'
    ])
        .pipe(imagemin())
        .pipe(md5(6, ['./prod/**/*.html', './prod/css/*.css', './prod/js/*.js']))
        .pipe(gulp.dest('./prod/img'));
});

// 图片生成之后, 立即生成对应的webp格式的图片
gulp.task('img:prod-webp', ['img:prod-min'], function () {
    return gulp.src('./dev/img/*.{png,jpg,jpeg,ico}')
        .pipe(webp())
        .pipe(md5(6, ['./prod/**/*.html', './prod/css/*.css', './prod/js/*.js']))
        .pipe(gulp.dest('./prod/img'));
});

gulp.task('img:prod', ['img:prod-webp']);
/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 下午12:16
 */


import gulp from 'gulp';

gulp.task('favicon:dev', function () {
    return gulp.src('./src/img/favicon.ico')
        .pipe(gulp.dest('./dev'));
});

gulp.task('favicon:server', ['favicon:dev'], function () {
    const files = './src/img/favicon.ico';

    gulp.watch(files, function (event) {
        return gulp.src(files)
            .pipe(gulp.dest('./dev'))
            .pipe(browserSync.stream());
    });
});

gulp.task('favicon:prod', ['favicon:dev'], function () {
    return gulp.src([
            './dev/favicon.ico'
        ])
        .pipe(gulp.dest('./prod'));
});
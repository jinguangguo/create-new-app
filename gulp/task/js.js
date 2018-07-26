/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午4:06
 */

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import md5 from 'gulp-md5-plus';
import webpackStream from 'webpack-stream';
import webpackConfig from '../../webpack.config.babel';
import util from "../util";

gulp.task('js:dev', function () {

    // 基础配置
    webpackConfig.devtool = 'source-map';
    webpackConfig.mode = process.env.NODE_ENV;
    webpackConfig.module.rules = webpackConfig.module.rules.concat(util.getCssLoaders());

    return gulp
        .src('./src/js/*.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dev'));
});

gulp.task('js:prod', ['js:dev'], function () {
    return gulp
        .src('./dev/js/*.js')
        .pipe(uglify())
        .pipe(md5(6, './prod/**/*.html'))
        .pipe(gulp.dest('./prod'));
});
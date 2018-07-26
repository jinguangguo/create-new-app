/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午6:23
 */

import gulp from 'gulp';
import sequence from 'gulp-sequence';
import autoresponse from 'autoresponse';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import util from './util';

import webpackConfig from '../webpack.config.babel';

gulp.task('watch', ['html:watch', 'scss:watch', 'dep:dev']);

function getWebpackCompiler() {

    // 安装客户单HRM
    const webpackClient = 'webpack-hot-middleware/client?reload=true';
    for (let key in webpackConfig.entry) {
        webpackConfig.entry[key].unshift(webpackClient);
    }
    if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // 基础配置
    webpackConfig.devtool = 'source-map';
    webpackConfig.mode = process.env.NODE_ENV;
    webpackConfig.module.rules = webpackConfig.module.rules.concat(util.getCssLoaders());

    // console.log(JSON.stringify(webpackConfig));

    return webpack(webpackConfig);
}

gulp.task('server', ['watch'], () => {

    // 由注入的变量进行定义
    // npm run server
    // 等同于
    // cross-env NODE_ENV=development gulp server
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    let compiler = getWebpackCompiler();

    browserSync.init({
        server: {
            baseDir: "./dev"
        },
        port: 8000,
        open: false,
        // startPath: "/index.html",
        middleware: [
            webpackDevMiddleware(compiler, {
                hot: true,
                // display no info to console (only warnings and errors)
                noInfo: true,
                // display nothing to the console
                quiet: true,
                historyApiFallback: true,
                stats: {
                    colors: true
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: webpackConfig.output.publicPath
            }),
            webpackHotMiddleware(compiler),
            getAutoResponse()
        ],
        ui: {
            port: 8001,
            weinre: {
                port: 8002
            }
        }
    });

    function getAutoResponse() {
        return autoresponse({
            responseDir: './mock',
            logLevel: 'info',
            post: true,
            get: {
                match(reqPathName) { // mock all `/xx/xx` path
                    return !/\.\w+(\?.*)?$/.test(reqPathName);
                }
            }
        });
    }

    console.log('BS服务启动成功...');
});
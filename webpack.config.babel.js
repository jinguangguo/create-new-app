/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午4:07
 */

import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

const PUBLIC_PATH = '/';

export default {
    entry: {
        index: ['./src/js/index.js'],
        pageA: ['./src/js/pageA.js']
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        publicPath: PUBLIC_PATH,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(tpl|html)$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                // exclude: /node_modules/,
                // query: {
                //     presets: ['es2015']
                // }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'font/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vue-resource': 'VueResource',
        'vue-i18n': 'VueI18n',
        'moment': 'moment',
        'lodash': '_',
        'bignumber.js': 'BigNumber',
        'particlesJS': 'particlesJS'
    }
}
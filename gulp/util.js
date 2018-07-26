/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午8:29
 */

import rucksackCss from 'rucksack-css';
import rename from 'gulp-rename';

export default {

    getCssLoaders() {
        const sourceMapEnabled = process.env.NODE_ENV === 'development';

        return [
            {
                test: /\.(css|scss)$/i,
                use: [
                    'vue-style-loader',
                    {
                        'loader': 'css-loader',
                        'options': {
                            'sourceMap': sourceMapEnabled
                        }
                    },
                    {
                        'loader': 'postcss-loader',
                        // FIXME 这里的POSTCSS是否起作用仍需测试
                        'options': {
                            'sourceMap': sourceMapEnabled,
                            plugins: () => [
                                rucksackCss({
                                    autoprefixer: true
                                })
                            ]
                        }
                    },
                    {
                        'loader': 'sass-loader',
                        'options': {
                            'sourceMap': sourceMapEnabled
                        }
                    }
                ]
            },

        ]
    },

    /**
     * 去掉文件夹路径
     * @use
     *  .pipe(removeDirname())
     * @returns {*}
     */
    removeDirname() {
        return rename(function(path) {
            path.dirname = '';
        });
    }

}
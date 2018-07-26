/**
 * @file
 * @author jinguangguo
 * @date 2018/7/25 下午1:55
 */


import CompIndex from '../component/Index.vue';
import ModuleIndex from '../module/index/main.js';

import Vue from 'vue';

const app = new Vue({
    components: {
        CompIndex: CompIndex,
        Index: ModuleIndex
    },
    methods: {

    }
}).$mount('#app');

// new Vue({
//     el: '#app',
//     router,
//     i18n,
//     store,
//     components: {App},
//     template: '<App/>'
// })

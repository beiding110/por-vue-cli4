import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/index.js';

import guards from './utils/guards';
import { initRouter } from './utils/tools';

import login from './modules/login.js';
import iframe from './modules/iframe.js';
import demoVcm from './modules/demo-vcm.js';

Vue.use(Router);

const indexs = initRouter();

var router = new Router({
    routes: [
        demoVcm,

        {
            path: `/`,
            component: () => import(/*webpackChunkName: 'pc'*/ '@layout/empty'),
            meta: {
                title:store.state.config.title,
            },
            children: [
                login,
                // iframe,
        
                // 子系统自动生成的路由
                ...indexs,
            ],
        },
    ]
});

guards(router);

export default router
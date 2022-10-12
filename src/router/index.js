import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/index.js';

import guards from './utils/guards';
import { indexs } from './utils/tools';

import login from './modules/login.js';
import iframe from './modules/iframe.js';
import demoVcm from './modules/demo-vcm.js';

Vue.use(Router);

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
                // iframe,
        
                // 子系统自动生成的路由
                ...indexs,
                
                login,
            ],
        },
    ]
});

guards(router);

export default router
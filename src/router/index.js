import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

import CONFIG from '../config'

import { initRouter } from '@router/tools'

Vue.use(Router);

const indexs = initRouter();

var router = new Router({
    routes: [
        {
            path: '/demo/vcm',
            component: () => import(/*webpackChunkName: 'demo-vcm'*/ '@components/example')
        },
        {
            path: `/${CONFIG.router['base-name']}`,
            component: () => import(/*webpackChunkName: 'pc'*/ '@layout/empty'),
            meta: {
                title: CONFIG.router['title']
            },
            children: indexs
        }
    ]
});

guards(router);

export default router
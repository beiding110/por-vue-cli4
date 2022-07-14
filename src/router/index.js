import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

import store from '../store/index.js'

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
            path: `/`,
            component: () => import(/*webpackChunkName: 'pc'*/ '@layout/empty'),
            meta: {
                title:store.state.config.title,
            },
            children: indexs
        }

        // {
        //     path: '/login',
        //     component: () => import(/*webpackChunkName: 'pc-login'*/ '@views/login/index'),
        //     meta: {
        //         title: `${CONFIG.router['title']}·登录`
        //     }
        // },
        // {
        //     path: `/${CONFIG.router['base-name']}`,
        //     component: () => import(/*webpackChunkName: 'pc'*/ '@views/layout/index'),
        //     meta: {
        //         title: CONFIG.router['title']
        //     },
        //     children: [
        //         {
        //             path: 'iframe',
        //             component: () => import(/*webpackChunkName: 'iframe'*/ '@views/iframe'),
        //             meta: {
        //                 title: '',
        //                 bread: []
        //             }
        //         },

        //         ...indexs
        //     ]
        // }
    ]
});

guards(router);

export default router
import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

import _ from './tools.js'

Vue.use(Router);

const autoMountRoutes = _.init();

var router = new Router({
    routes: [
        {
            path: '/demo/vcm',
            component: () => import(/*webpackChunkName: 'demo-vcm'*/ '@components/example')
        },
        ...autoMountRoutes,
    ]
});

guards(router);

export default router

import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

import _ from './tools.js'

Vue.use(Router);

var routerArr = [];
routerArr.push.apply(routerArr, _.init());

var router = new Router({
    routes: routerArr
});

guards(router);

export default router

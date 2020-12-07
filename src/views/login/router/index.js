export default {
    path: 'login',
    component: () => import(/*webpackChunkName: 'pc-login'*/ '@views/login/index'),
    meta: {
        title: '登录'
    }
}

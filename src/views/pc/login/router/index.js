export default {
    path: 'login',
    component: () => import(/*webpackChunkName: 'pc-login'*/ '@views/pc/login/index'),
    meta: {
        title: '登录'
    }
}

export default {
    path: 'login',
    alias: ['/'],
    component: () => import(/*webpackChunkName: 'login'*/ '@views/login/index'),
    meta: {
        title: '登录'
    }
}

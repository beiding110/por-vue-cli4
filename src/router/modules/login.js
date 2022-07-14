export default {
    path: 'login',
    component: () => import(/*webpackChunkName: 'login'*/ '@views/login/index'),
    meta: {
        title: '登录'
    }
}

export default {
    path: 'login',
    component: () => import(/*webpackChunkName: 'mobile-login'*/ '@views/mobile/login/index'),
}

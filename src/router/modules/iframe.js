export default {
    path: 'iframe',
    component: () => import(/*webpackChunkName: 'iframe'*/ '@views/iframe/index'),
    meta: {
        title: ''
    }
}

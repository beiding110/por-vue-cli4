export default {
    path: 'index',
    component: () => import(/*webpackChunkName: 'pc-web-index'*/ '@sub/web/views/home/index'),
    meta: {

    }
};

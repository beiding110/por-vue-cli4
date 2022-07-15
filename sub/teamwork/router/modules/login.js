export default {
    path: 'login',
    // path: '/login',  //如有需要，可覆盖主系统登录界面
    component: () => import(/*webpackChunkName: 'login'*/ '../../views/login/index'),
    meta: {
        title: '子项目登录'
    }
}

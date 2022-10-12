import home from './modules/home'

export default {
    path: '/web',
    component: () => import(/*webpackChunkName: 'pc-web'*/ '@layout/empty'),
    children: [
        home
    ]
}

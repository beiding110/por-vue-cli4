export default {
    path: '/demo/vcm',
    component: () => import(/*webpackChunkName: 'demo-vcm'*/ '@components/example')
}
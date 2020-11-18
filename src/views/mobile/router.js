import {initMobileRouter} from '@router/tools'
import config from '@/config/index'

const indexs = initMobileRouter();

export default {
    path: `/${config.router.mobile['base-name']}`,
    component: () => import(/*webpackChunkName: 'mobile'*/ '@layout/empty'),
    meta: {
        title: config.router.mobile['title']
    },
    children: indexs
}

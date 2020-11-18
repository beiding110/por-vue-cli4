import {initPcRouter} from '@router/tools'
import config from '@/config/index'

const indexs = initPcRouter();

export default {
    path: `/${config.router.pc['base-name']}`,
    component: () => import(/*webpackChunkName: 'pc'*/ '@layout/empty'),
    meta: {
        title: config.router.pc['title']
    },
    children: indexs
}

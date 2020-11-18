import project from './modules/project'

export default {
    path: 'teamwork',
    component: () => import(/*webpackChunkName: 'pc-teamwork'*/ '@views/pc/layout/index'),
    children: [
        project
    ]
}

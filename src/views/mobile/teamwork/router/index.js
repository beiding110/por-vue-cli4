import project from './modules/project'

export default {
    path: 'teamwork',
    component: () => import(/*webpackChunkName: 'mobile-teamwork'*/ '@views/mobile/layout/index'),
    children: [
        project
    ]
}

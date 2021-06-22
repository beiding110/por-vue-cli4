import project from './modules/project'

export default {
    path: 'teamwork',
    component: () => import(/*webpackChunkName: 'pc-teamwork'*/ '@layout/frame'),
    children: [
        project
    ]
}

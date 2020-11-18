export default {
    path: 'project',
    component: () => import(/*webpackChunkName: 'tw-project'*/ '@layout/empty'),
    children: [
        {
            path: 'list',
            component: () => import(/*webpackChunkName: 'tw-project'*/ '@views/mobile/teamwork/project/list'),
            meta: {
                title: '项目列表'
            }
        }
    ]
}

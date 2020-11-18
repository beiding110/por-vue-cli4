const B_1 = [
    {
        title: '项目列表',
        bread: [
            {
                title: '项目列表',
                path: '/pc/teamwork/project/list'
            }
        ]
    }
];

export default {
    path: 'project',
    component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@layout/empty'),
    children: [
        {
            path: 'list',
            component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@views/pc/teamwork/project/list'),
            meta: {
                title: '项目列表',
                bread: [
                    ...B_1
                ]
            }
        }, {
            path: 'form',
            component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@views/pc/teamwork/project/form'),
            meta: {
                title: '项目表单',
                bread: [
                    ...B_1, {
                        title: '项目表单',
                        path: '/pc/teamwork/project/form'
                    }
                ]
            }
        }, {
            path: 'detail',
            component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@views/pc/teamwork/project/detail'),
            meta: {
                title: '项目表单',
                bread: [
                    ...B_1, {
                        title: '项目详情',
                        path: '/pc/teamwork/project/detail'
                    }
                ]
            }
        }
    ]
}

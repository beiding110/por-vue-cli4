import project from './modules/project';
import login from './modules/login';

export default {
    path: 'teamwork',
    component: () => import(/*webpackChunkName: 'pc-teamwork'*/ '@layout/empty'),
    children: [
        login,
        {
            path: '',
            component: () => import(/*webpackChunkName: 'pc-teamwork'*/ '@layout/frame'),
            children: [
                project,
            ]
        }
    ]
};

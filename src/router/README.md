存放`路由`文件

``` bash

router
    |-modules       主系统路由文件
    |-utils
        |-guards        路由守卫
        |-tools         路由工具（勿改）
    |-index         路由文件入口（勿改）

```

各个包内router文件应存放在 `包` 内管理；

各个包内路由meta属性中的bread数组，将会成为对应组件显示时面包屑导航的参考；

``` bash

export default {
    path: 'project',
    component: () => import(/*webpackChunkName: 'tw-project'*/ '@layout/empty'),
    children: [
        {
            path: 'list',
            component: () => import(/*webpackChunkName: 'tw-project'*/ '@views/teamwork/project/list'),
            meta: {
                title: '项目列表',
                bread: [
                    {
                        title: '项目列表',
                        path: '/teamwork/project/list'
                    }
                ]
            }
        }
    ]
}

```

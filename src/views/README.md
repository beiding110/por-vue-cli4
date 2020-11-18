`项目文件`

请保持如下结构

``` bash

...
pc（平台名称，如单一平台则去除该层）
    |-css           平台独有样式（如有）
    |-components    平台独有组件库（如有）
    |-js            平台独有方法（如有）
    |-layout        平台独有layout组件
    |-mixins        平台独有mixins文件（如有）

    ...             各个与后台包对应的“包文件夹”
    |-teamwork(包名称)
        |-css           包独有样式（如有）
        |-components    包独有组件库（如有）
        |-js            包独有方法（如有）
        |-mixins        包独有mixins文件（如有）
        |-static        包独有static文件（如有）
        |-router        包独有router文件
            |-modules       controller对应的子路由
            |-inxex         包路由入口

        ...             各个与后台controller对应的“功能文件夹”
        |-project（功能名称）
            |-css           功能独有样式（如有）
            |-components    功能独有组件库（如有）
            |-js            功能独有方法（如有）
            |-mixins        功能独有mixins文件（如有）
        ...
    |-web(包名称)
        ...
    ...

    |-store.js         平台独有store文件
    |-router.js         平台独有router文件
...

```

包内独立维护的 `static文件夹` 将会在打包的时候自动按照 `包根路径/包名` 的文件路径复制到 `dist/static` 下，在本例中最终的打包路径为 `/static/pc/teamwork/...`

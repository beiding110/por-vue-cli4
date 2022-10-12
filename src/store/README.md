存放`vuex`文件

``` bash

store
|-modules       全局模块文件
    |-api       接口前缀（请勿修改，如需修改，请修改 `api文件夹` 下内容）
    |-bread     面包屑导航数据
    |-config    全局配置，从window.$_plat_config取值
    |-dictionary    字典
    |-layout    主面板数据，包括左导航、个人菜单
    |-tag-nav   tag标签数据
    |-user      用户信息及主系统登录逻辑
|-index.js      store入口文件（可补充全局变量，但是 `推荐在modules中添加变量信息`）
|-tools.js      辅助工具函数文件（请勿修改）

```

index会根据 `modules中的文件` 和 `sub文件夹中的store.js` 文件自动生成vuex内容：

* 其中 `./index.js` 中的内容为`根级store`，其他内容均为 `子模块内容`；

* 子项目中的store推荐设置 `namespaced` 进行区分

各个包内store文件应存放在 `包` 内管理；

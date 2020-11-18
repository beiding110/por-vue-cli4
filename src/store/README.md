存放`vuex`文件

``` bash

store
|-modules       全局模块文件
    |-api       接口前缀（请勿修改，如需修改，请修改 `api文件夹` 下内容）
    |-dictionary    字典
    |-user      用户信息
|-index.js      store入口文件（可补充全局变量，但是 `推荐在modules中添加变量信息`）
|-tools.js      辅助工具函数文件（请勿修改）

```

index会根据 `modules中的文件` 和 `views文件夹中的store.js` 文件自动生成vuex内容：

* 其中 `./index.js` 中的内容为`根级store`，其他内容均为 `子模块内容`；

* `./modules` 中的固有内容的getter `不会加前缀`

* `views中的store.js`生成的getter会自动增加前缀 `包名_`

各个包内store文件应存放在 `包` 内管理；

存放`全局js`文件

``` bash

js
|-ajax
    |-axios     axios拦截器及基本配置
    |-axios     axios混入及初始化（勿改）
    |-authority 权限判断
    |-index     ajax入口文件（勿改）
    |-jquery.ajax    jqueryajax方法文件（勿改）
    |-res-check ajax请求结果匹配文件（勿改，可申请扩充）
|-app-supply    vue项目方法拓展
|-app           方法库（勿改）
|-MessageBox    提示框方法文件（勿改）
|-preset        配置项解析文件（勿改）
|-storage       storage相关方法（勿改）

```

各个包内js文件应存放在 `包` 内管理；

## appjs

[appjs参考文档](https://beiding110.github.io/procupine-app-document/#/)

## app-supply中追加方法

方法名 | 说明
:-|-:
getRoute | 获取 $route.params
getQuery | 获取 $route.query
getStore | 获取 $store.state
setStore | 设置 $store.state
getGetters | 获取 $store.getters
goto | 同 this.$router.push
inAttr | 同 inAttr
timeToDate | 同 timeToDate
newRule | 创建表单验证规则

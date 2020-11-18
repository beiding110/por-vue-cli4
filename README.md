# por-vue-cli4

> the new cli with node 10，vue-cli4，webpack4

集成了appjs、常用组件库、element-ui/mint-ui、jquery、babel、sentry、vue-mate-info等；

常用配置修改；

[前端工程化文档参考](https://beiding110.github.io/por-fee-doc/#/)

## 文件结构

各个文件夹详细内容及规则参考 `src文件夹` 下各级文件夹内 `README` 文件

``` bash

|-build         构建相关内容
|-config        前端工程相关配置
|-src           源代码
    |-api               请求头前缀配置
    |-assets            图片等媒体文件
    |-components        vue_components组件库（勿改）
    |-components-sys    项目独有全局引用组件库
    |-config            前端项目配置
    |-css               全局样式
    |-js                全局方法
    |-layout            全局布局
    |-mixins            全局mixin
    |-router            自动化路由配置文件
    |-store             自动化store配置文件
    |-views             所有页面及功能
    |-App.vue           入口页面
    |-main.js           入口文件、加载组件、样式、初始化配置等
|-static        不打包编译的静态文件
...

```

## 开发过程

* 拉取项目；
* 是否使用多项目开发，是则取消`.gitignore`中的注释；
* 修改`config/index`中代理配置，包含：dev.proxyTable、build.useSentry；
* 修改`src/config/index`中相关参数（如需要），包含：sentry、cnzz、router等；
* 判断是否使用统一login页面，决定登录页面`src/views/pc/login`，及相关方法`src/views/pc/store`，继续在原位置维护（使用统一登录），或移至子项目文件夹中维护（非统一）；
* 修改`src/views/pc/store`中的上导航相关操作；
* 根据需要配置`src/views/pc/layout`中导航菜单（如本示例中将菜单项进行配置抽离，实际生产中应该是以接口形式获取菜单）；
* 如使用多项目开发，则应在此位置提交git，并将该项目作为base项目，禁止管理员外其他成员提交修改；
* 在以上基础上进行开发；

## 开发命令

## Project setup
```
npm install
yarn install
```

### Compiles and hot-reloads for development
```
npm run dev
npm run serve
yarn dev
```

### Compiles and minifies for production
```
npm run build
yarn build
```

### Lints and fixes files
```
npm run lint
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

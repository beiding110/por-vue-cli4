# por-vue-cli4

> the new cli with node 16.15.1，vue-cli4，webpack4

集成了appjs、常用组件库、等:

* `ui库`：element-ui、mint-ui、
* `工具库`：jquery、echarts、axios、nprogress、postcss-pxtorem、cryptojs、
* `css预处理`：~~node-sass~~、sass(dart-sass)、
* `运维及统计`：sentry、cnzz、
* `vue插件`：vue-mate-info、vuex-persistedstate、
* `富文本`：~~ueditor~~、tinymce、

常用配置修改；

[前端工程化文档参考](https://beiding110.github.io/por-fee-doc/#/)

## 文件结构

各个文件夹详细内容及规则参考 `src文件夹` 下各级文件夹内 `README` 文件

```bash

|-build         构建相关内容
|-config        前端工程相关配置
|-public        不打包编译的静态文件
    |-config            全局项目静态配置
|-src           源代码
    |-api               请求头前缀配置
    |-assets            图片等媒体文件
        |-css           全局样式
        |-js            全局方法
    |-components        全局组件库
        |-my            vue_components组件库（勿改）
        |-sys           项目独有全局引用组件库
    |-config            前端项目全局配置
    |-layout            全局布局
    |-mixins            全局mixin
    |-router            自动化路由配置文件
    |-store             自动化store配置文件
    |-views             所有页面及功能
        |-...
    |-App.vue           入口页面
    |-main.js           入口文件、加载组件、样式、初始化配置等
|-sub           子项目目录
    |-...       子项目文件夹
|-sub-modules   子依赖项目
    |-...       子依赖项目文件夹
...

```

## 开发过程

* 【拉取】拉取项目；
* 【配置工程】修改 `config/index` 中的接口代理配置、sentry（错误收集相关）配置、项目类型、ui选型等配置；
* 【配置项目】修改 `public/config/index`中相关参数（如需要），包含：title平台名称、cnzz（运营收集相关）、通用按钮名称、通用提示信息、等；
* 【配置logo】修改 `public` 中的 `.ico` 文件及 `public/config` 中的logo文件；
* 【主项目】在 `src` 中进行开发即可；
* 【子项目】子项目应在sub中进行创建，文件接结构参考对应 `readme.md` 文件；
* 【子项目git】如使用多项目开发，则应在此位置提交git，并将该项目作为base项目，禁止管理员外其他成员提交修改；

## 开发命令

## Project setup

```
npm install
yarn install
```

> 安装过程中可能发生错误

```
错误类型：
无法安装sentry-cli

错误内容：
Downloading from https://downloads.sentry-cdn.com/sentry-cli/x.xx.x/sentry-cli-Windows-x86_64.exe 
Error: Unable to download sentry-cli binary from https://downloads.sentry-cdn.com/sentry-cli/1.67.1/sentry-cli-Windows-x86_64.exe. Error code: ECONNRESET

解决方法：
npm config set sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/
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

## 整体样式修改

### 通用修改

`logo` public/config/logo.png、public/config/logo-small.png

`.ico` public/favicon.ico

`title` src/config/index.js

`其他样式重写及覆盖` src/css/common.scss

`组件库级别修改（如my-btn）` 修改对应组件文件即可（如src/components/sys/my-btn.vue）

### 系统面板

`logo（大）` public/config/logo.png

`logo（小）` public/config/logo-small.png

`系统主题色` src/css/var.scss

`面板主题` src/views/pc/layout/index.vue，在style标签中选择引用 `common.scss`或 `pop.scss`

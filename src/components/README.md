# 组件文件夹

## 说明

存放 `全局` 组件，勿改

其他组件视情况存放：

仅单独页面（功能）使用的：存放在 `页面所在功能文件夹` 下components文件夹中

多个功能使用的：存放在 `功能对应包文件夹`中

多个包共同使用的：存放在 `sys`中

> 应存放非业务类组件

## my

常用组件库，`请勿修改`

> 多个系统中都会用到的

```
    // 列表用
    Vue.component('my-pagination', function(){return import(/*webpackChunkName: 'coms'*/ './pagination')});
    Vue.component('my-table', function(){return import(/*webpackChunkName: 'coms'*/ './table')});
    Vue.component('my-search', function(){return import(/*webpackChunkName: 'coms'*/ './search')});

    // 表单用
    Vue.component('my-form', function(){return import(/*webpackChunkName: 'coms'*/ './form')});
    Vue.component('my-form-item-group', function(){return import(/*webpackChunkName: 'coms'*/ './form-item-group')});
    Vue.component('my-checkbox', function(){return import(/*webpackChunkName: 'coms'*/ './checkbox')});
    Vue.component('my-radio', function(){return import(/*webpackChunkName: 'coms'*/ './radio')});
    Vue.component('my-select', function(){return import(/*webpackChunkName: 'coms'*/ './select')});
    Vue.component('my-cascader', function(){return import(/*webpackChunkName: 'coms'*/ './cascader')});
    Vue.component('my-transfer', function(){return import(/*webpackChunkName: 'coms'*/ './transfer')});
    Vue.component('my-upload', function(){return import(/*webpackChunkName: 'coms'*/ './upload')});
    Vue.component('my-number-range', function(){return import(/*webpackChunkName: 'coms'*/ './number-range')});
    Vue.component('my-upload-s', function(){return import(/*webpackChunkName: 'coms'*/ './upload-s/index')});

    // 其他
    Vue.component('my-nav-menu', function(){return import(/*webpackChunkName: 'coms'*/ './nav-menu')});
    Vue.component('my-dialog', function(){return import(/*webpackChunkName: 'coms'*/ './dialog')});
    Vue.component('my-tree', function(){return import(/*webpackChunkName: 'coms'*/ './tree')});

    Vue.component('my-img', function(){return import(/*webpackChunkName: 'coms'*/ './img')});

    // 非my字头，即非element二次封装
    Vue.component('echarts', function(){return import(/*webpackChunkName: 'coms-echarts'*/ './echarts')});

    Vue.component('cnzz', function(){return import(/*webpackChunkName: 'coms'*/ './cnzz')});

    Vue.component('ueditor', function(){return import(/*webpackChunkName: 'coms'*/ './ueditor')});
  
    // 预览类
    Vue.component('frame-view', function(){return import(/*webpackChunkName: 'coms'*/ './frame')});
    Vue.component('pdf-view', function(){return import(/*webpackChunkName: 'coms'*/ './pdf-js')});
    Vue.component('photo-view', function(){return import(/*webpackChunkName: 'coms'*/ './picture-view')});
    Vue.component('word-view', function(){return import(/*webpackChunkName: 'coms'*/ './word-view')});
```

## sys

系统内常用组件库，`请勿修改`

> 其他系统可能会用不到的

```
    Vue.component('action-row', function(){return import(/*webpackChunkName: 'coms-sys'*/ './action-row')});

    Vue.component('my-btn', function(){return import(/*webpackChunkName: 'coms-sys'*/ './my-btn')});
    Vue.component('my-tag', function(){return import(/*webpackChunkName: 'coms'*/ './my-tag')});

    Vue.component('btn-builder', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-builder')});
  
    Vue.component('info-tip', function(){return import(/*webpackChunkName: 'coms-sys'*/ './info-tip')});

    Vue.component('state-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './state-list')});
    Vue.component('btn-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-list')});
```

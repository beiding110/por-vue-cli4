# 子项目文件夹

如使用类似微服务形式的开发，则考虑启用此文件夹；

## 说明

* 该文件夹中的项目应按项目名拆分为单独的文件夹
* 子项目文件夹中可包含完整的文件结构
* 文件夹中的项目会被 `自动挂载`，包括router、vuex、static
  router自动挂载；
  vuex生成model名称为文件夹名称的store；
  static自动解析到路径static/文件夹名称；
* 如果路由与主项目路由冲突，则子项目路由生效
* 主项目/子项目引用子项目，可使用 `@sub/xxx`

## 文件夹内容

```
|-子项目1
|-子项目2
...
```

## 子项目文件夹内容

```
|-assets            资源文件（如有）
    |-js
    |-css
    |-images
|-router            路由文件
    |-index.js      主路由文件，会被自动挂载
|-static            静态资源文件夹，会被自动解析到路径static/xxx
|-views             业务文件
|-store.js          vuex文件，会被自动挂载
```

## 开发须知

与router、store、static静态文件夹有关

src/router/utils/tools

src/store/tools

build/util

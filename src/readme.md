# App.vue文件注释

vue-router在ie浏览器中，监听的事件依旧为 `popstate` ，而非 `hashchange` 。而 `popstate` 在ie中的表现与主流浏览器有差异，如：

* 在地址栏直接输入单页项目路由，再敲回车的时候，ie是不会跳转的；
* 偶尔存在hash变换，页面不切换的情况；
* 等

因此在mounted中增加兼容代码，解决这类极端情况：

```js

if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
        }
    }, false);
}
    
```

export default{
    install: function(Vue){
        // Vue.component('echarts', function(){return import(/*webpackChunkName: 'coms'*/ './echarts')});
        // Vue.component('time-line', function(){return import(/*webpackChunkName: 'coms'*/ './time-line')});

        Vue.component('my-nav-menu', function(){return import(/*webpackChunkName: 'coms'*/ './my-nav-menu')});

        Vue.component('my-pagination', function(){return import(/*webpackChunkName: 'coms'*/ './my-pagination')});
        Vue.component('my-table', function(){return import(/*webpackChunkName: 'coms'*/ './my-table')});
        Vue.component('tree-table', function(){return import(/*webpackChunkName: 'coms'*/ './tree-table')});
        Vue.component('my-search', function(){return import(/*webpackChunkName: 'coms'*/ './my-search')});

        Vue.component('my-form', function(){return import(/*webpackChunkName: 'coms'*/ './my-form')});
        Vue.component('my-form-item-group', function(){return import(/*webpackChunkName: 'coms'*/ './my-form-item-group')});
        Vue.component('my-checkbox', function(){return import(/*webpackChunkName: 'coms'*/ './my-checkbox')});
        Vue.component('my-radio', function(){return import(/*webpackChunkName: 'coms'*/ './my-radio')});
        Vue.component('my-select', function(){return import(/*webpackChunkName: 'coms'*/ './my-select')});
        Vue.component('my-cascader', function(){return import(/*webpackChunkName: 'coms'*/ './my-cascader')});
        Vue.component('my-transfer', function(){return import(/*webpackChunkName: 'coms'*/ './my-transfer')});
        Vue.component('my-upload', function(){return import(/*webpackChunkName: 'coms'*/ './my-upload')});

        Vue.component('my-dialog', function(){return import(/*webpackChunkName: 'coms'*/ './my-dialog')});
        Vue.component('my-tree', function(){return import(/*webpackChunkName: 'coms'*/ './my-tree')});

        Vue.component('cnzz', function(){return import(/*webpackChunkName: 'coms'*/ './cnzz')});

        Vue.component('ueditor', function(){return import(/*webpackChunkName: 'coms'*/ './ueditor')});

        Vue.component('my-frame', function(){return import(/*webpackChunkName: 'coms'*/ './my-frame')});
        Vue.component('pdf', function(){return import(/*webpackChunkName: 'coms'*/ './pdf-js')});
        // Vue.component('word', function(){return import(/*webpackChunkName: 'coms'*/ './word')});
        Vue.component('photo', function(){return import(/*webpackChunkName: 'coms'*/ './picture-view')});
        Vue.component('word-view', function(){return import(/*webpackChunkName: 'coms'*/ './word-view')});
    }
}

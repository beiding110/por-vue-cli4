export default {
    install: function(Vue){
        // Vue.component('time-line', function(){return import(/*webpackChunkName: 'coms'*/ './time-line');});

        // 列表用
        Vue.component('my-pagination', function(){return import(/*webpackChunkName: 'coms'*/ './pagination');});
        Vue.component('my-table', function(){return import(/*webpackChunkName: 'coms'*/ './table');});
        Vue.component('my-search', function(){return import(/*webpackChunkName: 'coms'*/ './search');});

        // 表单用
        Vue.component('my-form', function(){return import(/*webpackChunkName: 'coms'*/ './form');});
        Vue.component('my-form-item-group', function(){return import(/*webpackChunkName: 'coms'*/ './form-item-group');});
        Vue.component('my-checkbox', function(){return import(/*webpackChunkName: 'coms'*/ './checkbox');});
        Vue.component('my-radio', function(){return import(/*webpackChunkName: 'coms'*/ './radio');});
        Vue.component('my-select', function(){return import(/*webpackChunkName: 'coms'*/ './select');});
        Vue.component('my-cascader', function(){return import(/*webpackChunkName: 'coms'*/ './cascader');});
        Vue.component('my-transfer', function(){return import(/*webpackChunkName: 'coms'*/ './transfer');});
        Vue.component('my-upload', function(){return import(/*webpackChunkName: 'coms'*/ './upload');});
        Vue.component('my-number-range', function(){return import(/*webpackChunkName: 'coms'*/ './number-range');});
        Vue.component('my-upload-s', function(){return import(/*webpackChunkName: 'coms'*/ './upload-s/index');});

        // 其他
        Vue.component('my-nav-menu', function(){return import(/*webpackChunkName: 'coms'*/ './nav-menu');});
        Vue.component('my-dialog', function(){return import(/*webpackChunkName: 'coms'*/ './dialog');});
        Vue.component('my-tree', function(){return import(/*webpackChunkName: 'coms'*/ './tree');});

        Vue.component('my-img', function(){return import(/*webpackChunkName: 'coms'*/ './img');});

        // 非my字头，即非element二次封装
        Vue.component('echarts', function(){return import(/*webpackChunkName: 'coms-echarts'*/ './echarts');});

        Vue.component('cnzz', function(){return import(/*webpackChunkName: 'coms'*/ './cnzz');});

        // Vue.component('ueditor', function(){return import(/*webpackChunkName: 'coms'*/ './ueditor');});
        Vue.component('tinymce', function(){return import(/*webpackChunkName: 'coms'*/ './tinymce');});
        
        // 预览类
        Vue.component('frame-view', function(){return import(/*webpackChunkName: 'coms'*/ './frame');});
        Vue.component('pdf-view', function(){return import(/*webpackChunkName: 'coms'*/ './pdf-js');});
        Vue.component('photo-view', function(){return import(/*webpackChunkName: 'coms'*/ './picture-view');});
        Vue.component('word-view', function(){return import(/*webpackChunkName: 'coms'*/ './word-view');});
    }
}

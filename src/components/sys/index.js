export default{
    install: function(Vue){
        Vue.component('action-row', function(){return import(/*webpackChunkName: 'coms-sys'*/ './action-row')});

        Vue.component('my-btn', function(){return import(/*webpackChunkName: 'coms-sys'*/ './my-btn')});
        Vue.component('my-tag', function(){return import(/*webpackChunkName: 'coms'*/ './my-tag')});

        Vue.component('btn-builder', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-builder')});
        
        Vue.component('info-tip', function(){return import(/*webpackChunkName: 'coms-sys'*/ './info-tip')});

        Vue.component('state-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './state-list')});
        Vue.component('btn-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-list')});
    }
}

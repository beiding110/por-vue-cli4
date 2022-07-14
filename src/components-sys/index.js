export default{
    install: function(Vue){
        Vue.component('my-btn', function(){return import(/*webpackChunkName: 'coms-sys'*/ './my-btn')});
        Vue.component('btn-builder', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-builder')});
        
        Vue.component('info-tip', function(){return import(/*webpackChunkName: 'coms-sys'*/ './info-tip')});

        Vue.component('state-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './state-list')});
        Vue.component('btn-list', function(){return import(/*webpackChunkName: 'coms-sys'*/ './btn-list')});
    }
}

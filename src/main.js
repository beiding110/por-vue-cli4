import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';

//ajax请求
import '@js/ajax/index';

//方法库
import '@js/app.js';
import '@js/app-supply.js';

// 兼容补丁包
import '@js/js-polyfill.js';

//权限
import '@js/authority';

//配置项预处理
import '@js/preset.js';

//图标
import '@css/iconfont.css';
//清除样式
import '@css/zh-common.scss';
//项目全局样式
import '@css/common.scss';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');

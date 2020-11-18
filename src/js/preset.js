import Vue from 'vue'
import config from '@/config'

if(config.element) {
    const ElementUI = require('element-ui');
    Vue.use(ElementUI);

    const zhui = require('@components/index.js');
    Vue.use(zhui.default);

    const sysUi = require('@components-sys/index.js');
    Vue.use(sysUi.default);
};
if(config.mint) {
    const Mint = require('mint-ui');
    import(/*webpackChunkName: 'base-ui-mint'*/ 'mint-ui/lib/style.css');
    Vue.use(Mint);
};
if(process.env.NODE_ENV !== 'development' ){
    if(config.sentry) {
        const Raven = require('raven-js');
        const RavenVue = require('raven-js/plugins/vue');

        Raven.config(config.sentry.dsn).addPlugin(RavenVue, Vue).install();
        Vue.config.errorHandler = function(err, vm, info) {
            Raven.captureException(err);
            console.error(err);
        };
    };
};

const MetaInfo = require('vue-meta-info');
Vue.use(MetaInfo);

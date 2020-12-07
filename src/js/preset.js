import Vue from 'vue'
import config from '@/config'

if (config.ui.element) {
    require('@/css/element-customize.scss');

    const ElementUI = require('element-ui');
    Vue.use(ElementUI);

    const zhui = require('@components/index.js');
    Vue.use(zhui.default);

    const sysUi = require('@components-sys/index.js');
    Vue.use(sysUi.default);
};
if (config.ui.mint) {
    require('mint-ui/lib/style.css');
    const Mint = require('mint-ui');
    Vue.use(Mint);
};

if (process.env.NODE_ENV !== 'development') {
    if (config.sentry) {
        const Raven = require('raven-js');
        const RavenVue = require('raven-js/plugins/vue');

        Raven.config(config.sentry.dsn).addPlugin(RavenVue, Vue).install();
        Vue.config.errorHandler = function (err, vm, info) {
            Raven.captureException(err);
            console.error(err);
        };
    };
};
if (config['project-type'] === 'mobile') {
    require('amfe-flexible');
};

const MetaInfo = require('vue-meta-info');
Vue.use(MetaInfo);

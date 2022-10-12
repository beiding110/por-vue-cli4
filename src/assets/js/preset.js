import Vue from 'vue';

const CONFIG = require('../../../config/index.js');

if (CONFIG.ui.element) {
    // 使用element
    require('@css/element-customize.scss');

    const ElementUI = require('element-ui');
    Vue.use(ElementUI);

    const zhui = require('@components/index.js');
    Vue.use(zhui.default);

    const sysUi = require('@components-sys/index.js');
    Vue.use(sysUi.default);
}

if (CONFIG.ui.mint) {
    // 使用mint
    require('mint-ui/lib/style.css');
    const Mint = require('mint-ui');
    Vue.use(Mint);
}

if (process.env.NODE_ENV !== 'development') {
    if (CONFIG.sentry) {
        // 使用sentry
        const Sentry = require('@sentry/vue');
        const { BrowserTracing } = require("@sentry/tracing");

        Sentry.init({
            Vue,
            dsn: CONFIG.sentry.dsn,
            integrations: [
                new BrowserTracing(),
            ],
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
            logErrors: true,
        });
    }
}

if (CONFIG['project-type'] === 'mobile') {
    // 如果是移动端项目
    require('amfe-flexible');
}

const MetaInfo = require('vue-meta-info');
Vue.use(MetaInfo);

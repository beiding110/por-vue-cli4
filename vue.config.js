const util = require('./build/util.js');
const webpack = require('webpack');
const path = require('path');

const CONFIG = {
    sentryEnabled: false,
    assetsDir: 'static'
};

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
        proxy: {
            '/': {
                target: 'http://www.hgchzx.com',
                changeOrigin:true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        },
    },
    assetsDir: CONFIG.assetsDir,
    lintOnSave: false,
    configureWebpack: config => {
        const staticFoldersPlugin = util.buildStaticPlugin(CONFIG.assetsDir);
        config.plugins.push.apply(config.plugins, staticFoldersPlugin);
    },
    chainWebpack: config => {
        util.forEachKey({
            'vue$': 'vue/dist/vue.esm.js',
            '@': util.resolve('src'),
            '@assets': util.resolve('src/assets'),
            '@components': util.resolve('src/components'),
            '@components-sys': util.resolve('src/components-sys'),
            '@config': util.resolve('src/config'),
            '@css': util.resolve('src/css'),
            '@js': util.resolve('src/js'),
            '@layout': util.resolve('src/layout'),
            '@mixins': util.resolve('src/mixins'),
            '@router': util.resolve('src/router'),
            '@store': util.resolve('src/store'),
            '@views': util.resolve('src/views'),
            '@pc': util.resolve('src/views/pc'),
            '@mobile': util.resolve('src/views/mobile'),
            'public': util.resolve('public')
        }, function(key, value) {
            config.resolve.alias.set(key, value);
        });

        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }]);

        if(process.env.NODE_ENV === "production" && CONFIG.sentryEnabled) {
            const SentryPlugin = require('@sentry/webpack-plugin');

            config.plugin('sentry').use(SentryPlugin).tap(options => {
                options[0] = {
                    release: process.env.RELEASE_VERSION,
                    configFile: 'sentry.properties',
                    include: path.join(__dirname, `./dist/${CONFIG.assetsDir}/js/`),
                    urlPrefix: `~/${CONFIG.assetsDir}/js`
                };
                return options;
            });
        };
    }
}
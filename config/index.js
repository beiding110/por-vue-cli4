exports.vue = {
    devServer: {
        port: '8080',
        open: true,
        proxy: {
            '/': {
                target: 'http://www.hgchzx.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        },
    }
}

exports.project = {
    'project-type': 'pc',

    assetsDir: 'static',
    
    ui: {
        element: true,
        mint: false
    },

    router: {
        'base-name': '',
        title: 'porcupine'
    },

    //ajax类型axios或jquery，用法相同
    ajax: 'jquery',

    sentry: {
        dsn: 'https://4efc6c77e7e64921966612b3e3cc4355@o367512.ingest.sentry.io/5171325',
        enabled: false
    },

    cnzz: {
        id: '1275340054',
        show: 'pic1'
    }
}
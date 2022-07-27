module.exports = {
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
    },
    assetsDir: 'static',

    // 项目功能配置
    'project-type': 'pc',
    
    ui: {
        element: true,
        mint: false
    },

    //ajax类型axios或jquery，用法相同
    ajax: 'axios',

    sentry: {
        dsn: 'https://4efc6c77e7e64921966612b3e3cc4355@o367512.ingest.sentry.io/5171325',
        enabled: false
    },
}
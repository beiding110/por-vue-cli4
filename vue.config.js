const merge = require('webpack-merge')

const baseConfig = require('./build/config.base')
const {devServer} = require('./config/index');

module.exports = merge(baseConfig, {
    devServer,
});
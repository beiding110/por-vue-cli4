const merge = require('webpack-merge')

const baseConfig = require('./build/config.base')
const CONFIG = require('./config/index');

module.exports = merge(baseConfig, CONFIG.vue);
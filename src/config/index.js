const config = require('../../config/index');

export default {
    ...config.project,
    webOrigin: process.env.NODE_ENV === 'development' ? 'http://192.168.1.66:8011' : 'http://192.168.1.100:12014',
};

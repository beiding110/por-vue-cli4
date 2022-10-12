const CONFIG = require('../../../../config/index.js');

const ajaxObj = {
    jquery: () => require('./jquery.ajax.js'),
    axios: () => require('./axios.js')
};

ajaxObj[CONFIG.ajax]();

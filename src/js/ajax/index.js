import config from '@/config'

const ajaxObj = {
    jquery: () => require('./jquery.ajax.js'),
    axios: () => require('./axios.js')
};
ajaxObj[config.ajax]();

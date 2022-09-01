import qs from 'qs';

var { api } = window.$_plat_config;

/**
 * 请求拦截器
 * @param {Object} config 请求参数
 * @returns
 */
export default function request(config) {
    var { url, fztype, data, callback, complete, type, method } = config,
        ts = new Date().getTime(),
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': '',
            'bidding-auth': '',
            pageuser: getSession('user') ? getSession('user').userid : '',
            usetool: 'wechat',
            pageurl: window.location.href.replace(window.location.search, ''),
        };

    if (method) {
        type = method;
    }

    if (api.globalUrl) {
        url = api.globalUrl + url;
    }

    url = /\?/.test(url) ? url + '&random=' + ts : url + '?random=' + ts;

    if (type === 'post') {
        if (fztype) {
            headers['Content-Type'] = 'application/json;charset=UTF-8';
            data = JSON.stringify(data);
        } else {
            data = qs.stringify(data);
        }
    }

    callback = callback || function () {};
    complete = complete || function () {};

    type = type || 'get';

    return {
        ...config,
        url,
        data,
        headers,
        type,
        fztype,
        callback,
        complete,
    };
}

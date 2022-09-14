import Vue from 'vue';
import resCheck from './res-check';
import argsCheck from './args-check';
import interceptorsReq from './interceptors-req';
import resError from './res-error';

/**
* 判断是否为服务器端
* @param  {Function}  cb1 服务器端回调函数
* @param  {Function}  cb2 非服务器端回调函数
* @return {null}     无返回值
*/
function isNode(cb1, cb2) {
    if (typeof window === 'undefined') {
        cb1 && cb1();
    } else {
        cb2 && cb2();
    }
}

var ajaxKeyMap = function(type) {
        return [
            ['type', 'method'],
            ['url', 'url'],
            ['data', (type === 'post' ? 'data' : 'params')],
            ['callback', 'callback'],
            ['complete', 'complete'],
            ['fztype', 'fztype'],
            ['headers', 'headers'],
        ];
    },

    mixin = (axios) => {
        function $get(a, b, c, d) {
            var settings = argsCheck(a, b, c, d);

            settings.type = 'get';
            settings = interceptorsReq(settings);

            axios.get(settings.url, {
                params: settings.data,
                headers: settings.headers,
            }).then(([data, res]) => {
                settings.callback.call(this, data, res);
            }).catch(err => {
                if (err.response) {
                    resError(err.response, settings);
                } else {
                    console.error({
                        err,
                        settings,
                    });
                }
            });
        }

        function $post(a, b, c, d) {
            var settings = argsCheck(a, b, c, d);

            settings.type = 'post';
            settings = interceptorsReq(settings);

            axios.post(settings.url, settings.data, {
                headers: settings.headers,
            }).then(([data, res]) => {
                settings.callback.call(this, data, res);
            }).catch(err => {
                if (err.response) {
                    resError(err.response, settings);
                } else {
                    console.error({
                        err,
                        settings,
                    });
                }
            });
        }

        function $ajax(settings) {
            var keyMap = ajaxKeyMap(settings.type),
                axiosSetting = {};

            keyMap.forEach(item => {
                axiosSetting[item[1]] = settings[item[0]];
            });

            axiosSetting.type = settings.type;
            axiosSetting = interceptorsReq(axiosSetting);

            axios(axiosSetting).then(([data, res]) => {
                if (axiosSetting.success) {
                    axiosSetting.success && axiosSetting.success.call(this, data, res);
                } else if (axiosSetting.callback) {
                    axiosSetting.callback && axiosSetting.callback.call(this, data, res);
                }
            }).catch(err => {
                if (err.response) {
                    resError(err.response, axiosSetting);
                } else {
                    console.error({
                        err,
                        settings,
                    });
                }
            }).finally(() => {
                axiosSetting.complete && axiosSetting.complete.call(this);
            });
        }
        
        Vue.prototype.$get = $get;
        Vue.prototype.$post = $post;
        Vue.prototype.$ajax = $ajax;
    },

    resInterceptors = (data, config, headers) => {
        return resCheck(data, config, (data, res) => {
            return [data, res];
        });
    };

export default {
    mixin,
    resInterceptors
};

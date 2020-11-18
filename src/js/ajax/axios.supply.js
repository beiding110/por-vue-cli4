import Vue from 'vue'
import { MessageBox } from 'element-ui';
import qs from 'qs';
import resCheck from './res-check';

/**
 * 判断是否为服务器端
 * @param  {Function}  cb1 服务器端回调函数
 * @param  {Function}  cb2 非服务器端回调函数
 * @return {null}     无返回值
 */
function isNode(cb1, cb2) {
    if(typeof window === 'undefined') {
        cb1 && cb1();
    } else {
        cb2 && cb2();
    };
};

function argsCheck(a, b, c, d) {
    var obj = {
        url: a,
        data: {},
        callback: function () {},
        fztype: false
    };

	if (arguments.length == 2 && typeof (b) == 'function') {
		obj.callback = b;
	} else if (arguments.length == 2 && typeof (b) != 'function') {
		obj.data = b;
	} else if (arguments.length == 3) {
		if (typeof (arguments[arguments.length - 1]) == 'boolean') {
			obj.data = b;
			obj.fztype = c;
		} else {
			obj.data = b;
			obj.callback = c;
		}
	} else if (arguments.length == 4) {
		obj.data = b;
		obj.callback = c;
		obj.fztype = d;
	}

    return obj
};

var ajaxKeyMap = function(type) {
    return [
        ['type', 'method'],
        ['url', 'url'],
        ['data', (type === 'post' ? 'data' : 'params')],
        ['callback', 'callback'],
        ['complete', 'complete'],
        ['fztype', 'fztype'],
        ['headers', 'headers']
    ]
}

var mixin = (axios) => {
    Vue.prototype.$get = function(a, b, c, d) {
        var settings = argsCheck(a, b, c, d);

        axios.get(settings.url, {
            params: settings.data
        }).then(([data, res]) => {
            settings.callback.call(this, data, res);
        });
    };

    Vue.prototype.$post = function(a, b, c, d) {
        var settings = argsCheck(a, b, c, d);

        let data = settings.data;
        settings.data = (settings.fztype ? data : qs.stringify(data));

        axios.post(settings.url, settings.data, {
            headers: {
                'Content-Type': (settings.fztype ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8')
            },
        }).then(([data, res]) => {
            settings.callback.call(this, data, res);
        });
    };

    Vue.prototype.$ajax = function(settings) {
        var keyMap = ajaxKeyMap(settings.type),
        axiosSetting = {};

        keyMap.forEach(item => {
            axiosSetting[item[1]] = settings[item[0]];
        });
        axiosSetting.headers = axiosSetting.headers || {};
        axiosSetting.headers['Content-Type'] = (axiosSetting.fztype ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8')
        if(axiosSetting.method === 'post' && !axiosSetting.fztype) {
            axiosSetting.data = qs.stringify(axiosSetting.data);
        };

        axios(axiosSetting).then(([data, res]) => {
            axiosSetting.callback && axiosSetting.callback.call(this, data, res);
        }).catch(e => {}).finally(() => {
            axiosSetting.complete && axiosSetting.complete.call(this);
        });
    };
};

var resInterceptors = (data, config, headers) => {
    return resCheck(data, config, (data, res) => {
        return [data, res]
    })
}

export default {
    mixin,
    resInterceptors
}

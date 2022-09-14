import Vue from 'vue';
import argsCheck from './args-check';
import resCheck from './res-check';
import interceptorsReq from './interceptors-req';

import resError from './res-error';

Vue.prototype.$ajax = function(obj) {
    ajaxRequest.call(this, obj);
};

Vue.prototype.$get = function (a, b, c, d) {
    var settings = argsCheck(a, b, c, d);

    ajaxRequest.call(this, {
        url: settings.url,
        data: settings.data,
        type: 'get',
        callback: function (data, res) {
            settings.callback.call(this, data, res)
        }.bind(this),
        fztype: settings.fztype
    });
};

Vue.prototype.$post = function (a, b, c, d) {
    var settings = argsCheck(a, b, c, d);

    ajaxRequest.call(this, {
        url: settings.url,
        data: settings.data,
        type: 'post',
        callback: function (data, res) {
            settings.callback.call(this, data, res)
        }.bind(this),
        fztype: settings.fztype
    });
};

/***************************************
 ***发送ajax请求
 *** url 请求url//a
 *** data 提交数据//b
 *** type 请求类型//c
 ****** callback 请求成功回调//c\d
 *fztype 是否复杂回调
 ***************************************/
function ajaxRequest(settings) {
    try {
        this.loadingController = true;
    } catch (e) {}

    var that = this;

    settings = interceptorsReq(settings);

    $.ajax({
        url: settings.url,
        type: settings.type,
        data: settings.data,
        contentType: settings.headers['Content-Type'],
        headers: settings.headers,
        success: function (data) {
            var obj = (typeof (data) == 'string' && /{|}/.test(data)) ? JSON.parse(data) : data;

            //反编码
            function decode(target) {
                if (typeof target == 'object' && Array.isArray(target)) {
                    target.forEach(function (item) {
                        if (typeof item == 'string') item = decode(item);
                        else decode(item);
                    });
                } else if (typeof target == 'object' && !!target) {
                    Object.keys(target).forEach(function (key) {
                        if (typeof target[key] == 'string') target[key] = decode(target[key]);
                        else decode(target[key]);
                    });
                } else if (typeof target == 'string') {
                    return target.html();
                }
            }
            decode(obj);

            if (settings.success) {
                resCheck.call(that, obj, settings, settings.success);
            } else if (settings.callback) {
                resCheck.call(that, obj, settings, settings.callback);
            }
        },
        //AJAX请求结束后，
        complete: function (xhr, status) {
            try {
                that.loadingController = false;
            } catch (e) {
                // e
            }
            
            settings.complete && settings.complete();
        },
        error: function(XHR, textStatus, errorThrown){
            try {
                that.loadingController = false;
            } catch (e) {
                // e
            }

            resError(XHR, settings);
        }
    });
}

/**
 * ajax code查询
 * @param  {Object}   obj      返回的对象
 * @param  {Object}   settings 接口相关测试（非必须）
 * @param  {Function} callback 回调函数
 * @return {null}            [description]
 */
window.ajaxResCheck = resCheck;

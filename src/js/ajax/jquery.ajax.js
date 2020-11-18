import Vue from 'vue';
import resCheck from './res-check';

import util from './util';

Vue.prototype.$ajax = function(obj) {
    AjaxRequest.call(this, obj);
};

Vue.prototype.$get = function (a, b, c, d) {
    var url, data, callback, fztype;

    url = a;
    data = '';
    callback = callback || function () {};
    fztype = false;

    if (arguments.length == 2 && typeof (b) == 'function') {
        callback = b;
    } else if (arguments.length == 2 && typeof (b) != 'function') {
        data = b;
    } else if (arguments.length == 3) {
        if (typeof (arguments[arguments.length - 1]) == 'boolean') {
            data = b;
            fztype = c;
        } else {
            data = b;
            callback = c;
        }
    } else if (arguments.length == 4) {
        data = b;
        callback = c;
        fztype = d;
    }

    AjaxRequest.call(this, {
        url: url,
        data: data,
        type: 'get',
        callback: function (data, res) {
            callback.call(this, data, res)
        }.bind(this),
        fztype: fztype
    })
}

Vue.prototype.$post = function (a, b, c, d) {
    var url, data, callback, fztype;

    url = a;
    data = '';
    callback = callback || function () {};
    fztype = false;

    if (arguments.length == 2 && typeof (b) == 'function') {
        callback = b;
    } else if (arguments.length == 2 && typeof (b) != 'function') {
        data = b;
    } else if (arguments.length == 3) {
        if (typeof (arguments[arguments.length - 1]) == 'boolean') {
            data = b;
            fztype = c;
        } else {
            data = b;
            callback = c;
        }
    } else if (arguments.length == 4) {
        data = b;
        callback = c;
        fztype = d;
    }

    AjaxRequest.call(this, {
        url: url,
        data: data,
        type: 'post',
        callback: function (data, res) {
            callback.call(this, data, res)
        }.bind(this),
        fztype: fztype
    })
}

/***************************************
 ***发送ajax请求
 *** url 请求url//a
 *** data 提交数据//b
 *** type 请求类型//c
 ****** callback 请求成功回调//c\d
 *fztype 是否复杂回调
 ***************************************/
function AjaxRequest(settings) {
    try {
        this.loadingController = true;
    } catch (e) {}

    var c_data = clone(settings.data),
        that = this;

    c_data = !!settings.fztype ? JSON.stringify(c_data) : c_data;
    var contentType = !!settings.fztype ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8';
    var callback = settings.callback || function () {}

    $.ajax({
        url: /\?/.test(settings.url) ? settings.url + '&random=' + getTimeStrmp() : settings.url + '?random=' + getTimeStrmp(),
        type: settings.type || 'get',
        data: c_data,
        contentType: contentType,
        headers: {
            pageuser: getSession('user') ? getSession('user').userid : '',
            usetool: 'wechat',
            pageurl: window.location.href.replace(window.location.search, '')
        },
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


            ajaxResCheck.call(that, obj, settings, callback);
        },
        //AJAX请求结束后，
        complete: function (xhr, status) {
            try {
                that.loadingController = false;
            } catch (e) {}
            try {
                if (xhr.responseJSON.result == "login-index") {
                    if (window.parent != window) {
                        window.top.location.href = htmlUrl + "/login.html";
                    } else {
                        location.href = htmlUrl + "/login.html";
                    }
                }
            } catch (e) {
                // TODO: handle exception
            };

            !!settings.complete && settings.complete();
        },
        error: function(XHR, textStatus, errorThrown){
            try {
                that.loadingController = false;
            } catch (e) {}
            var switchObj = {
                '0': '请求发生错误，请检查网络及登录状态',
                '401': '访问被拒绝',
                '403': '禁止访问',
                '404': '未找到',
                '405': '方法不被允许',
                '406': '客户端浏览器不接受所请求页面的MIME类型',
                '407': '要求进行代理身份验证',
                '412': '前提条件失败',
                '413': '请求实体太大',
                '414': '请求URI太长',
                '415': '不支持的媒体类型',
                '416': '所请求的范围无法满足',
                '417': '执行失败',
                '423': '锁定的错误',
                '500': '服务器错误',
                '502': 'Web服务器用作网关或代理服务器时收到了无效响应',
                '503': '服务不可用',
                '504': '请求超时，请检查网络'
            };
            ShowMsg.call(that, (XHR.status && switchObj[XHR.status]) ? (XHR.status + '：' + switchObj[XHR.status]) : '请求失败，请重试');

            !!settings.error && settings.error();

            util.throwError({
                settings,
                obj: XHR,
                msg: 'ajax-error'
            });
        }
    })
}

/**
 * ajax code查询
 * @param  {Object}   obj      返回的对象
 * @param  {Object}   settings 接口相关测试（非必须）
 * @param  {Function} callback 回调函数
 * @return {null}            [description]
 */
 window.ajaxResCheck = resCheck

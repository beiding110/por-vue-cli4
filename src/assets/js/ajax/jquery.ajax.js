import Vue from 'vue';
import argsCheck from './args-check';
import resCheck from './res-check';
import interceptorsReq from './interceptors-req';

import util from './util';

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

            ajaxResCheck.call(that, obj, settings, settings.callback);
        },
        //AJAX请求结束后，
        complete: function (xhr, status) {
            try {
                that.loadingController = false;
            } catch (e) {
                // e
            }
            
            settings.complete();
        },
        error: function(XHR, textStatus, errorThrown){
            try {
                that.loadingController = false;
            } catch (e) {
                // e
            }

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
            
            showMsg.call(that, (XHR.status && switchObj[XHR.status]) ? (XHR.status + '：' + switchObj[XHR.status]) : '请求失败，请重试');

            !!settings.error && settings.error();

            util.throwError({
                settings,
                obj: XHR,
                msg: 'ajax-error'
            });
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

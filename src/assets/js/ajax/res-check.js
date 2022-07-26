import { MessageBox as mintMB } from 'mint-ui';
import { MessageBox as eleMB } from 'element-ui';
import router from '@router/index';

import util from './util';

const IS_MOBILE = /iPhone|Android/i.test(window.navigator.userAgent.toLowerCase()),
    IS_NODE = (typeof window === 'undefined'),
    LOGIN_URL = '/login';

var donotShowAgain = false;

function showMB (msg, type, callback) {
    if (donotShowAgain) {
        return;
    }

    var innerCallback = callback || function () { };

    if (IS_NODE) {
        console.error(msg);
    } else if (IS_MOBILE) {
        mintMB.alert(msg, '提示').then(function() {
            innerCallback();
            donotShowAgain = false;
        });
    } else {
        eleMB.alert(msg, {
            type: type || 'warning',
            callback() {
                innerCallback();
                donotShowAgain = false;
            },
            dangerouslyUseHTMLString: true
        });
    }
}

export default function(obj, settings, callback){
    var innerCallback = callback,
        switchObj;

    if (arguments.length === 2) {
        innerCallback = settings;
    }

    switchObj = {
        'v': function() {
            innerCallback && innerCallback(obj.tdata, obj);
            return [obj.tdata, obj];
        },
        'pglist': function() {
            innerCallback && innerCallback(obj);

            return [obj];
        },
        'valerror': function() {
            if (obj.msg) {
                showMB(obj.msg, 'info', function(){});
            }

            util.throwError({settings, obj});
            return [obj];
        },
        'login-index': function() {
            showMB(obj.msg, 'error', function(){
                sessionStorage.clear();

                if (IS_MOBILE) {
                    router.push(LOGIN_URL);
                } else {
                    router.push(LOGIN_URL);
                }
            });
            donotShowAgain = true;
            return [obj];
        },
        'jump-url': function () {
            showMB(obj.msg, 'info', function () {
                router.push(obj.url);
            });
            return [obj];
        },
        'wechat': function() {
            var url = obj.url;

            if (obj.url) {
                if (/http/.test(url)) {
                    window.location.href = obj.url;
                } else if (!new RegExp(url).test(window.location.hash)) {
                    router.push(url);
                }
            }

            return [obj];
        },
        'error': function() {
            if (/(40163)|(40029)/.test(obj.msg)) {
                var href = window.location.href,
                    search = window.location.search;

                window.location.replace(href.replace(search, ''));
            } else {
                showMB(obj.msg, 'error', function(){});
            }

            util.throwError({settings, obj});
            return [obj];
        }
    };

    return switchObj[obj.code]
        ? switchObj[obj.code]()
        : (/^(throw-)/.test(obj.code)
            ? (function(){
                obj.code = obj.code.split('throw-')[1];
                innerCallback && innerCallback(obj);
            }())
            : (function() {
                showMB.call(this, obj.msg, 'error', function () {});
                util.throwError({
                    settings,
                    obj,
                    msg: 'unexpeted ajaxResCheck code'
                });
            }())
        );
}

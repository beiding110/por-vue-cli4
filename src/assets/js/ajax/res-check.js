import router from '@router/index';

import util from './util';
import {showMB, lockMB, unlockMB} from './showMB';

const LOGIN_URL = '/login';

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
            return false;
        },
        'login-index': function() {
            showMB(obj.msg, 'error', function(){
                sessionStorage.clear();

                router.push(LOGIN_URL);

                unlockMB();
            });
            
            lockMB();

            return false;
        },
        'jump-url': function () {
            showMB(obj.msg, 'info', function () {
                router.push(obj.url);
            });
            return false;
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

            return false;
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
            return false;
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

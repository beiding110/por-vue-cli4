import { MessageBox as mintMB } from 'mint-ui';
import { MessageBox as eleMB } from 'element-ui';

const IS_MOBILE = /iPhone|Android/i.test(window.navigator.userAgent.toLowerCase()),
    IS_NODE = (typeof window === 'undefined');

var donotShowAgain = false;

export function showMB (msg, type, callback) {
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

export function lockMB() {
    donotShowAgain = true;
}
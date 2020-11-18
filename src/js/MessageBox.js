import { MessageBox as mintMB, Toast } from 'mint-ui'
import { MessageBox as eleMB, Notification } from 'element-ui';

var isMobile = /iPhone|Android/i.test(window.navigator.userAgent.toLowerCase());

/******************
*** MessageBox 消息弹框
*** msg 提示信息
*** type 消息类型
******************/
window.ShowMsgBox = function(msg, type, callback) {
    callback = callback || function () { }
    if(isMobile){
        mintMB.alert(msg, '提示').then(function(a) {
            callback()
        });
    }else {
        eleMB.alert(msg, {
            type: type || "warning",
            callback: callback,
            dangerouslyUseHTMLString: true
        });
    }
}

/******************
*** Notification 消息通知
*** msg 提示信息
*** type 消息类型
******************/
window.ShowMsg = function(msg, type) {
    if(isMobile){
        Toast({
            message: msg,
            iconClass: !!type ? 'icon icon-' + type : ''
        });
    }else {
        Notification({
            message: msg,
            type: type || "warning"
        });
    }
    //$message({ showClose: true, message: msg, type: type || "warning", duration: 1500 });
}

/**
 * confirm确认选择框
 * @param  {string} msg  提示信息
 * @param  {string} type 提示类型
 * @param  {function} cb1  确认回调
 * @param  {Function} cb2  取消回调
 * @return {null}      无返回值
 */
window.ShowConfirm = function (msg, type, cb1, cb2) {
    cb1 = cb1 || function () {};
    cb2 = cb2 || function () {};

    if(isMobile){
        mintMB.confirm(msg, '提示').then(function(a) {
            cb1()
        });
    }else {
        eleMB.confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type || 'warning',
            showClose: false,
            dangerouslyUseHTMLString: true,
            callback: function (action, instance) {
                if (action == 'confirm') {
                    cb1();
                } else {
                    cb2();
                }
            }
        })
    }
}

import util from './util';
import {showMB, } from './showMB';

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

export default function(XHR, settings) {
    var {data, status, responseJSON} = XHR,
        resMsg,
        msg = (status && switchObj[status]) 
            ? (status + '：' + switchObj[status]) 
            : '请求失败，请重试';

    if (responseJSON) {
        resMsg = responseJSON.msg;
    } else if (data) {
        resMsg = data.msg;
    }

    msg = `${msg}
    ${resMsg}`

    showMB(msg);

    console.log(XHR)

    settings.error && settings.error();

    util.throwError({
        settings,
        obj: XHR,
        msg: 'ajax-error'
    });
}
// 从路由中读取权限信息
import vue from '@/main.js';

/**
 * v-rauth:show="'1'"                                   路由query中show为1时展示
 * v-rauth:show="'not:1'"                               路由query中show不为1时展示
 * v-rauth:show="['1', '2', 'not:3']"                   路由query中show为1或2或不为3时展示
 * v-rauth="{show: '1', name:'admin'}"                  路由query中show为1，name为admin时展示
 * v-rauth="{show:['1', '2', 'not:3'], name:'admin'}"   路由query中同时满足时展示
 */

function hasAuth(state, key) {
    const query = vue.$route.query;

    // v-rauth:state
    if (state) {
        if (typeof(key) === 'string') {
            if (/not:/.test(key)) {
                // v-rauth:state = "'not:key'"\

                let v = key.replace(/^not:/, '');

                return query[state] !== v;
            }
            
            // v-rauth:state = "'key'"
            return query[state] === key;
        } else if (Array.isArray(key)) {
            // v-rauth:state="['key1','not:key2']"
            return key.some(k => {
                return hasAuth(state, k);
            });
        }
    }

    // v-rauth="{key1:value1, key2,value2}"
    if (typeof(key) === 'object') {
        var keynames = Object.keys(key);

        return keynames.every(k => {
            return hasAuth(k, key[k]);
        });
    }

    console.error('v-rauth绑定的值应为‘string’或‘Object’，请检查是否正确');
    return false;
}

function removeEl(el) {
    try {
        el.parentNode && el.parentNode.removeChild(el);
    } catch (e) {
        // e
    }
}

export default {
    //指令第一次绑定到元素时
    bind: (el, {arg, value}) => {
        el.style.display = 'none';
        
        if (!hasAuth(arg, value)) {
            removeEl(el);
        } else {
            el.style.display = '';
        }
    },
    //被绑定元素插入父节点时
    inserted: (el, {arg, value}) => {
        if (!hasAuth(arg, value)) {
            removeEl(el);
        }
    },
    update: (el, {arg, value}) => {
        if (!hasAuth(arg, value)) {
            removeEl(el);
        }
    },
};
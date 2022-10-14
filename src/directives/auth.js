import store from '@store';

function hasAuth(state, key) {
    const map = store.state.userinfo.auth[state] || {};

    return map[key];
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
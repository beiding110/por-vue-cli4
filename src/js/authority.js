import Vue from 'vue'
import store from '@store'

function isAdmin() {
    return store.getters.user.isadmin === '1';
};

const $au = {
    isAdmin,
    isAdder(row) {
        return store.getters.user.userid === row.adduserid;
    }
};
Vue.prototype.$au = $au;

Vue.directive('admin', {
    //指令第一次绑定到元素时
    bind: (el) => {
        el.style.display = 'none';
        if(!isAdmin()) {
            el.parentNode && el.parentNode.removeChild(el)
        } else {
            el.style.display = '';
        };
    },
    //被绑定元素插入父节点时
    inserted: (el) => {

    },
    update: (el, binding, vnode) => {
        if(!isAdmin()) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
});

export default $au

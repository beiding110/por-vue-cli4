import store from '@store/index';

export default {
    state: {
        navDropDown: [
            {
                text: '退出登录',
                icon: 'el-icon-switch-button',
                command: 'logout',
            },
        ],
        nav: [
            {
                text: '项目列表',
                id: '001',
                url: '/teamwork/project/list',
                imgpath: '&#xe60e;'
            }
        ],
    },
    getters: {
        
    },
    mutations: {
        setNavDeopDown(state, val) {
            state.navDropDown = val;
        },
        setNav(state, val) {
            state.nav = val;
        },
    },
    actions: {
        getMenu({commit, state}) {
            // Vue.prototype.$get(`${store.getters.sysUrl}/menu/list`, data => {
            //     commit('setNavList', data);
            // });
        },
        updateNavDropDown({commit, state}, {user}) {
            // commit('setNavDropDown', []);
        },
    },
}
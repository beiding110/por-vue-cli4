import vue from '@/main';

import router from '@router/index';
import store from '@store/index';
import {getKeyFromAllState} from '../tools.js';

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
        subLayout() {
            var subLayout = getKeyFromAllState('$layout', store);

            return subLayout;
        },
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
            // vue.$get(`${store.getters.userUrl}/login-info/menu`, (data) => {
            //     commit('setNav', data);

            //     if (!data.length) {
            //         var msg = vue.$t(
            //             'your_org_admin_has_not_assigned_you_permission'
            //         );

            //         showMsgBox(msg);

            //         return;
            //     }

            //     if (goto) {
            //         // 立刻跳转

            //         function getFirst(arr) {
            //             let first = arr[0];

            //             if (first.children) {
            //                 return getFirst(first.children);
            //             }

            //             return first;
            //         }

            //         var firstUrl = getFirst(data).menuUrl;

            //         router.replace(firstUrl);
            //     }
            // });
        },
        clearMenu({ commit }) {
            commit('setNav', []);
        },
        updateNavDropDown({ commit, state }, { user }) {
            // commit('setNavDropDown', []);
        },
    },
}
import Vue from 'vue'
import router from '@router/index'
import store from '@store/index'

export default {
    // namespaced: true,
    state: {
        bread: [],

        system: 'views',
        navDropDown: [
            {
                text: '退出登录',
                icon: 'el-icon-switch-button',
                command: () => {
                    Vue.prototype.$get(`${store.getters.sysUrl}/logout`, () => {
                        router.push('/login');
                        store.commit('setUser', {});
                        store.commit('setSystem', {});
                    });
                }
            }
        ]
    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        },
        setBread(state, n) {
            state.bread = n;
        }
    },
    actions: {
        login({commit, getters, state, dispatch}, {loginname, pwd}) {
            if (loginname == '' || loginname == undefined) {
                ShowMsg('请输入账号', 'error')
            } else if (pwd == '' || pwd == undefined) {
                ShowMsg('请输入密码', 'error')
            } else {
                Vue.prototype.$post(`/pms/login`, {
                    loginname: loginname,
                    pwd: pwd
                }, function (data, res) {
                    store.commit('setUser', data.user);

                    store.commit('setSystem', {
                        type: state.system,
                        api: store.getters.ageUrl
                    });

                    dispatch('getMenu');

                    router.replace('/teamwork/project/list');
                });
            };
        },
        queryUserInfo({state, dispatch}, requery) {
            // if(!requery) {
            //     var userInfo = store.getters.user;
            //     if(Object.keys(userInfo).length) {
            //         dispatch('updateNavDropDown', userInfo);
            //         return;
            //     };
            // };

            // Vue.prototype.$get(`${store.getters.ageUrl}/getuserinfo`, data => {
            //     store.commit('setUser', data);
            //     store.commit('setSystem', {
            //         type: state.system,
            //         api: store.getters.ageUrl
            //     });

            //     dispatch('updateNavDropDown', data);
            //     dispatch('getMenu');
            // });
        },
        getMenu({commit, state}) {
            // Vue.prototype.$get(`${store.getters.ageUrl}/tree/get_menu.json`, data => {
            //     commit('setNavList', data);
            // });
        },
        updateNavDropDown({commit, state}, {user}) {
            // commit('setNavDropDown', []);
        }
    }
}

import Vue from 'vue'
import router from '@router/index'
import store from '@store/index'

export default {
    // namespaced: true,
    state: {
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
    },
    actions: {
        login({commit, getters, state, dispatch}, form) {
            Vue.prototype.$post(`/pms/login`, form, function (data, res) {
                store.commit('setUser', data.user);

                store.commit('setSystem', {
                    type: state.system,
                });

                dispatch('getMenu');

                router.replace('/teamwork/project/list');
            });
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
            // Vue.prototype.$get(`${store.getters.sysUrl}/menu/list`, data => {
            //     commit('setNavList', data);
            // });
        },
        updateNavDropDown({commit, state}, {user}) {
            // commit('setNavDropDown', []);
        }
    }
}

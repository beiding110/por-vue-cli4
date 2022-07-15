import Vue from 'vue'
import router from '@router/index'
import store from '@store/index'

import storage from '@js/storage.js'

export default {
    state: {
        user: storage.getSession('user') || {}
    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        },
        setUser(state, n) {
            state.user = n;
            storage.setSession('user', n);
        }
    },
    actions: {
        login({commit, getters, state, dispatch}, form) {
            Vue.prototype.$post(`/pms/login`, form, function (data, res) {
                store.commit('setUser', data.user);

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

            //     dispatch('updateNavDropDown', data);
            //     dispatch('getMenu');
            // });
        },
        updateNavDropDown({commit, state}, {user}) {
            // commit('setNavDropDown', []);
        },
    },
}

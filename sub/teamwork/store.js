import Vue from 'vue';
import router from '@router/index';
import store from '@store/index';

export default {
    namespaced: true,
    state: {
        name: 'this is teamwork`s store name',
    },
    getters: {},
    mutations: {
        setState: function (state, n) {
            mixin(n, state, true);
        },
    },
    actions: {
        login({ commit, getters, state, dispatch }, form) {
            Vue.prototype.$post(`/pms/login`, form, function (data, res) {
                store.commit('setUser', data.user);

                // dispatch('getMenu');

                store.commit('setNav', [
                    {
                        text: '项目列表',
                        id: '001',
                        url: '/teamwork/project/list',
                        imgpath: '&#xe60e;',
                    },
                    {
                        text: '子项目创建的导航',
                        id: '001',
                        url: '/teamwork/project/list',
                        imgpath: '&#xe60e;',
                    },
                ]);

                router.replace('/teamwork/project/list');
            });
        },
    },
};

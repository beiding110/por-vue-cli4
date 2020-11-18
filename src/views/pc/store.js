import Vue from 'vue'
import router from '@router/index'
import store from '@store/index'

export default {
    // namespaced: true,
    state: {
        bread: [],

        system: 'pc',
        navDropDown: [
            {
                text: '退出登录',
                icon: 'el-icon-switch-button',
                command: () => {
                    Vue.prototype.$get(`${store.getters.sysUrl}/logout`, () => {
                        router.push('/pc/login');
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
        login({commit, getters, state}, {loginname, pwd}) {
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
                        type: state.system
                    });

                    router.replace('/pc/teamwork/project/list');
                });
            };
        },
        queryUserInfo() {
            // var userInfo = store.getters.user;
            // if(Object.keys(userInfo).length) return;
            //
            // Vue.prototype.$get(`${store.getters.ageUrl}/getuserinfo`, data => {
            //     store.commit('setUser', data);
            // });
        }
    }
}

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { sub, subModules } from './tools.js';

import userinfo from './modules/userinfo.js';
import api from './modules/api.js';
import dictionary from './modules/dictionary.js';
import system from './modules/system.js';
import tagNav from './modules/tag-nav.js';
import bread from './modules/bread.js';
import config from './modules/config.js';
import layout from './modules/layout.js';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        userinfo,
        api,
        dictionary,
        system,
        tagNav,
        bread,
        config,
        layout,

        ...subModules,
        ...sub,
    },
});

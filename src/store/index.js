import Vue from 'vue'
import Vuex from 'vuex'
import _ from './tools.js'

import user from './modules/user.js'
import api from './modules/api.js'
import dictionary from './modules/dictionary.js'
import system from './modules/system.js'
import tagNav from './modules/tag-nav.js'
import bread from './modules/bread.js'

const {modules, getters} = _.init({
    modules: [{user}, {api}, {dictionary}, {system}, {tagNav}, {bread }]
});

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    getters: (function() {
        return _.mixin(getters, {

        });
    }()),
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    },
    modules
});

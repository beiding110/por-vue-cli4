var state = window.$_plat_config;

export default {
    state,
    getters: {
        
    },
    mutations: {
        setState(state, n) {
            state = n;
        },
    },
    actions: {
        update({commit}) {
            var state = window.$_plat_config; 

            commit('setState', state);
        },
    },
}

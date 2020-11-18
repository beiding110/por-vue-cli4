import storage from '@js/storage.js'

export default {
    state: {
        system: storage.getSession('system') || {}
    },
    getters: {

    },
    mutations: {
        setSystem: function(state, n){
            state.system = n;
            storage.setSession('system', n);
        }
    }
}

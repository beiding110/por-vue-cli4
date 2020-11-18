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
    }
}

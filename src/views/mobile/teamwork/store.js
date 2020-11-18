export default {
    state: {

    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}

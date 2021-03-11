export default {
    state: {
        bread: []
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
    }
}

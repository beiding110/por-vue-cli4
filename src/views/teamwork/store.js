export default {
    state: {
        name: 'this is teamwork`s store name'
    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}

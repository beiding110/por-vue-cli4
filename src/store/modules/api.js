import apiMap from '@/api/index.js'

export default {
    state: apiMap,
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}

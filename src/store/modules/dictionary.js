import axios from 'axios'

export default {
    state: {
        dictionary: {

        }
    },
    getters: {

    },
    mutations: {
        setDictionary (state, n){
            mixin(n, state.dictionary, true);
        }
    },
    actions: {
        getDictionary ({ commit, state }, { key, url, data }) {
            if(state.dictionary[key]){
                 return new Promise((resolve, reject) => {
                     resolve();
                 });
            };
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    params: data
                }).then(({status, data}) => {
                    if(status === 200 || status === '200') {
                        if(data.code === 'v') {
                            var setObj = {};
                            setObj[key] = data.tdata
                            commit('setDictionary', setObj);
                            resolve();
                        }
                    }
                });
            })
        }
    }
}

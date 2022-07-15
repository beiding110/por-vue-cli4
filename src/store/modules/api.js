import config from './config';

var apiMap = config.state.api;

var getters = Object.keys(apiMap).reduce((obj, key) => {
    obj[key] = state => state[key];

    return obj;
}, {});

export default {
    state: apiMap,
    getters,
    mutations: {
        
    }
}

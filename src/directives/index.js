import auth from './auth.js';
import rauth from './rauth.js';

export default {
    install: function(Vue){
        Vue.directive('auth', auth);
        Vue.directive('rauth', rauth);
    }
};
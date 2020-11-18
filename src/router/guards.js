import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../store/index'

export default function(router) {
    router.beforeEach(function(to, from, next){
        NProgress.start();

        document.title = to.meta.title || '';
        store.commit('setBread', to.meta.bread || []);

        next();
    });

    router.afterEach(function(){
        NProgress.done();
    });
}

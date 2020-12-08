import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../store/index'
import CONFIG from '../config'

export default function(router) {
    router.beforeEach(function(to, from, next){
        NProgress.start();

        //设置面包屑
        var title = to.meta.title;
        document.title = `${title ? (title + '·') : ''}${CONFIG.router['title']}`;
        store.commit('setBread', to.meta.bread || []);

        //设置tag导航
        store.dispatch('routeToggleTagNav', to);

        next();
    });

    router.afterEach(function(){
        NProgress.done();
    });
}

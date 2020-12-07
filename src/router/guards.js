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
        if(to.meta.bread) {
            if(store.getters.tagNav_tagNavList.some(navItem => {
                return to.meta.bread.some(breadItem => {
                    return navItem.path === breadItem.path;
                });
            }) || store.getters.tagNav_tagNavList.some(navItem => {
                return navItem.meta.bread.some(breadItem => {
                    return to.path === breadItem.path;
                });
            })) {
                store.commit('updataTagNav', to);
            } else {
                if(to.meta.tagNav) {
                    store.commit('addTagNav', to);
                };
            }
        };

        next();
    });

    router.afterEach(function(){
        NProgress.done();
    });
}

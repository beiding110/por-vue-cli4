import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../../store/index'

export default function(router) {
    router.beforeEach(function(to, from, next){
        NProgress.start();

        //设置面包屑
        var title = to.meta.title;
        document.title = `${title ? (title + '·') : ''}${store.state.config.title}`;
        // store.commit('setBread', to.meta.bread || []);
        store.commit('updateBread', {to, from});

        //设置tag导航
        store.dispatch('routeToggleTagNav', to);

        next();
    });

    router.afterEach(function(){
        NProgress.done();
    });
}

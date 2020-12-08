import storage from '@js/storage.js'

function mapObj(obj) {
    var whiteList = ['fullPath', 'hash', 'meta', 'name', 'params', 'path', 'query'];
    var clone = {};

    whiteList.forEach(item => {
        clone[item] = obj[item];
    });

    return clone;
};

var innerList = storage.getSession('tagNavList') || [];

export default {
    state: {
        tagNavList: storage.getSession('tagNavList') || []
    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        },
        setTagNavList(state, n) {
            state.tagNavList = n;
            innerList = n;
            storage.setSession('tagNavList', n);
        },
        addTagNav(state, n) {
            var item = mapObj(n);
            if(~state.tagNavList.indexOf(item)) return;
            if(state.tagNavList.some(item => {
                return item.fullPath === n.fullPath;
            })) return;

            state.tagNavList.push(item);
            innerList.push(item);

            storage.setSession('tagNavList', innerList);
        },
        popTagNav(state, n) {
            var index;
            var item = mapObj(n);

            if(typeof(n) === 'object') {
                index = state.tagNavList.indexOf(item);
            } else {
                index = n;
            };

            state.tagNavList.splice(index, 1);
            innerList.splice(index, 1);

            storage.setSession('tagNavList', innerList);
        },
        updataTagNav(state, n) {
            var index = 0,
                item = mapObj(n);
                
            n.meta.bread.forEach(item => {
                innerList.forEach((innerItem, innerIndex) => {
                    if(item.path === innerItem.path) {
                        index = innerIndex;
                    }
                })
            });

            innerList.splice(index, 1, item);
            state.tagNavList.splice(index, 1, item);

            storage.setSession('tagNavList', innerList);
        }
    },
    actions: {
        routeToggleTagNav({ getters, commit }, to) {
            if(to.meta.bread) {
                if(getters.tagNavList.some(navItem => {
                    return to.meta.bread.some(breadItem => {
                        return navItem.path === breadItem.path;
                    });
                }) || getters.tagNavList.some(navItem => {
                    return navItem.meta.bread.some(breadItem => {
                        return to.path === breadItem.path;
                    });
                })) {
                    commit('updataTagNav', to);
                } else {
                    if(to.meta.tagNav) {
                        commit('addTagNav', to);
                    };
                }
            }
        },
    }
}

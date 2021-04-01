import storage from '@js/storage.js'

const BLACK_LIST = ['/iframe'];

function setData(n) {
    this.bread = n;
    storage.setSession('bread', n);
}

export default {
    state: {
        bread: storage.getSession('bread') || []
    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        },
        setBread(state, n) {
            state.bread = n;
        },
        updateBread(state, {to, from}) {
            if(~BLACK_LIST.indexOf(to.path)) {
                return;
            }

            const path = to.path;
            const fullPath = to.fullPath;
            const meta = to.meta || {};
            const title = meta.title;

            var bread = state.bread;

            var newBreadItem = {
                title,
                path: fullPath
            };

            if(!meta.bread || meta.bread.length < 2) {
                bread = [];
            }

            if(bread.length) {
                var last = bread.slice(-1)[0];

                var lastPath = last.path.split('?')[0];
                if(lastPath === path) {
                    bread.splice(-1, 1, newBreadItem);

                    setData.call(state, bread);

                    return;
                }

                var repeatIndex = 0;
                if(bread.some((item, index) => {
                    repeatIndex = index;
                    return (
                        item.path === fullPath
                        && item.title === title
                    );
                })) {
                    bread.splice(repeatIndex);
                    setData.call(state, bread);
                }
            }

            bread.push(newBreadItem);

            setData.call(state, bread);
        },
        pushBread(state, {path, title, query}) {
            var pathNoSearch = path.split('?')[0];

            if(!~BLACK_LIST.indexOf(pathNoSearch)) {
                return;
            }

            var fullPath = path + (query ? toSearch(query) : '')

            var bread = state.bread;

            bread.push({
                title,
                path: fullPath
            });

            setData.call(state, bread);
        }
    }
}

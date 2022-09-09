function mixin(obj, target, state) {
    obj = obj || {};
    Object.keys(obj).forEach(function (key) {
        if (state) {
            target[key] = obj[key];
        } else {
            if (!target[key]) target[key] = obj[key];
        }
    });
    return target;
}

export function initMainModel() {
    var modules_res = {};

    // 注册包中的store和getter
    const indexFiles = require.context('./modules', true, /\.js$/),
        moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
            var moduleName = modulePath.slice(2,-3);

            const value = indexFiles(modulePath);
            modules[moduleName] = value.default;

            return modules;
        }, {});

    mixin(moduleIndexs, modules_res);

    return modules_res;
}

export var model = initMainModel();

export function initSub() {
    var modules_res = {};

    // 注册包中的store和getter
    const indexFiles = require.context('@sub', true, /\/store\.js$/),
        moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
            var moduleName = modulePath.split('/').slice(-2, -1)[0];

            moduleName = moduleName === '.' ? 'sub' : moduleName;

            const value = indexFiles(modulePath);
            modules[moduleName] = value.default;

            return modules;
        }, {});

    mixin(moduleIndexs, modules_res);

    return modules_res;
}

export var sub = initSub();

export function initSubModules() {
    var modules_res = {};

    // 注册包中的store和getter
    const indexFiles = require.context('@submodules', true, /\/store\.js$/),
        moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
            var moduleName = modulePath.split('/').slice(-2, -1)[0];

            moduleName = moduleName === '.' ? 'sub-modules' : moduleName;

            const value = indexFiles(modulePath);
            modules[moduleName] = value.default;

            return modules;
        }, {});

    mixin(moduleIndexs, modules_res);

    return modules_res;
}

export var subModules = initSubModules();

/**
 * 获取所有命名空间下的关键字state，并将结果合并
 * @param {String} target 键名
 * @param {Object} store vuex实例
 * @returns 合并好的对象
 */
export function getKeyFromAllState(target, store) {
    var state = store.state,
        cache = [],
        res = {};

    function getType(val) {
        return Object.prototype.toString.call(val).toLowerCase().slice(8, -1);
    }

    // 获取到所有命名空间中的关键字
    Object.keys(state).forEach(key => {
        let item = state[key][target];

        if (item) {
            cache.push(item);
        }
    });

    // 对关键字进行合并
    cache.forEach(cacheItem => {
        Object.keys(cacheItem).forEach(cacheItemKey => {
            var currentInRes = res[cacheItemKey],
                current = cacheItem[cacheItemKey];

            if (getType(current) === 'array') {
                current = current.filter(item => {
                    if (item.show) {
                        var f = new Function(item.show);
        
                        if (f.call(store)) {
                            return true;
                        }

                        return false;
                    }

                    return true;
                });
            }

            if (currentInRes) {
                if (getType(current) === 'array') {
                    res[cacheItemKey] = [
                        ...currentInRes,
                        ...current,
                    ];
                } else if (getType(current) === 'object') {
                    res[cacheItemKey] = {
                        ...currentInRes,
                        ...current,
                    };
                } else {
                    res[cacheItemKey] = current;
                }
            } else {
                res[cacheItemKey] = current;
            }
        });
    });

    return res;
};
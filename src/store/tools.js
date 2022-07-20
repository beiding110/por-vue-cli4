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
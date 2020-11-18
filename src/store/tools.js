function mixin(obj, target, state) {
    obj = obj || {};
    Object.keys(obj).forEach(function (key) {
        if (state) {
            target[key] = obj[key];
        } else {
            if (!target[key])
                target[key] = obj[key];
        }
    });
    return target;
};

// 自动生成getters时，不增加model前缀的目录
const FILES_IN_MODULES = require.context('./modules', false, /\.js$/);
const PRE_NAME_EXCEPT = FILES_IN_MODULES.keys().reduce((modules, modulePath) => {
    const FILE_NAME = modulePath.slice(2, -3);
    modules.push(FILE_NAME);
    return modules;
}, []);

/**
 * 自动生成全局getters
 * @param  {Object} state     state对象
 * @param  {String} modelName store模块名称
 * @return {Object}           生成的全局getters
 */
function autoGetters(state, modelName) {
    var getters = {};
    Object.keys(state).forEach(key => {
        if(PRE_NAME_EXCEPT.some(item => {
            return item === modelName
        })) {
            getters[key] = (state) => state[modelName][key];
        } else {
            getters[`${modelName}_${key}`] = (state) => state[modelName][key];
        };
    });
    return getters;
};

export default {
    mixin,
    init: ({modules}) => {
        var getters_res = {},
            modules_res = {};

        modules.forEach(item => {
            mixin(item, modules_res);
            Object.keys(item).forEach(key => {
                mixin(autoGetters(item[key].state, key), getters_res);
            });
        });

        // 注册包中的store和getter
        const indexFiles = require.context('@views', true, /\/store\.js$/);
        const moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
            const moduleName = modulePath.split('/').slice(-2, -1)[0];
            const value = indexFiles(modulePath);
            modules[moduleName] = value.default;

            mixin(autoGetters(value.default.state, moduleName), getters_res);
            return modules
        }, {});
        mixin(moduleIndexs, modules_res);

        return {
            modules: modules_res,
            getters: getters_res
        }
    },
    autoGetters
}

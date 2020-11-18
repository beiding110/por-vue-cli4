function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export default {
    init: () => {
        var indexRoutes = [];

        // 注册包中的store和getter
        const indexFiles = require.context('@views', true, /\/router\.js$/);
        indexFiles.keys().forEach((modulePath) => {
            // const moduleName = modulePath.split('/').slice(-2, -1)[0];
            const value = indexFiles(modulePath);
            indexRoutes.push(value.default);
        });

        return indexRoutes
    }
}

/**
 * 生成pc目录的router数组
 * @return {Array} 生成的router数组
 */
export function initPcRouter() {
    var indexRoutes = [];

    // 注册包中的store和getter
    const indexFiles = require.context('@views/pc', true, /\/router\/index\.js$/);
    indexFiles.keys().forEach((modulePath) => {
        const value = indexFiles(modulePath);
        if(getType(value.default) === 'object') {
            indexRoutes.push(value.default);
        } else if(getType(value.default) === 'array') {
            indexRoutes.push.apply(indexRoutes, value.default);
        }
    });

    return indexRoutes
};

/**
 * 生成mobile目录的router数组
 * @return {Array} 生成的router数组
 */
export function initMobileRouter() {
    var indexRoutes = [];

    // 注册包中的store和getter
    const indexFiles = require.context('@views/mobile', true, /\/router\/index\.js$/);
    indexFiles.keys().forEach((modulePath) => {
        const value = indexFiles(modulePath);
        if(getType(value.default) === 'object') {
            indexRoutes.push(value.default);
        } else if(getType(value.default) === 'array') {
            indexRoutes.push.apply(indexRoutes, value.default);
        }
    });

    return indexRoutes
};

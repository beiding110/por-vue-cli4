function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 生成views目录的router数组
 * @return {Array} 生成的router数组
 */
export function initRouter() {
    var indexRoutes = [];

    // 注册包中的store和getter
    const indexFiles = require.context('@sub/', true, /\/router\/index\.js$/);

    indexFiles.keys().forEach((modulePath) => {
        const value = indexFiles(modulePath);

        if (getType(value.default) === 'object') {
            indexRoutes.push(value.default);
        } else if (getType(value.default) === 'array') {
            indexRoutes.push.apply(indexRoutes, value.default);
        }
    });

    return indexRoutes;
}

export var indexs = initRouter();
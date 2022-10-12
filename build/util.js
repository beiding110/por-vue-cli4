const path = require('path');
var fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir);
};

exports.forEachKey = function (obj, cb) {
    Object.keys(obj).forEach((key) => {
        cb(key, obj[key]);
    });
};

/**
 * 获取变量类型
 * @param {All} obj
 */
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 获取目标路径下目标名称的文件路径
 * @param {String} url
 * @param {Regexp|String} ext
 */
function getFiles(url, ext) {
    var resArr = [];
    const filesInUrl = fs.readdirSync(url);
    filesInUrl.forEach((file) => {
        const currentPath = `${url}/${file}`;
        const fileInfo = fs.statSync(currentPath);

        if (getType(ext) === 'string') {
            if (file === ext) {
                resArr.push(path.resolve(__dirname, currentPath));
            }
        } else if (getType(ext) === 'regexp') {
            if (file.match(ext))
                resArr.push(path.resolve(__dirname, currentPath));
        }

        if (fileInfo.isDirectory()) {
            resArr.push.apply(resArr, getFiles(currentPath + '/', ext));
        }
    });

    return resArr;
}

/**
 * 自动生成static文件夹的CopyWebpackPlugin
 */
exports.buildStaticPlugin = (url) => {
    const PATH_NAME = '/sub',
        FOLDER_NAME = 'static',
        STATIC_FOLDERS = getFiles(
            path.resolve(__dirname, `..${PATH_NAME}`),
            FOLDER_NAME
        );

    var resArr = STATIC_FOLDERS.reduce((arr, folder) => {
        folder = folder.replace(/\\/g, '/');

        let folder_useful_path = folder.split(PATH_NAME)[1],
            to_path = folder_useful_path.replace(FOLDER_NAME, '').slice(0, -1);

        arr.push(
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, folder),
                    to: `${url}/${to_path}`,
                    ignore: ['.*'],
                },
            ])
        );

        return arr;
    }, []);

    return resArr;
};

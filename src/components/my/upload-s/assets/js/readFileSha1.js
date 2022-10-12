import CryptoJS from 'crypto-js';

// 分片读取，如果大文件整体读取，浏览器可能崩溃
const READ_CHUNK_SIZE = 50 * 1024 * 1024;

export default function(file, cb) {
    const FILE_SIZE = file.size;

    // 参数增加sha1校验码
    let chunkIndex = 0,
        chunkReadDone = false,

        fileReader = new FileReader(),
        hasher = CryptoJS.algo.SHA1.create(),
        sha1;

    function readByCheap() {
        let start = chunkIndex * READ_CHUNK_SIZE,
            end = (chunkIndex + 1) * READ_CHUNK_SIZE,
            cheap;

        if (end > FILE_SIZE) {
            end = FILE_SIZE;
            chunkReadDone = true;
        } else {
            chunkReadDone = false;
        }

        cheap = file.slice(start, end);

        fileReader.readAsArrayBuffer(cheap);

        chunkIndex ++;
    }

    fileReader.onload = function() {
        let result = this.result,
            i8a = new Uint8Array(result),
            tmpWordArray = CryptoJS.lib.WordArray.create(i8a, i8a.length);

        hasher.update(tmpWordArray);

        if (chunkReadDone) {
            sha1 = hasher.finalize().toString(CryptoJS.enc.Base64);

            fileReader = hasher = result = i8a = tmpWordArray = null;

            cb && cb(sha1);
        } else {
            result = i8a = tmpWordArray = null;

            readByCheap();
        }
    };

    // fileReader.readAsArrayBuffer(file);

    readByCheap();
}
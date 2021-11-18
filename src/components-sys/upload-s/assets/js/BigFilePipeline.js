import fileCheap from './file-cheap';
import Chain from './Chain';

function BigFilePipeline( options) {
    this.init(options);
}

BigFilePipeline.prototype = {
    /**
     * 
     * @param {Object} options 默认element上传options
     */
    init(options) {
        this.$options = options;
        this.optionsBuffer = [];
        this.$progress = 0;
    },

    /**
     * 
     * @param {Function} cb 设置切片请求函数
     * @returns 
     */
    cheapReq(cb) {
        this.$request = cb;

        return this;
    },

    /**
     * 
     * @param {String} url 设置大文件请求接口
     * @returns 
     */
    setAction(url) {
        this.$options.action = url;
        
        return this;
    },

    onProgress(fn) {
        this._onprogress = fn;

        return this;
    },

    updateProcess(val) {
        this.$progress = Math.floor(val);

        this._onprogress(this.$progress);
    },

    /**
     * 执行主要函数
     */
    run() {
        this.updateProcess(0);

        new Chain().link(next => {
            fileCheap(this.$options, (buffer) => {
                this.optionsBuffer = buffer;
                this.updateProcess(20);

                next();
            });
        }).link(next => {
            var chunksLength = this.optionsBuffer.length;

            this.optionsBuffer.forEach((item, index) => {
                let onSuccess = item.onSuccess;

                item.data.chunks = chunksLength;
                item.data.chunk = index;

                // item.onSuccess = function (...args) {
                //     var nextIndex = index + 1;

                //     if (nextIndex === chunksLength) {
                //         onSuccess(...args);
                //     } else {
                //         cb && cb(this.optionsBuffer[nextIndex]);
                //     }
                // };

                item.onSuccess = (...args) => {
                    item._done = true;

                    this.updateProcess(this.$progress + (80 / chunksLength));

                    if (this.optionsBuffer.every(bufferItem => bufferItem._done)) {
                        onSuccess(...args);
                    }
                };

                this.$request && this.$request(item);
            });

            next();
        }).link(() => {
            // this.$success(this.optionsBuffer[0]);
        }).run();
    }
};

export default BigFilePipeline;
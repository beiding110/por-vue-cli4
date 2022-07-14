<template>
    <div class="upload-s">
        <div
        class="upload-s"
        v-loading="loadingController"
        :element-loading-text="loadingText"
        >
            <file-list
            class="list"
            :data="fileList"
            :action="actionModel"
            @del="handleDelete($event.data, $event.index)"
            :size="sizeModel"
            >
                <el-upload
                ref="upload"
                v-if="uploadBtnShow"
                class="uploader"
                :action="actionModel.upload"
                :show-file-list="false"
                :data="extraData"
                :on-exceed="handleExceed"
                :before-upload="beforeAvatarUpload"
                :on-success="onSuccess"
                :on-error="onError"
                :limit="limit"
                :accept="filetype"
                :http-request="httpUploadHandler"
                multiple
                >
                    <i 
                        class="el-icon-plus uploader-icon"
                        :style="{width:sizeModel,height:sizeModel,lineHeight:sizeModel}"
                    ></i>

                    <slot name="tip" slot="tip">
                        <div class="el-upload__tip" v-if="tipText">
                            {{tipText}}
                        </div>
                    </slot>
                </el-upload>
            </file-list>
        </div>

        <div 
        class="progress-con"
        v-if="loadingBarShowController"
        >
            <el-progress 
                class="bigfile-percent"
                type="circle" 
                :percentage="percent"
                :width="progressWidth"
            ></el-progress>
        </div>
    </div>
</template>

<script>
import FileList from './components/file-list';

import ajax from './ajax';
import BigFilePipeline from './assets/js/BigFilePipeline';
import debounce from './assets/js/debounce';
import Chain from './assets/js/Chain';

export default {
    components: {
        FileList
    },
    props: {
        folder: {
            // 附件上传后存放的位置
            type: String,
            default: 'manage'
        },
        filetype: {
            type: String,
            default: ''
        },
        fileguid: {
            type: String,
            default: '',
            required: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
        limit: {
            // 最大允许上传个数
            type: Number,
        },
        filesize: {
            type: Number,
            default: 0
        },
        single: {
            type: Boolean,
            default: false
        },
        extra: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Array,
            default: () => [],
        },
        size: {
            type: [String,Number],
            default: 178,
        },
        onFileSelect: {
            type: [Boolean, Function],
            default: false,
        },
    },
    data: function () {
        return {
            // 已上传文件列表
            fileList: [],

            // 上传进度
            percent: 0,
            percentStatus: '',

            // 附件加载进度
            loadingController: false,
            loadingText: '附件内容更新中',

            loadingBarShowController: false,

            // 大文件分包大小
            chunkSize: 5 * 1024 * 1024,

            // 防抖弹窗集合
            debounceDialogs: {},

            // 上传成功的暂存文件
            successCache: [],
        };
    },
    computed: {
        actionModel() {
            return {
                upload: `${this.getGetters('fileUrl')}/upload/${this.folder}/common.json`,
                uploadL: `${this.getGetters('fileUrl')}/upload/${this.folder}/bigfileup.json`,
                list: `${this.getGetters('fileUrl')}/operate/getlist.json`,
                del: `${this.getGetters('fileUrl')}/operate/delete.json`,
                download: `${this.getGetters('fileUrl')}/download/common.do`,
                preview: `${this.getGetters('fileUrl')}/open/look.do`,
            };
        },
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        tipText() {
            var str = [];

            if (this.filetype) {
                str.push(`只能上传${this.filetype}文件`);
            }

            if (this.filesize) {
                str.push(`单个文件大小不能超过${this.filesize}M`);
            }

            if (this.limit) {
                str.push(`最多上传${this.limit}个`);
            }

            return str.join('，');
        },
        extraData: function () {
            var extra = {
                fileguid: this.fileguid,
                single: (this.single * 1),
            };

            mixin(this.extra, extra, true);

            return extra;
        },
        pathSupply() {
            return /micromessenger/i.test(navigator.userAgent) ? '?mp.wexin.qq.com' : '';
        },
        uploadBtnShow() {
            if (this.readonly) {
                return false;
            }

            if (this.single) {
                return !this.fileList.length;
            }

            if (this.limit) {
                return this.fileList.length < this.limit;
            }

            return true;
        },
        sizeModel() {
            return /px/.test(this.size) ? this.size : `${this.size}px`;
        },
        exist() {
            return (this.fileList.length > 0 && !this.loadingBarShowController);
        },
        uploaderInnerFiles() {
            return this.$refs.upload.uploadFiles.length;
        },
        progressWidth() {
            return this.size - 30;
        },
        computeLimit() {
            var limit = false;

            if (this.limit) {
                limit = this.limit;
            }

            if (this.single) {
                limit = 1;
            }

            return limit;
        },
    },
    watch: {
        fileguid: function (e) {
            if (e) {
                this.getFileList();
            }
        },
        extra: {
            handler(n, o) {
                if (JSON.stringify(n) !== JSON.stringify(o)) {
                    this.getFileList();
                }
            }, deep: true
        },
        filetype() {
            this.updateDebounceDialogs();
        },
        limit() {
            this.updateDebounceDialogs();
        },
        filesize() {
            this.updateDebounceDialogs();
        }
    },
    provide() {
        return {
            readonly: this.readonly,
        };
    },
    methods: {
        /**
         * 获取文件列表
         */
        getFileList: function () {
            if (!this.fileguid) return;
            if (this.loadingController) return;

            this.loadingShow('附件内容更新中');

            this.$ajax({
                url: this.actionModel.list,
                data: {
                    ...this.extra,
                    fileguid: this.fileguid,
                },
                callback: data => {
                    this.fileList = data || [];
                    
                    this.fileListUpdateHandler();
                },
                complete: () => {
                    this.loadingController = false;
                },
            });
        },
        /**
         * 删除附件通用方法
         */
        deleteHandler(row, cb) {
            showConfirm('删除附件后无法撤销，请确认是否删除', 'warning', () => {

                this.loadingShow('附件内容更新中');

                this.$ajax({
                    type: 'post',
                    url: this.actionModel.del,
                    data: {
                        rowguid: row.rowguid
                    },
                    callback: () => {
                        cb && cb();
                        
                        this.$emit('del');

                        this.fileListUpdateHandler();
                    },
                    complete: () => {
                        this.loadingHide();
                    }
                });
            });
        },
        /**
         * 多文件删除
         */
        handleDelete: function (row, index) { //删除文件
            this.deleteHandler(row, () => {
                this.fileList.splice(index, 1);
            });
        },
        /**
         * 单文件删除
         */
        singleHandleDelete(row) {
            this.deleteHandler(row, () => {
                this.fileList = [];
            });
        },
        /**
         * 提交前检测
         */
        beforeAvatarUpload: function (file) {
            var arr = file.name.split('.'),
                type = arr[arr.length - 1], //从最后一个点开始判断文件类型
                size = file.size / 1024 / 1024,
                fs = this.filesize;

            if (this.onFileSelect) {
                this.onFileSelect(file);
            }

            return new Promise((resolve, reject) => {
                this.$nextTick(() => {
                    new Chain().link(next => {

                        // 文件类型判断
                        if (this.filetype) {
                            var typeArr = this.filetype.split(',');

                            if (!typeArr.some(function(item) {
                                return ((new RegExp(type, 'i')).test(item));
                            })) {
                                this.debounceDialogs.filetype();

                                return reject();
                            }
                            
                            next();
                        } else {
                            next();
                        }

                    }).link(next => {
                        // 文件数量判断
                        if (this.computeLimit && (this.fileList.length + this.uploaderInnerFiles > this.computeLimit)) {

                            this.debounceDialogs.limit();

                            return reject();
                        }

                        next();
                        
                    }).link(next => {

                        // 文件大小判断
                        if (fs && (size > fs)) {
                            this.debounceDialogs.filesize();

                            return reject();
                        }

                        next();
                        
                    }).link(next => {
                        
                        // 执行上传
                        return resolve();

                    }).run();
                });
            });
        },
        /**
         * 文件超出个数限制
         * files, fileList
         */
        handleExceed: function () {
            this.computeLimit && showMsg('限制上传' + this.computeLimit + '个文件', 'error');
        },
        /**
         * 上传成功
         * response, file, fileList
         */
        onSuccess: function (response, file, fileList) {
            this.loadingHide();

            var res = typeof (response) === 'string' ? JSON.parse(response) : response;

            ajaxResCheck(res, () => {
                this.successCache.push(file);

                if (this.successCache.length === fileList.length) {
                    showMsg(res.msg ? res.msg : '上传成功', 'success');

                    this.successCache = [];

                    this.getFileList();
                    this.$emit('success', res);
                }
            });
        },
        /**
         * 上传错误
         * err, file, fileList
         */
        onError: function (err) {
            this.loadingHide();

            showMsgBox(err, 'error');

            this.percent = 100;
            this.percentStatus = 'exception';

            this.$nextTick(() => {
                setTimeout(() => {
                    this.percentBar = false;
                }, 500);
            });
        },
        /**
         * 上传接口
         */
        submitUpload: function () {
            this.$refs.FileUp.submit();
        },
        fileListUpdateHandler: function() {
            this.$refs.upload.clearFiles();

            this.$emit('update', this.fileList);
            this.$emit('update:files', this.fileList);
            this.model = this.fileList;
        },
        /**
         * 生成下载链接
         */
        buildDownloadPath(file) {
            var search = toSearch({
                rowguid: file.rowguid
            });

            return `${this.actionModel.download}${search}`;
        },
        /**
         * 显示loading
         */
        loadingShow(text) {
            this.loadingController = true;
            this.loadingText = text || '';
        },
        /**
         * 移除loading
         */
        loadingHide() {
            this.loadingController = false;
            this.loadingBarShowController = false;
            this.percent = 0;
        },
        /**
         * 上传操作
         */
        httpUploadHandler(options) {
            if (options.file.size <= this.chunkSize) {
                const req = ajax(options);

                if (req && req.then) {
                    req.then(options.onSuccess, options.onError);
                }
            } else {
                this.loadingBarShowController = true;

                new BigFilePipeline(options).setAction(this.actionModel.uploadL).cheapReq((itemOptions) => {
                    const req = ajax(itemOptions);

                    if (req && req.then) {
                        req.then(itemOptions.onSuccess, itemOptions.onError);
                    }
                }).onProgress(val => {
                    this.percent = val;
                }).run();
            }
        },
        /**
         * 更新防抖弹窗变量
         */
        updateDebounceDialogs() {
            var that = this;

            this.debounceDialogs = {
                filetype: debounce(() => {
                    showMsg(`文件类型应为:${that.filetype}`, 'error');
                }, 1000 / 24),
                limit: debounce(() => {
                    showMsg(`总文件数量超过${that.computeLimit}个`, 'error');
                }, 1000 / 24),
                filesize: debounce(() => {
                    showMsg(`文件大小超过:${that.filesize}M`, 'error');
                }, 1000 / 24),
                avcmp4: debounce(() => {
                    showMsg(`您上传的视频文件不是avc编码格式的mp4文件，请修改后重新上传`, 'error');
                }, 1000 / 24),
            };
        },
    },
    mounted: function () {
        try {
            this.getFileList();
        } catch (e) {
            // e
        }

        this.updateDebounceDialogs();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '@css/var.scss';

    $size: 178px;

    .upload-s{
        overflow: hidden;
        position: relative;
    }

    .list{
        float: left;
    }

    .uploader {
        float: left;
        position: relative;
        margin: 5px;

        ::v-deep {
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                display: table;
                z-index: 1;

                &:hover {
                    border-color: $primaryColor;
                }
            }

            .uploader-icon {
                display: block;
                font-size: 28px;
                color: #8c939d;
                width: $size;
                height: $size;
                line-height: $size;
                text-align: center;
            }
        }

        .el-upload__tip{
            margin-top: 0;
            line-height: 1.5em;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            padding: 0 1em .5em;
            color: #C0C4CC;
            z-index: 0;
        }
    }

    .progress-con{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        z-index: 3000;

        .bigfile-percent{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>

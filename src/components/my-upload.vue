<template>
    <div
    v-loading="getListLoading"
    element-loading-text="附件内容更新中"
    >
        <el-upload
        multiple
        :drag="drag && !readonly"
        ref="FileUp"
        :action="uploadAction"
        :data="extraData"
        :show-file-list="false"
        :limit="limit"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
        :on-success="onSuccess"
        :on-error="onError"
        :auto-upload="!lazy"
        :on-change="onchange"
        :accept="fileType"
        v-loading="loading"
        element-loading-text="上传中"
        >
            <slot slot="trigger">
                <template v-if="!drag">
                    <el-button size="small" type="primary" v-show="myReadonly"><i class="el-icon-upload"></i> {{title}}</el-button>
                </template>
                <template v-else>
                    <template v-if="myReadonly">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </template>
                </template>
            </slot>

            <template v-if="drag && !readonly">
                <br>
            </template>

            <span :style="{marginLeft:readonly ? '' : '1em'}" v-if="single" class="single__file--name">
                <span v-if="fileList[0]">
                    <a
                    target="_blank"
                    :href="buildDownloadPath(fileList[0])">
                        {{fileList[0].filename}}
                    </a>
                    <i class="el-icon-circle-close btn-sf-del" @click="singleFileDel(fileList[0])" v-if="!readonly"></i>
                </span>
            </span>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="lazy">上传到服务器</el-button>
        </el-upload>

        <div slot="tip" class="file-type_tip" v-if="!readonly">
            <font v-if="!!fileType">
                只能上传{{fileType}}文件
            </font>
            <font v-if="!!fileSize">不能超过{{fileSize}}M</font>
        </div>

        <el-table
        style="width:100%; margin-top:5px;"
        v-bind:border="true"
        v-bind:data="fileList"
        empty-text="暂无文件"
        v-if="!single">
            <el-table-column label="文件名称" sortable>
                <template slot-scope="scope">
                    <a
                    target="_blank"
                    :href="buildDownloadPath(scope.row)">
                        {{scope.row.filename}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="fileuptime" label="上传时间" sortable></el-table-column>
            <el-table-column prop="addusername" label="上传人"></el-table-column>
            <el-table-column label="操作" width="150px" v-if="myReadonly">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        action: {
            type: String,
            default: ''
        },
        fileType: {
            type: String,
            default: ''
        },
        fileGuid: {
            type: String,
            default: '',
            required: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number
        },
        fileSize: {
            type: Number,
            default: 10
        },
        single: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '点击上传'
        },
        lazy: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'agenct'
        },
        extra: {
            type: Object,
            default: () => ({})
        }
    },
    data: function () {
        return {
            preview: false,
            imageurl: "",
            fileList: [],
            percent: 0,
            percentStatus: '',
            loading: false,
            getListLoading: false,

            fileTypeObj: {
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
            }
        }
    },
    computed: {
        uploadAction() {
            return this.action || `${this.getGetters('fileUrl')}/upload/${this.type}/common.json`;
        },
        myReadonly: function () {
            return !this.readonly;
        },
        extraData: function () {
            var extra = {
                fileguid: this.fileGuid,
                filetype: this.fileType,
                single: (this.single * 1)
            };

            mixin(this.extra, extra, true);

            return extra;
        },
        pathSupply() {
            return /micromessenger/i.test(navigator.userAgent) ? '?mp.wexin.qq.com' : ''
        }
    },
    methods: {
        bindFileList: function () { //绑定文件列表
            var that = this;

            if(!this.fileGuid) return;
            if(this.getListLoading) return;

            this.getListLoading = true;
            var data = {
                fileguid: this.fileGuid
            };
            mixin(this.extra, data, true);

            this.$ajax({
                url: `${this.getGetters('fileUrl')}/operate/getlist.json`,
                data,
                callback: data => {
                    this.fileList = data || [];
                    this.$emit('update', this.fileList);
                },
                complete: () => {
                    this.getListLoading = false;
                }
            });
            this.fileListUpdateHandler();
        },
        deleteHandler(row, cb) {
            ShowConfirm('删除附件后无法撤销，请确认是否删除', 'warning', () => {
                this.getListLoading = true;
                this.$ajax({
                    type: 'post',
                    url: `${this.getGetters('fileUrl')}/operate/delete.json`,
                    data: {
                        rowguid: row.rowguid
                    },
                    callback: data => {
                        cb && cb();
                        this.$emit('update', this.fileList);
                    },
                    complete: () => {
                        this.getListLoading = false;
                    }
                });
                this.fileListUpdateHandler();
            });
        },
        handleDelete: function (index, row) { //删除文件
            this.deleteHandler(row, () => {
                this.fileList.splice(index, 1);
            });
        },
        singleFileDel(row) {
            this.deleteHandler(row, () => {
                this.fileList = [];
            });
        },
        beforeAvatarUpload: function (file) {
            var arr = file.name.split('.');
            var type = arr[arr.length - 1],     //从最后一个点开始判断文件类型
                size = file.size / 1024 / 1024;
            if (!!this.fileType) {
                var typeArr = this.fileType.split(',');
                if(!typeArr.some(function(item) {
                    return ((new RegExp(type)).test(item))
                })) {
                    // ShowMsg.call(this, '文件类型应为:' + this.fileTypeObj[this.fileType] || this.fileType.split('/')[1], 'error');
                    ShowMsg.call(this, '文件类型应为:\n' + this.fileType, 'error');
                    return false;
                }
            };

            var fs = this.fileSize;

            if(size > fs) {
                ShowMsg.call(this, '文件大小超过:' + fs + 'M', 'error');
                return false;
            };
            this.loading = true;
            return true;
        },
        handleExceed: function (files, fileList) {
            !!this.limit && ShowMsg.call(this, '限制上传' + this.limit + '个文件', 'error')
        },
        onSuccess: function (response, file, fileList) {
            this.loading = false;
            var obj = typeof (response) == 'string' ? JSON.parse(response) : response;

            ajaxResCheck.call(this, obj, function () {
                // this.bindFileList();
                var file = clone(obj.tdata[0]);
                file.fileuptime = file.addtime;
                this.fileList.push(file);

                ShowMsg.call(this, obj.msg ? obj.msg : "上传成功",'success');
                this.$emit('update', fileList);
                this.$emit('success', obj);
            }.bind(this));
            this.fileListUpdateHandler();
        },
        onError: function (err, file, fileList) {
            var that = this
            this.loading = false;
            ShowMsgBox.call(this, err, 'error');
            this.percent = 100;
            this.percentStatus = 'exception'
            this.$nextTick(function () {
                setTimeout(function () {
                    that.percentBar = false;
                }, 500)
            })
        },
        submitUpload: function () {
            this.$refs.FileUp.submit();
        },
        onchange: function (file, filelist) {
            if (this.lazy) {
                if (this.single) {
                    this.fileList.splice(0, 1, {
                        filename: file.name
                    })
                } else {
                    var indexArr = [];
                    this.fileList.forEach(function (item) {
                        filelist.forEach(function (file, index) {
                            if (item.filename == file.name) {
                                indexArr.push(index);
                            }
                        })
                    });

                    indexArr.forEach(function (item) {
                        this.fileList.push({
                            filename: filelist[item].name
                        });
                    });
                }
            };
            this.fileListUpdateHandler();
        },
        fileListUpdateHandler: function() {
            this.$emit('update', this.fileList);
            this.$emit('update:files', this.fileList);
        },
        buildDownloadPath(file) {
            var search = toSearch({
                rowguid: file.rowguid
            });
            return `${this.getGetters('fileUrl')}/download/common.do${search}`
        }
    },
    mounted: function () {
        try {
            this.bindFileList();
        } catch (e) {}
    },
    watch: {
        fileGuid: function (e) {
            if (e) {
                this.bindFileList();
            }
        },
        extra: {
            handler(n, o) {
                if(JSON.stringify(n) !== JSON.stringify(o)) {
                    this.bindFileList();
                }
            }, deep: true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .file-type_tip{font-size:12px; color:#909399; line-height:1em;}
    .btn-sf-del{cursor:pointer;}
    .btn-sf-del:hover{color:red;}
</style>

<template>
    <div
    class="my-upload"
    v-loading="loadingController"
    element-loading-text="附件内容更新中"
    >
        <el-upload
        ref="upload"
        :drag="drag && !readonly"
        :action="actionModel.upload"
        :show-file-list="false"
        :data="extraData"
        :on-exceed="handleExceed"
        :on-success="onSuccess"
        :on-error="onError"
        :on-change="onChange"
        :before-upload="beforeAvatarUpload"
        :limit="limit"
        :accept="filetype"
        :auto-upload="!lazy"
        :http-request="httpUploadHandler"
        multiple
        >
            <slot slot="trigger">
                <template v-if="!drag">
                    <el-button 
                    v-show="!readonly"
                    size="small" 
                    type="primary" 
                    >
                        <i class="el-icon-upload"></i>
                        点击上传
                    </el-button>
                </template>

                <template v-else>
                    <template v-if="!readonly">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </template>
                </template>
            </slot>

            <template v-if="drag && !readonly">
                <br>
            </template>

            <span 
            v-if="single" 
            :style="{marginLeft:readonly ? '' : '1em'}" 
            class="single__file--name"
            >
                <span v-if="fileList[0]">
                    <a
                    target="_blank"
                    :href="buildDownloadPath(fileList[0])">
                        {{fileList[0].filename}}
                    </a>

                    <i 
                    v-if="!readonly"
                    class="el-icon-circle-close btn-sf-del" 
                    @click="singleFileDel(fileList[0])" 
                    ></i>
                </span>
            </span>

            <el-button 
            style="margin-left: 10px;" 
            size="small" 
            type="success" 
            @click="submitUpload" 
            v-if="lazy"
            >
                上传到服务器
            </el-button>
        </el-upload>

        <div 
        slot="tip" 
        v-if="!readonly && tipText"
        class="file-type_tip"
        >
            {{tipText}}
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
            <el-table-column label="操作" width="150px" v-if="!readonly">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import MIXIN from './upload-s/mixins/index.js';

export default {
    mixins: [MIXIN],
    props: {
        drag: {
            type: Boolean,
            default: false,
        },
        lazy: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        singleFileDel(row) {
            this.deleteHandler(row, () => {
                this.fileList = [];
            });
        },
        onChange: function (file, filelist) {
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
            }

            this.fileListUpdateHandler();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my-upload{
        width: 100%;

        .file-type_tip{
            font-size:12px; 
            color:#909399; 
            line-height:1em;
            margin: 4px 0 6px;
        }
        .btn-sf-del{cursor:pointer;}
        .btn-sf-del:hover{color:red;}
    }
</style>

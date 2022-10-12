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
            :readonly="readonly"
            >
                <el-upload
                ref="upload"
                v-if="uploadBtnShow"
                class="uploader"
                :action="actionModel.upload"
                :show-file-list="false"
                :on-exceed="handleExceed"
                :on-success="onSuccess"
                :on-error="onError"
                :before-upload="beforeAvatarUpload"
                :limit="limit"
                :accept="filetype"
                :http-request="httpUploadHandler"
                :multiple="multipleSelect"
                >
                    <i 
                        v-if="fileUploadingState"
                        class="el-icon-loading uploader-icon"
                        :style="{width:sizeModel,height:sizeModel,lineHeight:sizeModel}"
                    ></i>

                    <i 
                        v-else
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

import MIXIN from './mixins/index.js';

export default {
    mixins: [MIXIN],
    components: {
        FileList
    },
    props: {
        // 组件大小
        size: {
            type: [String,Number],
            default: 178,
        },
    },
    computed: {
        sizeModel() {
            return /px/.test(this.size) ? this.size : `${this.size}px`;
        },
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

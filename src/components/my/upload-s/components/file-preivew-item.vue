<template>
    <div class="file-item" :style="{width:size,height:size}">
        <component
            class="preview"
            :is="matched.previewTag"
            :src="matched.preview"
            fit="cover"
        ></component>

        <div class="hover">
            <div class="tools center">
                <div class="tool-item preview" v-if="/preview/.test(matched.btns)">
                    <i class="el-icon-zoom-in"  @click="previewHandler"></i>
                </div>
                <div class="tool-item download">
                    <i class="el-icon-download" @click="downloadHandler"></i>
                </div>
                <div class="tool-item del">
                    <i class="el-icon-delete"  @click="delHandler"></i>
                </div>
            </div>
        </div>

        <div class="info">
            {{data.filename}}
        </div>

        <el-dialog 
        class="file-preview-dialog"
        :visible.sync="dialogVisible"
        :title="`附件预览：${data.filename}`"
        width="50%"
        :append-to-body="true"
        :close-on-click-modal="false"
        >
            <component
                class="dialog-preview"
                :is="matched.previewTag"
                :src="matched.preview"
                :style="matched.style"
                fit="fill"
                controls
            ></component>
        </el-dialog>
    </div>
</template>

<script>
import pdf from '../assets/pdf.png';
import word from '../assets/word.png';
import excel from '../assets/excel.png';

export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        action: {
            type: Object,
            default: () => ({}),
        },
        size: {
            type: [String,Number],
            default: 178,
        },
        btnLayout: {
            type: String,
            default: ''
        },
    },
    data() {
        var that = this;
        
        return {
            // data: {
            //     filesavepath: 'https://inews.gtimg.com/newsapp_bt/0/13271995145/1000',
            //     filename: '38d0a4d3fd1f4134638c30c8321f95cad0c85e1f.jpg',
            //     rowguid: '9061819b736246eea90602833b682c60',
            // },

            map: [
                {
                    type: 'img',
                    suffix: /(jpg|jpeg|png|gif)/i,
                    preview() {
                        return `${that.action.preview}?rowguid=${that.data.rowguid}`;
                    },
                    btns: 'preview',
                    previewTag: 'el-image',
                    style: {
                        width: '100%',
                    },
                },
                {
                    type: 'mp4',
                    suffix: /mp4/i,
                    preview() {
                        return `${that.action.preview}?rowguid=${that.data.rowguid}`;
                    },
                    btns: 'preview',
                    previewTag: 'video',
                    style: {
                        width: '100%',
                        height: `${window.innerHeight - 200}px`,
                    },
                },
                {
                    type: 'pdf',
                    suffix: /pdf/i,
                    preview() {
                        return pdf;
                    },
                    btns: '',
                    previewTag: 'el-image',
                },
                {
                    type: 'word',
                    suffix: /(doc|docx)/i,
                    preview() {
                        return word;
                    },
                    btns: '',
                    previewTag: 'el-image',
                },
                {
                    type: 'excel',
                    suffix: /(xls|xlsx)/i,
                    preview() {
                        return excel;
                    },
                    btns: '',
                    previewTag: 'el-image',
                },
            ],

            dialogVisible: false,
        };
    },
    computed: {
        matched() {
            var fileSuffix = this.data.filetype,
                config = this.map.filter(item => {
                    return item.suffix.test(fileSuffix);
                })[0],
                res;

            if (!config) {
                res = {
                    type: 'illegal',
                    preview: '',
                    btns: [],
                    previewTag: 'el-image',
                };
            } else {
                res = {
                    ...config,
                    preview: config.preview(),
                };
            }

            return res;
        },
    },
    methods: {
        previewHandler() {
            this.dialogVisible = true;
        },
        downloadHandler() {
            window.open(this.data.filesavepath);
        },
        delHandler() {
            this.$emit('del', this.data);
        },
    }
};
</script>

<style lang="scss" scoped>
    @import '@css/var.scss';

    $size: 178px;

    .file-item{
        width: $size;
        height: $size;
        background: $primaryColor1;
        float: left;
        margin: 5px;
        overflow: hidden;
        position: relative;
        border-radius: 6px;;

        .preview{
            width: 100%;
            height: 100%;
        }

        &:hover{
            .hover{
                display: block;
            }
        }

        .hover{
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 24px;
            background: rgba(0,0,0,.3);
            color: white;

            .tools{
                overflow: hidden;
                width: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;

                .tool-item{
                    flex: 1;
                    text-align: center;
                    font-size: 24px;

                    i{
                        cursor: pointer;

                        &:hover{
                            font-weight: bold;
                        }
                    }
                }
            }
        }

        .info{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0 1em;
            box-sizing: border-box;
            color: white;
            background: rgba(0,0,0,.3);
            font-size: 12px;
            line-height: 2em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .file-preview-dialog {
        ::v-deep {
            .el-dialog__body{
                text-align: center;
            }
        }
    }

    .dialog-preview{
        max-width: 100%;
        max-height: 100%;
    }

    .center{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
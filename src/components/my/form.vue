<template>
    <el-form
    ref="form"
    :model="form"
    :label-width="labelWidth"
    :size="size"
    :label-position="labelPosition"
    :disabled="disabled || readonly"
    class="my-form"
    :class="{disabled: disabled||readonly, 'table-view':table}"
    :inline="inline"
    v-loading.sync="submitLoadingController">
        <slot></slot>
        <el-form-item label-width="0" class="btn-row" v-if="!readonly">
            <slot name="btn" :submit-handler="onSubmit" :cancel-handler="onCancel" :submit-loading="submitLoadingController">
                <el-button type="primary" @click="onSubmit" :style="btn_styl" :loading="submitLoadingController">保存</el-button>
                <el-button @click="onCancel" :style="btn_styl">取消</el-button>
            </slot>
        </el-form-item>
    </el-form>
</template>

<script>
import { Loading } from 'element-ui';

export default {
    props: {
        // label宽度
        labelWidth: {
            type: String,
            default: '120px'
        },
        // 表单对象值
        value: {
            type: Object,
            default: () => ({})
        },
        // 自动提交地址
        submitUrl: {
            type: String,
            default: ''
        },
        // 获取详情地址
        detailUrl: {
            type: String,
            default: ''
        },
        // 默认表单项大小
        size: {
            type: String,
            default: 'small'
        },
        // label位置
        labelPosition: {
            type: String,
            default: 'right'
        },
        // 只读
        disabled: {
            type: Boolean,
            default: false
        },
        // 只读
        readonly: {
            type: Boolean,
            default: false
        },
        // 提交前操作
        beforeSend: {
            type: [Function, Boolean],
            default: false
        },
        // 提交后操作
        afterSend: {
            type: [Function, Boolean],
            default: false
        },
        // 获取详情后操作
        afterDetail: {
            type: [Function, Boolean],
            default: false
        },
        // 获取详情参数
        detailExtra: {
            type: Object,
            default: () => ({})
        },
        // 提交格式为json的请求
        sendStr: {
            type: Boolean,
            default: false
        },
        // 表单中是否有文件，有则会忽略detailExtra的值，先请求一次detail
        file: {
            type: Boolean,
            default: false
        },
        // 行内形式
        inline: {
            type: Boolean,
            default: false
        },
        // 表格形式
        table: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            submitLoadingController: false,
            submitLock: false,

            elLoading: null
        }
    },
    computed: {
        form: {
            get: function () {
                return this.value
            },
            set: function (n) {
                this.$emit('input', n);
            }
        },
        btn_styl: function () {
            return {
                'display': 'inline-block'
            }
        }
    },
    methods: {
        onSubmit: function (e, callback) {
            var ajaxRes;

            new window.Chain().link(function (obj, next) {
                if (obj.submitLock) {
                    window.ShowMsg.call(obj, '提交过快，请稍后重试');
                    return;
                }

                obj.lockSubmit();

                next();
            }).link(function (obj, next) {
                if (obj.submitLoadingController) {
                    return;
                }

                obj.submitLoadingController = true;
                
                next();
            }).link(function (obj, next) {
                obj.$nextTick(function () {
                    next()
                });
            }).link(function (obj, next) {
                if(obj.beforeSend) {
                    obj.beforeSend(function() {
                        obj.$nextTick(function () {
                            next();
                        })
                    }, function() {
                        obj.submitEnd();
                    });
                } else {
                    next();
                }
            }).link(function (obj, next) {
                obj.$refs['form'].validate(function (valid) {
                    if (valid) {

                        Object.keys(obj.form).forEach(function (key) {
                            obj.form[key] = typeof (obj.form[key]) === 'string' ?
                            obj.form[key].replace(/^\s+|\s+$/g, "") :
                            obj.form[key];
                        });

                        if (obj.submitUrl) {
                            obj.$ajax({
                                type: 'post',
                                url: obj.submitUrl,
                                data: obj.form,
                                callback: function (data, res) {
                                    ajaxRes = res;
                                    obj.$emit('submit');
                                    window.ShowMsg.call(obj, res.msg || '保存成功', 'success');

                                    obj.close();

                                    !!callback && callback();
                                },
                                fztype: obj.sendStr,
                                complete: function () {
                                    next();
                                }
                            });
                        } else {
                            obj.$emit('submit');
                            next();
                        }
                    } else {
                        obj.submitEnd();
                        return false;
                    }
                });
            }).link(function (obj, next) {
                !!obj.afterSend && obj.afterSend(ajaxRes);
                obj.$nextTick(function () {
                    next();
                })
            }).link(function (obj, next) {
                obj.submitEnd();
                obj.$nextTick(function () {
                    next();
                });
            }).run(this);
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        close: function () {
            try {
                this.onCancel();

                this.submitEnd();
            } catch (e) {}
        },
        submitEnd: function () {
            this.submitLoadingController = false;
        },
        lockSubmit() {
            this.submitLock = true;

            setTimeout(function () {
                this.submitLock = false;
            }.bind(this), 1000);
        },
        queryDetail: function () {
            if (this.detailUrl) {
                var that = this;

                this.elLoading = Loading.service({
                    target: this.$el,
                    lock: true,
                    text: '数据加载中...'
                });

                if (this.file) {
                    this.$get(this.detailUrl, this.detailExtra, function (data) {
                        !!this.afterDetail && this.afterDetail(data);
                        this.form = data;

                        this.elLoading.close();
                    })
                } else {
                    var extra = true;

                    if(this.detailExtra) {
                        var queryKeys = Object.keys(this.detailExtra);

                        if(!queryKeys.length) {
                            extra = false;
                        } else {
                            queryKeys.forEach(function (item) {
                                if (!that.detailExtra[item]) extra = false;
                            });
                        }
                    } else {
                        extra = false;
                    }

                    if (extra) {
                        this.$get(this.detailUrl, this.detailExtra, function (data) {
                            !!this.afterDetail && this.afterDetail(data);
                            this.form = data;

                            this.elLoading.close();
                        })
                    } else {
                        !!this.afterDetail && this.afterDetail();

                        this.elLoading.close();
                    }
                }
            }
        },
        reset: function () {
            this.$refs['form'].resetFields();
        }
    },
    mounted: function () {
        this.queryDetail();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-form{
    ::v-deep {
        .el-select, .el-date-editor{
            width:100%;
        }
    }
}

.disabled.el-form ::v-deep .el-form-item {
    margin-bottom: 2px;
}
.btn-row{text-align:center; margin-top:20px;}

$tableBorderColor: #E8E8E8;
.table-view{
    border-left:1px solid $tableBorderColor; 
    border-top:1px solid $tableBorderColor; 
    overflow:hidden; 
    display:flex; 
    flex-wrap:wrap;

    ::v-deep .el-form-item{
        margin:0; 
        border-right:1px solid $tableBorderColor; 
        border-bottom:1px solid $tableBorderColor; 
        box-sizing:border-box;
    }

    ::v-deep .el-form-item:not(.btn-row){
        width:50%; 
        position:relative;

        .el-form-item__label{
            height:100%; 
            line-height:normal; 
            border-right:1px solid $tableBorderColor; 
            box-sizing:border-box; 
            background:#F9FBFE; 
            display:flex; 
            align-items:center; 
            justify-content:flex-end;
        }

        .el-form-item__content{
            display: flex;
            align-items: center;
            height: 100%;
            min-height:2em;
            box-sizing: border-box;
            padding:5px; 
            position:relative; 

            .el-form-item__error{
                top:auto; 
                bottom:-6px; 
                left:5px;
            }
        }
    }

    .btn-row{
        width:100%; 
        padding:1em 0;
    }
}
@media screen and (max-width: 1000px) {
    .table-view{
        ::v-deep .el-form-item:not(.btn-row){
            width:100%;
        }
    }
}
</style>

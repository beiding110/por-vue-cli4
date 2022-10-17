<template>
    <el-select
    v-model="svalue"
    filterable
    @visible-change="visibleChange"
    @focus="focus"
    :placeholder="placeholder"
    :clearable="clearable"
    :size="size"
    :disabled="disabled"
    :allow-create="allowCreate"
    :multiple="multiple"
    >
        <el-option
        v-for="pName in Object.keys(options)"
        :key="options[pName][props.value]"
        :label="options[pName][props.label]"
        :value="options[pName][props.value]">
            <slot v-bind:row="options[pName]"></slot>
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        // 只读
        disabled:{
            type:Boolean,
            default:false
        },
        // 展示清除按钮
        clearable:{
            type:Boolean,
            default:true
        },
        // 自动请求地址
        url: {
            type: String
        },
        // 双向绑定值
        value: {
            type: [String, Number, Array]
        },
        // 配置
        props: {
            type: Object,
            default: function () {
                return {
                    label: 'value',
                    value: 'key',
                };
            }
        },
        // placeholder
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 默认大小
        size: {
            type: String,
            default: 'small'
        },
        // 允许自行创建
        allowCreate: {
            type: Boolean,
            default: false
        },
        /* 
        使用后的参数，会具备双向绑定功能
        参数应为数据中的键，如[{label: 'label', value: 'value'}]
        如 2way="label"
        :label.sync="form.label"
        */
        '2way': {
            type: String
        },
        // 传入的数据
        data: {
            type: Array,
            default: () => []
        },
        // 绑定字符串，props.multiple为true可用，低版本无props.emitPath可用
        modelStr: {
            type: Boolean,
            default: false
        },
        // 绑定字符串时，字符串间链接字符
        strSpliter: {
            tyep: String,
            default: ','
        }
    },
    data () {
        return {
            options: [],
        };
    },
    computed: {
        svalue: {
            get: function () {
                if (this.modelStr) {
                    var valueArr = [];

                    if (getType(this.value) === 'string') {
                        valueArr = this.value.split(this.strSpliter);
                    }

                    if (valueArr[0] === '') {
                        return valueArr.slice(1);
                    }
                    
                    return valueArr;
                }
                
                return this.value;
            },
            set: function (e) {
                if (this.modelStr) {
                    this.$emit('input', e.join(this.strSpliter));
                } else {
                    this.$emit('input', e);
                }
            }
        }
    },
    methods: {
        focus:function(){
            this.$emit('focus');
        },
        visibleChange:function(){
            this.$emit('visiblechange');
        },
        queryData: function () {
            new Chain().link(next => {
                if (this.url) {
                    this.$get(this.url, data => {
                        try {
                            this.options = this.list2map(data || []);
                        } catch (e) {
                            throw new Error(e);
                        }

                        next();
                    });
                } else {
                    try {
                        this.options = this.list2map(this.data || []);
                    } catch (e) {
                        throw new Error(e);
                    }

                    next();
                }
            }).link(() => {
                if (!this.disabled && this.value) {
                    this.selectChange(this.svalue);
                }
            }).run();
        },
        list2map: function (list) {
            return list.reduce((map, item) => {
                map[item[this.props.value]] = item;
                return map;
            }, {});
        },
        selectChange: function (item) {
            if (this['2way']) {
                var modelArr = this['2way'].split(',');

                if (this.multiple) {
                    modelArr.forEach((key) => {
                        var updateData = item.reduce((arr, i) => {
                            arr.push(this.options[i][key]);
                            return arr;
                        }, []);

                        if (this.modelStr) {
                            updateData = updateData.join(this.strSpliter);
                        }

                        this.$emit('update:' + key, updateData);
                    });
                } else {
                    modelArr.forEach((key) => {
                        this.$emit('update:' + key, (this.options[item] || {})[key]);
                    });
                }
            }

            if (this.multiple) {
                var arr = [];

                if (Array.isArray(item) && item.length > 0) {
                    item.forEach((selkey) => {
                        arr.push(this.options[selkey]);
                    });

                    this.$emit('select', arr);
                }
            } else {
                this.$emit('select', this.options[item] || {});
            }
        }
    },
    watch: {
        url: function (n, o) {
            if (n === o) {
                return;
            }

            this.queryData();
        },
        data(n, o) {
            if (JSON.stringify(n) === JSON.stringify(o)) {
                return;
            }

            this.queryData();
        },
        svalue(n, o) {
            if (n === o) {
                return;
            }

            this.selectChange(n);
        },
    },
    mounted: function () {
        this.queryData();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

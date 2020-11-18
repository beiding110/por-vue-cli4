<template>
    <el-select
    v-model="svalue"
    filterable
    @change="selectChange"
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
        disabled:{
            type:Boolean,
            default:false
        },
        clearable:{
            type:Boolean,
            default:true
        },
        url: {
            type: String
        }, //导入的url地址
        value: {
            type: [String, Number, Array]
        }, //接受外部v-model传入的值
        props: {
            type: Object,
            default: function () {
                return {
                    label: "value",
                    value: "key"
                }
            }
        }, //定义数据中作为select的label与value的字段
        placeholder: {
            type: String,
            default: '请选择'
        },
        filterable: {},
        multiple: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'small'
        },
        allowCreate: {
            type: Boolean,
            default: false
        },
        '2way': {
            type: String
        },
        data: {
            type: Array,
            default: () => []
        },
        modelStr: {
            type: Boolean,
            default: false
        },
        strSpliter: {
            tyep: String,
            default: ','
        }
    },
    data () {
        return {
            options: [],
        }
    },
    computed: {
        svalue: {
            get: function () {
                if(this.modelStr) {
                    var valueArr = [];
                    if(getType(this.value) === 'string') {
                        valueArr = this.value.split(this.strSpliter);
                    };
                    if(valueArr[0] === '') {
                        return valueArr.slice(1);
                    } else {
                        return valueArr;
                    };
                } else {
                    return this.value;
                };
            },
            set: function (e) {
                if(this.modelStr) {
                    this.$emit('input', e.join(this.strSpliter));
                } else {
                    this.$emit('input', e);
                };
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
            var that = this
            if (!!this.url) {
                that.$get(that.url, function (data) {
                    try {
                        that.options = that.list2map(data || []);
                    } catch (e) {
                        throw new Error(e)
                    }
                })
            } else if(this.data.length > 0) {
                try {
                    that.options = that.list2map(this.data || []);
                } catch (e) {
                    throw new Error(e)
                }
            } else {
                // throw new Error('my-select 未绑定字典数据url')
            }
        },
        list2map: function (list) {
            var that = this;
            return list.reduce(function (map, item) {
                map[item[that.props.value]] = item;
                return map;
            }, {})
        },
        selectChange: function (item) {
            var that = this;
            if (this['2way']) {
                var modelArr = this['2way'].split(',');
                if(this.multiple) {
                    modelArr.forEach(function (key) {
                        var updateData = item.reduce(function(arr, i) {
                            arr.push(that.options[i][key])
                            return arr;
                        }, []);

                        if(that.modelStr) {
                            updateData = updateData.join(that.strSpliter);
                        };

                        that.$emit('update:' + key, updateData);
                    }.bind(this));
                } else {
                    modelArr.forEach(function (key) {
                        this.$emit('update:' + key, (this.options[item] || {})[key])
                    }.bind(this));
                };
            };

            if (this.multiple) {
                var arr = [];
                if (Array.isArray(item) && item.length > 0) {
                    item.forEach(function (selkey) {
                        arr.push(this.options[selkey])
                    }.bind(this));
                    this.$emit("select", arr);
                }
            } else {
                this.$emit("select", this.options[item] || {});
            };
        }
    },
    watch: {
        url: function () {
            this.queryData();
        },
        data() {
            this.queryData();
        }
    },
    mounted: function () {
        this.queryData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

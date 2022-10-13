<template>
	<el-cascader
		ref="cascader"
		class="my-cascader"
		v-model="model"
		:placeholder="placeholder"
		:options="options"
		:props="mixedProps"
		clearable
		@change="changeHandler"
        :filterable="filterable"
        :collapse-tags="collapseTags"
        :show-all-levels="showAllLevels"
        :disabled="disabled"
	></el-cascader>
</template>

<script>
export default {
    mixins: [],
    props: {
        // 双向绑定
        value: {
            type: [Array, String, Number],
            default: ''
        },
        // 只读
        disabled:{
            type:Boolean,
            default:false
        },
        // 展示清空按钮
        clearable:{
            type:Boolean,
            default:true
        },
        // placeholder内容
        placeholder: {
            type: String,
            default: ''
        },
        // 配置选项
        props: {
            type: Object,
            default: function () {
                return {};
            }
        },
        // 传入的data
        data: {
            type: Array,
            default: () => []
        },
        // 自动请求的接口地址
        url: {
            type: String
        },
        // 绑定字符串，props.multiple为true可用，低版本无props.emitPath可用
        modelStr: {
            type: Boolean,
            default: false,
        },
        // 绑定字符串时，字符串间链接字符
        strSpliter: {
            type: String,
            default: ','
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
        // 2way字符串间链接字符
        '2wayStrSpliter': {
            type: String,
            default: '-'
        },
        // 是否可搜索选项	
        filterable: {
            type: Boolean,
            default: false,
        },
        // 多选模式下是否折叠Tag	
        collapseTags: {
            type: Boolean,
            default: false,
        },
        // 输入框中是否显示选中值的完整路径，同时作用于2way的字段
        showAllLevels: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            options: [],
            leafs: [],
        };
    },
    computed: {
        model: {
            get() {
                if (this.mixedProps.emitPath) {
                    // 绑定完整路径数组

                    if (this.modelStr) {
                        return this.getFullPath(this.value, this.leafs).reverse();
                    }

                    return this.value;
                }

                // 绑定叶子值
                if (this.mixedProps.multiple) {
                    // 可多选
                    if (this.modelStr) {
                        //绑定字符串
                        return this.value.split(this.strSpliter);
                    }

                    return this.value;
                }

                // 不可多选
                return this.value;
                    
            },
            set(val) {
                var length;

                if (this.mixedProps.emitPath) {
                    // 绑定完整路径数组
                    if (this.modelStr) {
                        // 使用了modelStr
                        length = val.length;

                        if (length) {
                            this.$emit('input', val[length - 1]);
                        } else {
                            this.$emit('input', '');
                        }
                        
                        return;
                    }

                    this.$emit('input', val);
                    return;
                }
                
                // 绑定叶子值
                if (this.mixedProps.multiple) {
                    // 可多选
                    length = val.length;

                    if (length) {
                        if (this.modelStr) {
                            this.$emit('input', val.join(this.strSpliter));
                            return;
                        }

                        this.$emit('input', val);
                    } else {
                        this.$emit('input', '');
                    }

                    return;
                }
                
                // 不可多选
                this.$emit('input', val);
            }
        },
        mixedProps() {
            return mixin(this.props, {
                emitPath: false,
                multiple: false,
                checkStrictly: false,
                value: 'id',
                label: 'text'
            }, true);
        },
    },
    watch: {
        url(n, o) {
            if (n === o) {
                return;
            }

            this.queryData();
        },
        data: {
            handler() {
                this.queryData();
            }, deep: true
        }
    },
    methods: {
        queryData() {
            new Chain().link(next => {
                if (this.url) {
                    this.$get(this.url, data => {
                        this.options = data;
                        this.dataRebuild(data, this.mixedProps.value);

                        next();
                    });
                } else if (this.data.length) {
                    this.options = this.data;
                    this.dataRebuild(this.data, this.mixedProps.value);
                    
                    next();
                }
            }).link(() => {
                if (!this.disabled && this.value) {
                    this.changeHandler();
                }
            }).run();
        },
        changeHandler() {
            this.$nextTick(() => {
                const selNodes = this.$refs.cascader.getCheckedNodes();

                selNodes && this.twoWayHandler(selNodes);

                this.$emit('change', selNodes);
            });
        },
        dataRebuild(obj, key) {
            obj.forEach(item => {
                if (item.children && item.children.length) {
                    item.children.forEach(child => {
                        child.parent = item;
                    });

                    this.dataRebuild(item.children, key);
                } else {
                    try {
                        delete item.children;
                    } catch (e) {
                        //删除children失败
                    }

                    this.leafs.push(item);
                }
            });
        },
        getFullPath(key, arr) {
            var res = [key],
                filtedItem = arr.filter(item => item[this.mixedProps.value] === key)[0],
                patentData;

            if (filtedItem) {
                if (filtedItem.parent) {
                    patentData = this.getFullPath(filtedItem.parent[this.mixedProps.value], [filtedItem.parent]);
                } else {
                    patentData = [];
                }
                res.push.apply(res, patentData);
            }

            return res;
        },
        twoWayHandler(selNodes) {
            if (this['2way']) {
                var modelArr = this['2way'].split(','),
                    updateValue;

                modelArr.forEach(key => {
                    if (this.mixedProps.multiple) {
                        // 多选

                        updateValue = selNodes.filter(selNode => !selNode.hasChildren).map(selNode => {
                            return this.twoWayObjBuilder(selNode, key);
                        });

                        if (this.modelStr) {
                            updateValue = updateValue.join(this.strSpliter);
                        }
                    } else {
                        // 单选
                        
                        var rowItem = selNodes[0];

                        if (!rowItem) {
                            return;
                        }

                        updateValue = this.twoWayObjBuilder(rowItem, key);
                    }

                    this.$emit(`update:${key}`, updateValue);
                });
            }
        },
        twoWayObjBuilder(node, key) {
            var item = node.pathNodes.map(nodeItem => {
                return nodeItem.data[key];
            });

            if (this.showAllLevels) {
                if (!this.mixedProps.emitPath) {
                    item = item.join(this['2wayStrSpliter']);
                } 
            } else {
                item = item[item.length - 1];
            }

            return item;
        }
    },
    created() {
        this.queryData();
    }
};
</script>

<style lang="scss" scoped>
	.my-cascader{width:100%;}
</style>

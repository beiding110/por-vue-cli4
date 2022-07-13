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
	></el-cascader>
</template>

<script>
export default {
    mixins: [],
    props: {
        value: {
            type: [Array, String, Number],
            default: ''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        clearable:{
            type:Boolean,
            default:true
        },
        placeholder: {
            type: String,
            default: ''
        },
        props: {
            type: Object,
            default: function () {
                return {};
            }
        },
        data: {
            type: Array,
            default: () => []
        },
        url: {
            type: String
        },
        modelStr: {
            // 绑定字符串，props.multiple为true可用，低版本无props.emitPath可用
            type: Boolean,
            default: false,
        },
        strSpliter: {
            type: String,
            default: ','
        },
        '2way': {
            type: String
        },
        '2wayStrSpliter': {
            type: String,
            default: '-'
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        collapseTags: {
            type: Boolean,
            default: false,
        },
        showAllLevels: {
            type: Boolean,
            default: true,
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
        url() {
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
            if (this.url) {
                this.$get(this.url, data => {
                    this.options = data;
                    this.dataRebuild(data, this.mixedProps.value);
                });
            }
            if (this.data.length) {
                this.options = this.data;
                this.dataRebuild(this.data, this.mixedProps.value);
            }
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

            if (!this.mixedProps.emitPath) {
                item = item.join(this['2wayStrSpliter']);
            }

            return item;
        }
    },
    created() {
        this.queryData();
    }
};
</script>

<style>
	.my-cascader{width:100%;}
</style>

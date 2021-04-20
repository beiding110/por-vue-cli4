<template>
	<el-cascader
		ref="cascader"
		class="my-cascader"
		v-model="model"
		:placeholder="placeholder"
		:options="options"
		:props="props"
		clearable
		@change="changeHandler"
	></el-cascader>
</template>

<script>
export default {
    mixins: [ ],
	props: {
        value: {
            type: [Array, String],
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
                return {
                    emitPath: false,
                    value: 'id',
                    label: 'text'
                }
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
            type: Boolean,
            default: false
        },
        strSpliter: {
            type: String,
            default: '-'
        },
        '2way': {
            type: String
        },
	},
	data() {
		return {
			options: [],
            leafs: []
		};
    },
    computed: {
        model: {
            get() {
                if(this.modelStr) {
                    return this.getFullPath(this.value, this.leafs).reverse();
                } else {
                    return this.value;
                }
            },
            set(val) {
                if(this.modelStr) {
                    var length = val.length;
                    if(length) {
                        this.$emit('input', val[length - 1]);
                    } else {
                        this.$emit('input', '');
                    }
                } else {
                    this.$emit('input', val);
                }
            }
        }
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
            if(this.url) {
                this.$get(this.url, data => {
                    this.options = data;
                    this.dataRebuild(data, this.props.value);
                });
            }
            if(this.data.length) {
                this.options = this.data;
                this.dataRebuild(this.data, this.props.value);
            }
		},
		changeHandler() {
			// console.log(row)
			this.$nextTick(() => {
                const selNodes = this.$refs.cascader.getCheckedNodes();
                const selNode = selNodes[0];
                selNode && this.twoWayHandler(selNode);

                this.$emit('change', selNodes);
			})
		},
        dataRebuild(obj, key) {
            obj.forEach(item => {
                if(item.children) {
                    item.children.forEach(child => {
                        child.parent = item;
                    });

                    this.dataRebuild(item.children, key);
                } else {
                    this.leafs.push(item);
                }
            });
        },
        getFullPath(key, arr) {
            var res = [key];

            var filtedItem = arr.filter(item => item[this.props.value] === key)[0];
            if(filtedItem) {
                var patentData;

                if(filtedItem.parent) {
                    patentData = this.getFullPath(filtedItem.parent[this.props.value], [filtedItem.parent]);
                } else {
                    patentData = [];
                }
                res.push.apply(res, patentData);
            }

            return res;
        },
        twoWayHandler(row) {
            if(this['2way']) {
                var modelArr = this['2way'].split(',');
                modelArr.forEach(function(key) {
                    var item = row.pathNodes.map(item => {
                        return item.data[key];
                    });

                    if(this.modelStr) {
                        item = item.join(this.strSpliter);
                    }

                    this.$emit('update:' + key, item)
                }.bind(this));
            };
        }
	},
	created() {
		this.queryData();
	}
}
</script>

<style>
	.my-cascader{width:100%;}
</style>

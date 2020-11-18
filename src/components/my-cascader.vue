<template>
	<el-cascader
		ref="cascader"
		class="cascader-hy"
		v-model="model"
		:placeholder="placeholder"
		:options="options"
		:props="props"
		clearable
		@change="changeHandler"
	></el-cascader>
</template>

<script>
import MODEL from '@/mixins/model'
import TWO_WAY from '@/mixins/2way'

export default {
    mixins: [MODEL, TWO_WAY],
	props: {
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
	},
	data() {
		return {
			options: [],
		};
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
                });
            }
            if(this.data.length) {
                this.options = this.data;
            }
		},
		changeHandler() {
			// console.log(row)
			this.$nextTick(() => {
                const selNodes = this.$refs.cascader.getCheckedNodes();
                const selNode = selNodes[0];
                selNode && this.twoWayHandler(selNode.data);


                this.$emit('change', selNodes);
			})
		}
	},
	created() {
		this.queryData();
	}
}
</script>

<style>
	.cascader-hy{width:100%;}
</style>

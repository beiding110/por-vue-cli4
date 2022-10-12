<template>
    <el-table
    ref="table"
    class="my-table"
    :border="border"
    :data.sync="tableData"
    :height="height"
    :max-height="maxHeight"
    :summary-method="summaryMethod"
    :show-summary="showSummary"
    :span-method="spanMethod"
    :row-key="rowKey"
    :default-expand-all="defaultExpandAll"
    @selection-change="handleSelectionChange"
    @sort-change="sortChange"
    >
        <el-table-column 
            v-if="select" 
            type="selection" 
            width="55" 
            :selectable="selectable"
        ></el-table-column>

        <slot></slot>
    </el-table>
</template>

<script>
export default {
    props: {
        // 列表数据
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        // 表格支持选中时，选中的值
        value: {
            type: Array,
            default() {
                return [];
            },
        },
        // 自动请求数据地址
        url: {
            type: String,
            default: '',
        },
        // 请求结束方法
        afterQuery: {
            type: [Boolean, Function],
            default: false,
        },
        // 自动请求搜索条件
        search: {
            type: Object,
            default() {
                return {
                    sortname: 'addtime',
                    sortorder: 'desc',
                };
            }
        },
        // 合计方法
        summaryMethod: {
            type: Function,
            default: function() {}
        },
        // 展示合计行
        showSummary: {
            type: Boolean,
            default: false
        },
        // 展示边框
        border: {
            type: Boolean,
            default: true
        },
        // 表格高度
        height: {
            type: [String, Number]
        },
        // 最大高度
        maxHeight: {
            type: [String, Number]
        },
        // 展示选中列
        select: {
            type: Boolean,
            default: false
        },
        // 选中列可选条件
        selectable: {
            type: Function,
            default: function() {
                return true;
            },
        },
        // 合并行列方法
        spanMethod: {
            type: Function,
            default: function() {}
        },
        // 树形格式组件
        rowKey: {
            type: String,
            default: '',
        },
        // 默认展开
        defaultExpandAll: {
            type: Boolean,
            default: true,
        },
    },
    data () {
        return {
            innerData: [],

            valueWatchLock: false,

            ordinary: {},
        };
    },
    computed: {
        tableData() {
            return this.url ? this.innerData : this.data;
        }
    },
    watch: {
        value: {
            handler(n, o) {
                if (n === o || !n) return;
                if (!this.tableData.length) return;
                if (this.valueWatchLock) return;

                this.$nextTick(() => {
                    this.setRowSelection(n);
                });
            }, deep: true
        },
        data: {
            handler() {
                this.doLayout();
            }, deep: true,
        },
    },
    methods: {
        //表格选中项变化
        handleSelectionChange: function(node) {
            this.valueWatchLock = true;

            this.$emit('input',node);
            this.$emit('selectchange',node);
        },
        /*表格排序事件*/
        sortChange: function(sort){
            this.search.sortname = sort.prop;
            this.search.sortorder = this.sortorder(sort.order);

            this.$emit('update:search', this.search);

            this.$emit('sort', this.search);
        },
        sortorder(str) {
            try {
                if (str.indexOf('asc') > -1) {
                    return 'asc';
                } else if (str.indexOf('desc') > -1) {
                    return 'desc';
                }
            } catch (e) {
                return str;
            }
        },
        queryData: function () {
            if (!this.url) return;
            
            this.$get(this.url, this.search, (data) => {
                this.afterQuery && this.afterQuery(data);

                this.innerData = data;
            });
        },
        setRowSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    var index = this.data.indexOf(row),
                        data = this.tableData;

                    this.$refs.table.toggleRowSelection(data[index]);
                });
            } else {
                this.$refs.table.clearSelection();
            }

            this.valueWatchLock = true;
        },
        doLayout() {
            this.$refs.table.doLayout();
        },
    },
    created() {
        this.ordinary = this.search;
    },
    mounted: function() {
        this.queryData();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

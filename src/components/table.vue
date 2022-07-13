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
    default-expand-all
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
        data: {
            type: Array,
            default() {
                return []
            }
        },
        value: {
            type: Array,
            default() {
                return []
            }
        },
        url: {
            type: String,
            default: ''
        },
        afterQuery: {
            type: [Boolean, Function],
            default: false,
        },
        search: {
            type: Object,
            default() {
                return {
                    sortname: 'addtime',
                    sortorder: 'desc'
                }
            }
        },
        summaryMethod: {
            type: Function,
            default: function() {}
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: true
        },
        height: {
            type: [String, Number]
        },
        maxHeight: {
            type: [String, Number]
        },
        select: {
            type: Boolean,
            default: false
        },
        selectable: {
            type: Function,
            default: function() {
                return true;
            }
        },
        spanMethod: {
            type: Function,
            default: function() {}
        },
        rowKey: {
            type: String,
            default: '',
        }
    },
    data () {
        return {
            innerData: [],

            valueWatchLock: false,
        }
    },
    computed: {
        tableData() {
            return this.url ? this.innerData : this.data;
        }
    },
    watch: {
        value: {
            handler(n, o) {
                if(n === o || !n) return;
                if(!this.tableData.length) return;
                if(this.valueWatchLock) return;

                this.$nextTick(() => {
                    this.setRowSelection(n);
                })
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
                    return 'asc'
                } else if (str.indexOf('desc') > -1) {
                    return 'desc'
                }
            } catch (e) {
                return str
            }
        },
        queryData: function () {
            if (!this.url) return;
            
            this.$get(this.url, this.search, function (data) {
                this.afterQuery && this.afterQuery(data);

                this.innerData = data;
            })
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
    mounted: function() {
        this.queryData();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

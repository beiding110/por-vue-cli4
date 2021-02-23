<template>
    <el-table
        ref="table"
        class="my__table"
        :border="border"
        :data.sync="tableData"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        :height="height"
        :max-height="maxHeight"
        :summary-method="summaryMethod"
        :show-summary="showSummary"
        :span-method="spanMethod"
        >
            <el-table-column type="selection" width="55" v-if="select" :selectable="selectable"></el-table-column>
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
        theme: {
            type: String,
            default: ''
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
        }
    },
    methods: {
        //表格选中项变化
        handleSelectionChange: function(node) {
            this.$emit('input',node);
            this.$emit('selectchange',node);
        },
        /*表格排序事件*/
        sortChange: function(sort){
            this.search.sortname = sort.prop;
            this.search.sortorder = sortorder(sort.order);
            this.$emit('sort', this.search);
        },
        queryData: function () {
            if (!this.url) return;
            this.$get(this.url, this.search, function (data) {
                !!this.after && this.after(data, function (newData) {
                    if (!!newData) {
                        data = newData;
                    }
                });
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
    },
    mounted: function() {
        this.queryData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my__table{width:100%;
    /deep/ {
        .el-button--text{text-align:left;
            span{word-break:break-all; white-space:normal; }
        }
        .el-table__header{
            min-width: 100% !important;
        }
        .el-table__body{
            min-width: 100% !important;
        }
    }
}
</style>

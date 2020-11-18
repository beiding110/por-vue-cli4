<template>
    <el-table
        v-bind:data="tableData"
        v-bind:cell-style="SetCellStyle"
        @selection-change="seleChange"
        :show-summary="showSummary"
        :summary-method="summaryMethod">
    	<el-table-column :label="nocode ? '编号' : '开合'" :min-width="nocode ? 250 : 100">
    		<template slot-scope="scope">
    			<i style="cursor:pointer;margin-right:5px;" class="el-icon-arrow-down" v-if="scope.row.Show" @click="TrShowOrHide($event,scope.row[codekey],codekey,tableData);"></i>
                <template v-if="nocode">
                    {{ scope.row[codekey] }}
                </template>
    		</template>
    	</el-table-column>
    	<slot></slot>
    </el-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        codekey: {
            type: String,
            default: ''
        },
        parentkey: {
            type: String,
            default: ''
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        summaryMethod: {
            type: Function,
            default: function() {}
        },
        nocode: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            handlerIndex: 0
        }
    },
    computed: {
        tableData: function () {
            var that = this,
                list = that.data
            this.GetTreeTableData(this.codekey, this.parentkey, list)
            return list
        }
    },
    watch: {
        data: {
            handler: function(n, o){
                if(n != o) {
                    $(".el-table").find("table.el-table__body").find("tr").show()
                }
            },deep: true
        }
    },
    methods: {
        seleChange: function (e) {
            this.$emit('selection-change', e)
        },
        SetCellStyle: function (obj) { //设置单元格样式
            var row = obj.row,
                column = obj.column,
                rowIndex = obj.rowIndex,
                columnIndex = obj.columnIndex;

            if (rowIndex == 0 && columnIndex == 0) {
                if (column.type == "selection")
                    this.handlerIndex = 1;
            }
            if (columnIndex == this.handlerIndex) {
                var padding = row.Ceng * 15;
                padding = row.Show ? padding : padding + 20;
                return {
                    paddingLeft: padding + "px",
                };
            }
            return "";
        },
        /**********************************
         *** 控制行的显隐treeTable
         *** e 参数$event
         *** node 当前行的编号
         *** code 编号字段的Key
         *** list 数据源 集合
         **********************************/
        TrShowOrHide: function (e, node, code, list) {
            var obj = e.target,
                show = false;
            var className = $(obj).attr("class");
            var table = $(obj).parents(".el-table").find("table.el-table__body");

            //样式控制
            if (className == "el-icon-arrow-down") {
                $(obj).attr("class", "el-icon-arrow-right");
            } else {
                show = true;
                $(obj).attr("class", "el-icon-arrow-down");
            }

            var hideNode = [];
            //获取需要隐藏的项
            list.forEach(function (obj, index, array) {
                if (table.length > 1) {
                    className = $(table).eq(1).find("tr:eq(" + index + ") td:eq(0) i").attr("class");
                } else {
                    className = $(table).find("tr:eq(" + index + ") td:eq(0) i").attr("class");
                }

                if (obj.Parent.indexOf(node) > -1 && className == "el-icon-arrow-right") {
                    hideNode.push(obj[code]);
                }
            })

            list.forEach(function (obj, index, array) {
                var i = obj.Parent.indexOf(node);
                if (i > -1) {
                    if (show) {
                        for (var j = 0; j < hideNode.length; j++) {
                            if (obj.Parent.indexOf(hideNode[j]) > -1) {
                                show = false;
                                break;
                            }
                        }

                        //判断该行是否需要隐藏
                        if (show) {
                            if (table.length > 1) {
                                $(table).each(function () {
                                    $(this).find("tr:eq(" + index + ")").show();
                                })
                            } else {
                                $(table).find("tr:eq(" + index + ")").show();
                            }
                        } else {
                            show = true;
                        }
                    } else {
                        if (table.length > 1) {
                            $(table).each(function () {
                                $(this).find("tr:eq(" + index + ")").hide();
                            })
                        } else {
                            $(table).find("tr:eq(" + index + ")").hide();
                        }
                    }
                }
            })
        },
        /*********************************
         *** 计算是否最底层treeTable
         *** parentCode 父级编号字段Key
         *** codeValue 父级编号字段Value
         *********************************/
        GetIsShow: function (parentCode, codeValue, list) {
            var result = false;
            $.each(list, function () {
                if (this[parentCode] == codeValue) {
                    result = true;
                    return;
                }
            })
            return result;
        },
        /*********************************
         *** 扩展数据源treeTable
         *** code 编号字段Key
         *** parentCode 父级编号字段Key
         *** list 数据源 集合
         *********************************/
        GetTreeTableData: function (code, parentCode, list) {
            var that = this;
            $.each(list, function () {
                var res = {
                    index: 0,
                    ceng: 0,
                    parent: []
                };
                this["Show"] = that.GetIsShow(parentCode, this[code], list);
                that.GetCeng(code, parentCode, this[parentCode], list, res);
                this["Parent"] = res.parent;
                this["Ceng"] = res.ceng;
            })
        },
        /********************************
         *** 计算每个节点对应层数treeTable
         *** code 编号Key
         *** parentCode 父级编号Key
         *** parentValue 父级编号字段Value
         *** list 数据源 集合
         *** res 输出结果{ index: 0, ceng: 0, parent: [] }
         ********************************/
        GetCeng: function (code, parentCode, parentValue, list, res) {
            var that = this;
            if (list[res.index][code] == parentValue) {
                res.ceng++;
                res.parent.splice(0, 0, parentValue);
                if (list[res.index][parentCode] != 0) {
                    var index = res.index;
                    res.index = 0;
                    that.GetCeng(code, parentCode, list[index][parentCode], list, res);
                }
            } else {
                res.index++;
                if (res.index < list.length) {
                    that.GetCeng(code, parentCode, parentValue, list, res);
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

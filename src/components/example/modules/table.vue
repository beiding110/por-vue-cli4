<template>
    <el-card 
    header="my-table"
    >
        <my-table 
        :data="tableData"
        select
        v-model="selectedCol"
        >
            <el-table-column
                prop="date"
                label="日期"
            ></el-table-column>

            <el-table-column
                prop="name"
                label="姓名"
            ></el-table-column>

            <el-table-column
                prop="address"
                label="地址"
            ></el-table-column>
        </my-table>

        <div>
            选中的行：{{selectedCol}}
        </div>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            tableData: [{
                id: '001',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                id: '002',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                id: '003',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                id: '004',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],

            selectedCol: []
        }
    },
    methods: {
        
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .frame-con{width:100%; height:500px; position:relative;}
</style>

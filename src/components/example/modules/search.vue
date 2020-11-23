<template>
    <el-card 
    header="my-search"
    >
        <my-search v-model="pgData" @search="searchHandler">
            
        </my-search>

        <my-search v-model="pgData" @search="searchHandler">
            <el-form-item slot="time">
                <el-input v-model="pgData.txtkey" placeholder="招标人名称" clearable></el-input>
            </el-form-item>

            <template slot="btn">
                <el-button type="success" icon="el-icon-plus">添加招标人</el-button>

                <el-button type="warning" icon="el-icon-search">查询统一信用代码</el-button>
            </template>
        </my-search>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            pgData: {
                title: '',
                txtkey: ''
            }
        }
    },
    methods: {
        searchHandler() {
            alert('建议调用my-pagination组件的queryData方法');
        }
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .frame-con{width:100%; height:500px; position:relative;}
</style>

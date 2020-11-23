<template>
    <el-card 
    header="my-pagination"
    >
        <my-pagination
            v-model="tableData"
            :action="$store.getters.twUrl + '/xmgl/project/powerpagelist'"
            :search="pgData"
            ref="page"
            :loading.sync="loadingController"
        ></my-pagination>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            tableData: [],
            pgData: {
                sortname: '',
                sortorder: 'desc'
            },
            loadingController: false
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

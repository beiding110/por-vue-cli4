<template>
    <el-card 
    header="my-upload"
    >
        <my-upload 
            :file-guid="testFileGuid"
        ></my-upload>

        <my-upload 
            single
            :file-guid="testFileGuid"
        ></my-upload>

        <my-upload 
            single
            drag
            :file-guid="testFileGuid"
        ></my-upload>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            testFileGuid: 'test-file-guid'
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

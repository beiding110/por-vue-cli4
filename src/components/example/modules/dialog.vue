<template>
    <el-card 
    header="my-cascader"
    >
        <el-button @click="dialogShow">开启my-dialog</el-button>

        <my-dialog 
        v-model="dialogVisible"
        width="200px"
        title="这是个自定义宽度为200px的dialog"
        >
            <p>这是dialog的嵌套内容</p>
        </my-dialog>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            dialogVisible: false
        }
    },
    methods: {
        dialogShow() {
            this.dialogVisible = true;
        }
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

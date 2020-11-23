<template>
    <el-card 
    header="ueditor"
    >
        <ueditor
            v-model="model"
        ></ueditor>

        <div>
            富文本内容：{{model}}
        </div>

        <ueditor
            v-model="model"
            readonly
        ></ueditor>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            model: ''
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

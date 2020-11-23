<template>
    <el-card 
    header="my-frame"
    >
        <div class="frame-con">
            <my-frame
                src="http://www.baidu.com"
            ></my-frame>
        </div>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            
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

<template>
    <el-card 
    header="frame-view"
    >
        <div class="frame-con">
            <frame-view
                src="http://www.baidu.com"
            ></frame-view>
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

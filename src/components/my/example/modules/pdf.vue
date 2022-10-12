<template>
    <el-card 
    header="pdfjs"
    >
        <div class="frame-con">
            <pdf
                src="https://mozilla.github.io/pdf.js/es5/web/compressed.tracemonkey-pldi-09.pdf"
            ></pdf>
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

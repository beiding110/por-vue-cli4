<template>
    <div class="scroll">
        <demo-cascader class="demo-item"></demo-cascader>

        <demo-checkbox class="demo-item"></demo-checkbox>

        <demo-dialog class="demo-item"></demo-dialog>

        <demo-form class="demo-item"></demo-form>

        <demo-frame class="demo-item"></demo-frame>

        <demo-pagination class="demo-item"></demo-pagination>

        <demo-radio class="demo-item"></demo-radio>

        <demo-search class="demo-item"></demo-search>

        <demo-select class="demo-item"></demo-select>

        <demo-table class="demo-item"></demo-table>

        <demo-tree class="demo-item"></demo-tree>

        <demo-upload class="demo-item"></demo-upload>

        <demo-pdfjs class="demo-item"></demo-pdfjs>

        <demo-ueditor class="demo-item"></demo-ueditor>

        <demo-word class="demo-item"></demo-word>
    </div>
</template>

<script>
export default {
    components: { 
        DemoCascader: () => import('./modules/cascader'),
        DemoCheckbox: () => import('./modules/checkbox'),
        DemoDialog: () => import('./modules/dialog'),
        DemoForm: () => import('./modules/form'),
        DemoFrame: () => import('./modules/frame'),
        DemoPagination: () => import('./modules/pagination'),
        DemoRadio: () => import('./modules/radio'),
        DemoSearch: () => import('./modules/search'),
        DemoSelect: () => import('./modules/select'),
        DemoTable: () => import('./modules/table'),
        DemoTree: () => import('./modules/tree'),
        DemoUpload: () => import('./modules/upload'),
        DemoPdfjs: () => import('./modules/pdf'),
        DemoUeditor: () => import('./modules/ueditor'),
        DemoWord: () => import('./modules/word'),
    },
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
.demo-item{width:1000px; margin:0 auto;}
.demo-item + .demo-item{margin-top:1em;}

.scroll{height:100%; overflow:auto;}
</style>

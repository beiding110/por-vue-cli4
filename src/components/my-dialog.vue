<template>
    <el-dialog
        :title="title"
        @opened="opened"
        :width="width"
        :visible.sync="model"
        :append-to-body="true"
        :close-on-click-modal="false"
        @close = "close"
        :show-close="showclose"
        :before-close="beforeClose"
        >

        <slot></slot>

    </el-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '50%'
        },
        showclose: {
            type: Boolean,
            default: true
        },
        hasBeforeClose:{
            type:[Function, Boolean],
            default:false
        }
    },
    data () {
        return {

        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(n, o) {
                this.$emit('input', n);
            }
        }
    },
    methods: {
        beforeClose:function(done){
            if(typeof(this.hasBeforeClose) == 'function'){
                this.hasBeforeClose(done);
            }else{
                done();
            }
        },
        close(){
            this.$emit('close')
        },
        opened() {
            this.$emit('show')
        },
    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

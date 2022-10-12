<template>
    <el-tooltip effect="light" :content="text" placement="top">
        <i :class="icon" :style="{color:color}"></i>
    </el-tooltip>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'el-icon-info'
        },
        color: {
            type: String,
            default: '#67C23A'
        }
    },
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

</style>

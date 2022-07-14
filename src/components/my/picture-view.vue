<template>
    <iframe
    ref="frame"
    class="picture-container"
    :src="'./static/plugin/picture-view/index.html?src=' + src"></iframe>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    data () {
        return {

        }
    },
    watch: {
        src(n, o) {
            if(n != o) {
                try {
                    this.$refs.frame.contentWindow.Init()
                } catch(e) {
                    this.$refs.frame.contentWindow.onload = function(e) {
                        e.currentTarget.Init();
                    }
                }
            }
        }
    },
    methods: {

    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .picture-container{position:absolute; left:0; top:0; right:0; bottom:0; width:100%; height:100%; display:block;}
</style>

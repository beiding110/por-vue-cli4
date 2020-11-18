<template>
    <iframe
    ref="frame"
    class="iframe-container"
    :data-src="src"></iframe>
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
            innerSrc: ''
        }
    },
    watch: {
        src(n, o) {
            if(n != o) {
                this.innerSrc = '';
                this.assign();
            } else {
                this.reload();
            };
        }
    },
    methods: {
        assign() {
            if(!this.src) return;

            var frameWin = this.$refs.frame.contentWindow;

            if(this.innerSrc !== this.src) {
                frameWin.location.replace(this.src);
            };
        },
        reload() {
            var frameWin = this.$refs.frame.contentWindow;
            window.location.reload();
        }
    },
    mounted: function() {
        this.assign();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .iframe-container{position:absolute; left:0; top:0; right:0; bottom:0; width:100%; height:100%; display:block;}
</style>

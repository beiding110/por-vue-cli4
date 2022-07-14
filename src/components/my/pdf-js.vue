<template>
    <iframe
        ref="frame"
        class="pdf-container"
        src="./static/plugin/pdfjs/index.html?file="
        :data-src="innerSrc"
    ></iframe>
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
    computed: {
        ts() {
            return '&ts=' + new Date().getTime();
        }
    },
    watch: {
        src(n, o) {
            if(n != o) {
                if(!n) {
                    this.innerSrc = '';
                    this.reload();
                } else {
                    this.assign();
                };
            } else {
                this.reload();
            }
        }
    },
    methods: {
        assign() {
            if(!this.src) return;

            var pdfWin = this.$refs.frame.contentWindow;

            if(this.innerSrc !== this.src) {
                pdfWin.location.replace(`./static/plugin/pdfjs/index.html?file=${this.src}${this.ts}`);
            }
        },
        reload() {
            var pdfWin = this.$refs.frame.contentWindow;

            if (pdfWin.document.readyState === 'complete') {
                this.$refs.frame.contentWindow.webViewerLoad();
            } else {
                pdfWin.location.reload();
            };
        }
    },
    mounted: function() {
        this.assign();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .pdf-container{position:absolute; left:0; top:0; right:0; bottom:0; width:100%; height:100%; display:block;}
</style>

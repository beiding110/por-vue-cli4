<template>
    <div class="file-preview">
        <iframe 
            v-if="showController"
            ref="frame" 
            class="frame" 
            :src="innerSrc"
            :data-src="innerSrc"
        ></iframe>
    </div>
</template>

<script>
export default {
    props: {
        // 文件地址
        src: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            innerSrc: '',

            showController: true,
        };
    },
    computed: {
        ts() {
            return '&ts=' + new Date().getTime();
        },
    },
    watch: {
        src(n, o) {
            if (n !== o) {
                if (!n) {
                    this.reload();
                } else {
                    this.assign();
                }
            } else {
                this.reload();
            }
        },
    },
    methods: {
        assign() {
            if (!this.src) {
                return;
            }

            this.showController = false;

            var fileSrc = this.src;

            if (/\?/.test(fileSrc)) {
                fileSrc = encodeURIComponent(fileSrc);
            }

            this.innerSrc = this.filePreview(fileSrc);
            
            this.$nextTick(() => {
                this.showController = true;
            });
        },
        reload() {
            this.showController = false;

            this.$nextTick(() => {
                this.showController = true;
            });
        },
    },
    mounted: function () {
        this.assign();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.file-preview {
    position: relative;
    width: 100%;
    height: 100%;
    background: #404040;

    .frame{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: block;
        border: none;
    }
}
</style>

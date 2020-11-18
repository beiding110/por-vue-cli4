<template>
    <span id='cnzz_stat_icon_1275340054' :style="conStype"></span>
</template>

<script>
import config from '@config/index'
export default {
    props: {
        hide: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    computed: {
        conStype() {
            return {
                display: this.hide ? 'none' : ''
            }
        }
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    },
    methods: {
        setCnzz() {
            var script = document.createElement('script'),
            protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
            script.src = (protocol + `s5.cnzz.com/z_stat.php?id=${config.cnzz.id}&show=${config.cnzz.show}`);
            script.language = 'javascript';
            document.body.appendChild(script)
        }
    },
    mounted: function() {
        this.setCnzz();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

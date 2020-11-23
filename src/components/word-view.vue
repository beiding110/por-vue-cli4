<template>
    <iframe :src="frameSrc" class="word-view_frame"></iframe>
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
    computed: {
        frameSrc() {
            return (`
                https://view.officeapps.live.com/op/view.aspx?src=${this.src}&ts=${new Date().getTime()}
            `);
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
    .word-view_frame{position:absolute; left:0; top:0; right:0; bottom:0; width:100%; height:100%; display:block;}
</style>

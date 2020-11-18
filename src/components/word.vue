<template>
  <iframe ref="frame" class="pdf-container"
    :src="'https://view.officeapps.live.com/op/view.aspx?src=' + seturl + ts"></iframe>
</template>

<script>
  import func from '../../vue-temp/vue-editor-bridge';
  export default {
    props: {
      src: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ts() {
        return '&ts=' + new Date().getTime();
      }
    },
    watch: {
      src(n, o) {
        if (n != o) {
          this.reload();
        }
      }
    },
    computed: {
      seturl() {
        return encodeURIComponent(this.src)
      }
    },
    methods: {
      reload() {
        // this.$refs.frame.contentWindow.Init();
      }
    },
    mounted: function () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pdf-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
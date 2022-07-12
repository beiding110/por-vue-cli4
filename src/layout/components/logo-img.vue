<template>
    <img 
    class="logo-img"
    :class="{small:small}"
    :src="logoSrc"/>
</template>
<script>
export default {
    props: {
        small: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        logoSrc() {
            return this.small ? './config/logo-small.png' : './config/logo.png';
        }
    }
}
</script>
<style lang="scss" scoped>
.logo-img{display:block; height:30px; margin:10px auto;}
</style>
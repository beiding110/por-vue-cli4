<template>
    <img 
    class="logo-img"
    :class="{small:small}"
    :src="logoSrc"/>
</template>
<script>
import logo from '@/assets/logo.png'
import logoS from '@/assets/logo-small.png'

export default {
    props: {
        small: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        logoSrc() {
            return this.small ? logoS : logo;
        }
    }
}
</script>
<style lang="scss" scoped>
.logo-img{display:block; height:30px; margin:10px auto;}
</style>
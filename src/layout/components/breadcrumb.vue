<template>
     <el-breadcrumb 
     class="top-nav-breadcrumb"
     >
        <template v-for="item in $store.getters.bread">
            <el-breadcrumb-item 
            :key="item.path"
            :to="item.path"
            >
                {{item.title}}
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
export default {
    props: {
        
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
<style scoped lang="scss">
.top-nav-breadcrumb{display:inline-block; line-height:50px; margin-left:20px;}
</style>

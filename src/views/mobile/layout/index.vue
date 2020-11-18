<template>
    <div class="layout">
        <mt-header fixed title="fixed top"></mt-header>
        <div class="view">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menuList: []
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                this.menuList = data;
            })
        }
    },
    mounted: function() {
        this.queryMenu();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout{position:relative; width:100%; height:100%;
    .view{position:absolute; left:0; top:60px; right:0; bottom:0; padding:10px;}
}
</style>

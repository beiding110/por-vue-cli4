<template>
    <div class="infinite-sub-menu">
        <template v-for="childItem in list">

            <template v-if="!!childItem.children">
                <el-submenu :index="childItem.id" :key="childItem.id">
                    <template slot="title">
                        <i class="iconfont" v-if="childItem.imgpath" v-html="childItem.imgpath"></i>
                        <span>{{ childItem.text }}</span>
                    </template>

                    <my-nav-menu :list="childItem.children" :props="props"></my-nav-menu>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="childItem.url" :key="childItem.id">
                    <i class="iconfont" v-if="childItem.imgpath" v-html="childItem.imgpath"></i>
                    <span>{{ childItem.text }}</span>
                </el-menu-item>
            </template>

        </template>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        props: {
            type: Object,
            default: function() {
                return {
                    url: 'url'
                }
            }
        }
    },
    data () {
        return {

        }
    },
    methods: {
        sliceUrl: function (href) {
            if (!!href) {
                if (/list/.test(href)) {
                    return href.split('/').slice(0, -1).join('/');
                } else {
                    return href;
                }
            } else {
                return ''
            }
        }
    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

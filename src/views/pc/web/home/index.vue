<template>
    <div>
        <el-carousel height="590px">
            <el-carousel-item v-for="(item, index) in banners" :key="index">
                <img :src="item.img" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: '首页',
        meta: [
            {
                name: 'description',
                content: '这是首页的描述'
            }, {
                name: 'keyWords',
                content: '这是首页，首页'
            }
        ]
    },
    props: [],
    data () {
        return {
            banners: [
                {
    				img: 'http://www.hgchzx.com/web/img/banner-wechat.jpg'
    			}, {
    				img: 'http://www.hgchzx.com/web/img/banner1.png'
    			}, {
    				img: 'http://www.hgchzx.com/web/img/hzx/banner2.png'
    			}, {
    				img: 'http://www.hgchzx.com/web/img/hzx/banner3.jpg'
                }
            ]
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

</style>

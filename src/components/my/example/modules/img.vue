<template>
    <el-card 
    header="my-img"
    >
        <div class="img-con">
            <my-img
                :data="list"
            ></my-img>

            <my-img
                style="width: 200px;"
                :data="list"
            ></my-img>
        </div>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            list: [
                'https://inews.gtimg.com/newsapp_bt/0/13271995145/1000',
                'https://inews.gtimg.com/newsapp_bt/0/13271995140/1000',
                'https://inews.gtimg.com/newsapp_bt/0/13271995142/1000',
                'https://inews.gtimg.com/newsapp_bt/0/13418343621/1000',
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

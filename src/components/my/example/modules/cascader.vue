<template>
    <el-card 
    header="my-cascader"
    >
        <my-cascader 
            v-model="model"
            :url="`${getGetters('twUrl')}/xzbg/lingying/goodslistselect`" 
            @change="changeHandler"
            placeholder="使用url自动请求数据"
            2way="text"
            :text.sync="syncText"
        ></my-cascader>

        <my-cascader 
            v-model="model"
            :data="data" 
            @change="changeHandler"
            placeholder="使用data绑定数据"
            2way="text"
            :text.sync="syncText"
        ></my-cascader>

        <div>
            v-model绑定的值：{{model}}
        </div>
        <div>
            2way声明后绑定的值：{{syncText}}
        </div>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            model: '',
            syncText: '',
            data: [{"id":"100","text":"签字笔","children":[{"id":"100104","text":"记号笔","children":null},{"id":"100100","text":"0.5签字笔","children":[{"id":"100100101","text":"222","children":null}]},{"id":"100101","text":"0.2签字笔","children":null},{"id":"100102","text":"签字笔","children":null}]},{"id":"112","text":"vvvv","children":null},{"id":"138","text":"11111","children":null},{"id":"139","text":"11232323","children":null},{"id":"103","text":"档案盒","children":[{"id":"103102","text":"11","children":null}]},{"id":"204","text":"圆珠笔","children":null}]
        }
    },
    methods: {
        changeHandler(e) {
            console.log(e)
        }
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

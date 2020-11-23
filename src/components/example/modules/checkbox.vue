<template>
    <el-card 
    header="my-checkbox"
    >
        <div>
            <b>使用action自动请求数据</b>
        </div>
        <my-checkbox 
            v-model="model"
            :action="`${getGetters('sysUrl')}/dictionary/select/pro-zhuanye`" 
            @change="changeHandler"
            :props="{value:'key',label:'value'}"
        ></my-checkbox>

        <div>
            <b>使用data绑定数据</b>
        </div>
        <my-checkbox 
            v-model="model"
            :data="data" 
            @change="changeHandler"
            :props="{value:'key',label:'value'}"
        ></my-checkbox>
        <div>
            v-model绑定的值：{{model}}
        </div>

        <my-checkbox 
            model-str
            str-spliter=",./"
            v-model="modelStr"
            :data="data" 
            @change="changeHandler"
            placeholder="直接绑定字符串"
            :props="{value:'key',label:'value'}"
        ></my-checkbox>
        <div>
            model-str时绑定的值：{{modelStr}}
        </div>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            model: [],
            modelStr: '',
            data: [{"key":"建筑","value":"建筑"},{"key":"暖通","value":"暖通"},{"key":"装饰","value":"装饰"},{"key":"给排水","value":"给排水"},{"key":"电气","value":"电气"},{"key":"消防","value":"消防"},{"key":"园林","value":"园林"},{"key":"市政","value":"市政"},{"key":"设备工程","value":"设备工程"},{"key":"弱电智能化","value":"弱电智能化"}]
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

<template>
    <el-card 
    header="my-radio"
    >
        <div>
            <my-radio
                v-model="model"
                :data="[{key:'10', value:'政府投资'}, {key:'20', value:'企业投资'}, {key:'30', value:'其他'}]"
                :props="{label:'value',value:'key'}"
                2way="value"
                :value.sync="syncValue"
            ></my-radio>
        </div>

        <div>
            <my-radio
                v-model="model"
                :action="`${getGetters('sysUrl')}/dictionary/select/dgcgwjlx`"
            ></my-radio>
        </div>

        <div>
            <my-radio
                v-model="model"
                :data="[{key:'10', value:'政府投资'}, {key:'20', value:'企业投资'}, {key:'30', value:'其他'}]"
                :props="{label:'value',value:'key'}"
                readonly
            ></my-radio>
        </div>

        <div>
            v-model绑定的值：{{model}}
        </div>
        <div>
            2way声明后绑定的值：{{syncValue}}
        </div>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            model: '',
            syncValue: ''
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
    .frame-con{width:100%; height:500px; position:relative;}
</style>

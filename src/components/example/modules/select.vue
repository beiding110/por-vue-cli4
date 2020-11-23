<template>
    <el-card 
    header="my-select"
    >
        <div>
            <my-select
                :url="`${getGetters('sysUrl')}/user/selectsingle`"
                v-model="model"
                :props="{label:'truename', value:'userid'}"
                2way="truename"
                :truename.sync="syncTruename"
            ></my-select>
        </div>
        <div>
            v-model绑定的值：{{model}}
        </div>
        <div>
            2way声明后绑定的值：{{syncTruename}}
        </div>

        <div>
            <my-select
                v-model="valueArr"
                multiple
                :url="`${getGetters('sysUrl')}/user/selectsingle`"
                :props="{label:'truename', value:'userid'}"
            ></my-select>
        </div>
        <div>
            多选时绑定的值：{{valueArr}}
        </div>

        <div>
            <my-select
                v-model="valueArrStr"
                multiple
                model-str
                str-spliter=";,"
                :url="`${getGetters('sysUrl')}/user/selectsingle`"
                :props="{label:'truename', value:'userid'}"
            ></my-select>
        </div>
        <div>
            多选时绑定的字符串：{{valueArrStr}}
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
            syncTruename: '',

            valueArr: [],
            valueArrStr: ''
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

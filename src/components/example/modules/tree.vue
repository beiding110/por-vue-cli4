<template>
    <el-card 
    header="my-tree"
    >
        <my-tree 
            v-model="model"
            @node-click="nodeClickHandler" 
            :url="`${getGetters('sysUrl')}/user/cascader`"
        ></my-tree>

        <my-tree 
            v-model="model"
            checkbox
            @node-click="nodeClickHandler" 
            :data="data"
            :props="{label:'label'}"
        ></my-tree>
        <div>
            选中的行：{{model}}
        </div>
    </el-card>
</template>

<script>
import MyPagination from '../../my-pagination.vue'
export default {
    props: [],
    data () {
        return {
            data: [{
                id: '100',
                label: '一级 1',
                children: [{
                    id: '110',
                    label: '二级 1-1',
                    children: [{
                        id: '111',
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                id: '200',
                label: '一级 2',
                children: [{
                    id: '210',
                    label: '二级 2-1',
                    children: [{
                        id: '211',
                        label: '三级 2-1-1'
                    }]
                }, {
                    id: '220',
                    label: '二级 2-2',
                    children: [{
                        id: '221',
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                id: '300',
                label: '一级 3',
                children: [{
                    id: '310',
                    label: '二级 3-1',
                    children: [{
                        id: '311',
                        label: '三级 3-1-1'
                    }]
                }, {
                    id: '320',
                    label: '二级 3-2',
                    children: [{
                        id: '321',
                        el: '三级 3-2-1'
                    }]
                }]
            }],

            model: []
        }
    },
    methods: {
        nodeClickHandler(node) {
            console.log(node)
        }
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .frame-con{width:100%; height:500px; position:relative;}
</style>

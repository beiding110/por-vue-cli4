<template>
    <el-tree 
        :default-checked-keys="value" 
        @check-change="checkChange" 
        ref="tree" 
        :show-checkbox="checkbox" 
        :node-key="treeProps.id||'id'" 
        :default-expand-all="false" 
        :data="treeData" 
        :props="treeProps"
        :expand-on-click-node="true" 
        @node-click="nodeClick" 
        :filter-node-method="filterNode"
    ></el-tree>
</template>

<script>
export default {
    props: ['value', 'disabled', 'url', 'checkbox', 'top', 'props', 'filtertext', 'data'],
    data: function () {
        return {
            treeData: [],
            treeProps: {
                label: 'text',
                children: 'children'
            },
        }
    },
    computed: {
        bindData: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit("input", val);
            }
        }
    },
    watch: {
        data: {
            handler(val) {
                this.setTreeData(val);
            }, deep: true
        }
    },
    methods: {
        getData: function () { //请求数据
            var that = this;

            if(this.url) {
                this.$get(this.url, function (data) {
                    this.setTreeData(data);
                });
            } else {
                this.setTreeData(this.data);
            }
        },
        setTreeData(data) {
            if (this.top) data.splice(0, 0, {
                id: "0",
                text: "顶级",
                value: "0"
            });
            this.treeData = data;
        },
        nodeClick: function (node) { //节点点击事件
            this.$emit("node-click", node);
        },
        checkChange: function () {
            this.bindData = this.$refs.tree.getCheckedKeys();
        },
        filterNode: function (value, data) {
            if (!value) return true;
            return data.text.indexOf(value) !== -1;
        },
        emitEvent: function (val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted: function () {
        this.treeProps.id = !!this.props ? this.props.id || 'id' : 'id';
        this.treeProps.label = !!this.props ? this.props.label || 'text' : 'text';
        this.treeProps.children = !!this.props ? this.props.children || 'children' : 'children';

        this.getData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

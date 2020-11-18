<template>
    <el-tree v-bind:default-checked-keys="value" @check-change="checkChange" ref="tree" :show-checkbox="inAttr(checkbox)" :node-key="treeProps.id||'id'" :default-expand-all="false" v-bind:data="treeData" v-bind:props="treeProps" v-bind:expand-on-click-node="true" @node-click="nodeClick" :filter-node-method="filterNode"></el-tree>
</template>

<script>
export default {
    props: ["value", "disabled", "typeName", "url", 'checkbox', 'top', 'props', 'filtertext'],
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
    methods: {
        getData: function () { //请求数据
            var that = this;
            // var url = "";
            // if (!this.url) {
            //     if (this.typeName == "Menu") { //菜单管理
            //         url = sysUrl + "/role/getmenutree";
            //     } else if (this.typeName == "TempMenu") { //菜单管理
            //         url = sysUrl + "/role/tempgetmenutree";
            //     } else if (this.typeName == "platMenu") { //菜单管理
            //         url = hzUrl + "/menu/getmenutree";
            //     }
            // } else {
            //     url = this.url;
            // }

            this.url && this.$get(this.url, function (data) {
                if (inAttr(this.top)) data.splice(0, 0, {
                    id: "0",
                    text: "顶级",
                    value: "0"
                });
                that.treeData = data;
            })
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

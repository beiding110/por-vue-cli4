<template>
    <el-button :type="map.type" :icon="map.icon" @click="map.click"><slot>{{map.text}}</slot></el-button>
</template>

<script>
export default {
    props: {
        type: {
            type: String
        }
    },
    data () {
        var that = this;

        return {
            switchObj: {
                edit: {
                    type: 'text',
                    text: '编辑',
                    icon: 'el-icon-edit-outline',
                    click() {
                        that.$emit('click');
                    }
                },
                del: {
                    type: 'text',
                    text: '删除',
                    icon: 'el-icon-delete',
                    click() {
                        ShowConfirm('删除后无法撤销，确认删除操作？', 'warning', () => {
                            that.$emit('click');
                        });
                    }
                },
                detail: {
                    type: 'text',
                    text: '详情',
                    icon: 'el-icon-document',
                    click() {
                        that.$emit('click');
                    }
                },

                new: {
                    type: 'success',
                    text: '添加',
                    icon: 'el-icon-plus',
                    click() {
                        that.$emit('click');
                    }
                },
                gdel: {
                    type: 'danger',
                    text: '批量删除',
                    icon: 'el-icon-minus',
                    click() {
                        ShowConfirm('删除后无法撤销，确认删除操作？', 'warning', () => {
                            that.$emit('click');
                        });
                    }
                }
            }
        }
    },
    computed: {
        map() {
            var type = this.type || '';

            return this.switchObj[type]
        }
    }
}
</script>

<style scoped lang="scss">
</style>

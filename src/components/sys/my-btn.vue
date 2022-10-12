<template>
    <el-button
        :type="map.type"
        :icon="map.icon"
        @click="map.click"
    >
        <slot>{{map.text}}</slot>
    </el-button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
        },
    },
    data() {
        var that = this;

        const CONFIG_BTN = this.$store.state.config.i18n['zh-CN'].btn,
            CONFIG_MSG = this.$store.state.config.i18n['zh-CN'].msg;

        return {
            switchObj: {
                edit: {
                    type: 'text',
                    text: CONFIG_BTN.edit,
                    icon: 'el-icon-edit-outline',
                    click() {
                        that.$emit('click');
                    },
                },
                del: {
                    type: 'text',
                    text: CONFIG_BTN.del,
                    icon: 'el-icon-delete',
                    click() {
                        showConfirm(CONFIG_MSG.del_warning, 'warning', () => {
                            that.$emit('click');
                        });
                    },
                },
                detail: {
                    type: 'text',
                    text: CONFIG_BTN.detail,
                    icon: 'el-icon-document',
                    click() {
                        that.$emit('click');
                    },
                },

                new: {
                    type: 'success',
                    text: CONFIG_BTN.new,
                    icon: 'el-icon-plus',
                    click() {
                        that.$emit('click');
                    },
                },
                gdel: {
                    type: 'danger',
                    text: CONFIG_BTN.gdel,
                    icon: 'el-icon-minus',
                    click() {
                        showConfirm(CONFIG_MSG.del_warning, 'warning', () => {
                            that.$emit('click');
                        });
                    },
                },
            },
        };
    },
    computed: {
        map() {
            var type = this.type || '';

            return this.switchObj[type];
        },
    },
};
</script>

<style scoped lang="scss">
</style>

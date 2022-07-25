<template>
    <el-dialog
        :title="title"
        @opened="opened"
        :width="width"
        :visible.sync="model"
        :append-to-body="true"
        :close-on-click-modal="false"
        @close="close"
        :show-close="showclose"
        :before-close="_beforeClose"
    >

        <slot></slot>

    </el-dialog>
</template>

<script>
export default {
    props: {
        // 弹框标题
        title: {
            type: String,
            default: '',
        },
        // 显示隐藏控制
        value: {
            type: Boolean,
            default: false,
        },
        // 弹框宽度
        width: {
            type: String,
            default: '50%',
        },
        // 展示关闭按钮
        showclose: {
            type: Boolean,
            default: true,
        },
        // 关闭前动作
        beforeClose: {
            type: [Function, Boolean],
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(n, o) {
                this.$emit('input', n);
            },
        },
    },
    methods: {
        _beforeClose: function (done) {
            if (typeof this.beforeClose == 'function') {
                this.beforeClose(done);
            } else {
                done();
            }
        },
        close() {
            this.$emit('close');
        },
        opened() {
            this.$emit('show');
        },
    },
    mounted: function () {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

// my-dialog中包裹的form文件的mixin文件

export default {
    computed: {
        // 默认获取地址栏参数值
        detailExtra() {
            return this.getQuery();
        }
    },
    methods: {
        // 默认取消按钮回调函数
        cancleHandler() {
            this.$router.go(-1);
        }
    }
}

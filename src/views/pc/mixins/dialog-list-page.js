// 带有my-dialog的list文件的mixin

export default {
    data: () => ({
        //dialog显隐控制变量
        dialogVisible: false,

        //dialog中表单绑定用对象变量
        form: {}
    }),
    watch: {
        /**
         * 观察dialogVisible，关闭dialog时进行刷新列表数据
         * @param  {[type]} n [description]
         * @return {[type]}   [description]
         */
        dialogVisible(n) {
            if(!n){
                try{
                    this.reloadHandler();
                } catch(e) {};
            };
        }
    },
    methods: {
        /**
         * 展示my-dialog组件
         */
        dialogShow() {
            this.dialogVisible = true;
        },
        /**
         * 编辑操作，复制行对应数据至form并显示dialog
         * @param  {Object} row 表格中行数据
         */
        editHandler(row) {
            this.form = clone(row);
            this.dialogVisible = true;
        },
        /**
         * 取消操作方法
         */
        cancleHandler() {
            this.$emit('cancle');
        },
        /**
         * 关闭dialog方法
         * @return {[type]} [description]
         */
        dialogClose() {
            this.dialogVisible = false;
        }
    }
}

// my-dialog中包裹的form文件的mixin文件

export default {
    methods: {
        /**
         * 表单点击“取消”后调用方法
         * 向外发送cancle事件，外部组件需监听cancle并作出动作，如监听后调用dialogClose
         */
        cancleHandler() {
            try{
                this.$refs.form.reset();
            } catch(e) {};
            this.$emit('cancle');
        }
    }
}

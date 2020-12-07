// list文件的mixin

function argComputeQuery() {
    var args = [];

    args.push.apply(args, arguments);

    if(getType(args[0]) === 'object') {
        return args[0];
    } else {
        const keys = args.slice(1);

        var querys = keys.reduce((queryObj, key) => {
            queryObj[key] = args[0][key];
            return queryObj;
        }, {});

        return querys;
    };
}

export default {
    data: () => ({
        //表格及分页绑定的列表数据
        tableData: [],
        //搜索绑定的对象数据
        pgData: {

        },
        //自动计算的表格高度
        tableHeight: 0,
        //表格多选结果数组
        multipleSelect: []
    }),
    computed: {

    },
    methods: {
        /**
         * 进入添加界面（默认form)
         * 携带当前页面全部地址参数；
         */
        addHandler(query) {
            var urlQuery = this.getQuery();
                query = query || {};

            mixin(query, urlQuery, true);
            this.goto({
                path: './form',
                query: urlQuery
            });
        },
        /**
         * 进入编辑页面，默认detail
         * 参数为进入detail时携带的地址栏参数
         */
        detailHandler() {
            var args = [];
            args.push.apply(args, arguments);

            var urlQuery = this.getQuery(),
                query = argComputeQuery.apply(argComputeQuery, args);
            mixin(query, urlQuery, true);

            this.goto({
                path: './detail',
                query: urlQuery
            })
        },
        /**
         * 编辑操作，打开form页面并传入参数
         * 参数形式1：row, key1, key2...
         * 参数形式2：{key1:value1, key2:value2...}
         * @return {undefined} undefined
         */
        editHandler() {
            var args = [];
            args.push.apply(args, arguments);

            var urlQuery = this.getQuery(),
                query = argComputeQuery.apply(argComputeQuery, args);
            mixin(query, urlQuery, true);

            this.goto({
                path: './form',
                query: urlQuery
            })
        },
        /**
         * 默认删除方法
         * @param  {String} url     删除接口url
         * @param  {String} rowguid 删除主键值，不传则读取multipleSelection中的主键值
         * @return {undefined}         undefined
         */
        delHandler(url, rowguid) {
            var that = this;
            return (function () {
                if(!rowguid) {
                    // 批量删除
                    if(!that.multipleSelect.length) {
                        ShowMsg('请选择要删除的项');
                        return;
                    };

                    that.$post(url, {
                        id: that.multipleSelect.join(',')
                    }, (data, res) => {
                        ShowMsg(res.msg, 'success');
                        that.reloadHandler();
                    });
                } else {
                    var query = {};
                    if(getType(rowguid) === 'object') {
                        query = rowguid;
                        mixin({
                            oper: 'del'
                        }, query);
                    } else {
                        query = {
                            id: rowguid,
                            oper: 'del'
                        };
                    };

                    // 单个删除
                    that.$post(url, query, (data, res) => {
                        ShowMsg(res.msg, 'success');
                        that.reloadHandler();
                    });
                }
            } ())
        },
        /**
         * 取消方法
         */
        cancleHandler() {
            this.$emit('cancle');
        },
        /**
         * 使用pagination组件自动重新加载
         */
        reloadHandler() {
            this.$refs.page.reload();
        },
        /**
         * 使用pagination组件自动从第一页加载
         */
        searchHandler() {
            this.$refs.page.queryData();
        },
        /**
         * 设置table高度
         */
        setTableHeight() {
            this.tableHeight = (window.innerHeight - 210);
        },

    },
    created() {
        this.setTableHeight();
        window.addEventListener('resize', this.setTableHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setTableHeight);
    },

}

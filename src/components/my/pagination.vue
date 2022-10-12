<template>
    <div class="my-pagination">
        <el-pagination
            layout="prev, pager, next, total"
            :total="total"
            :page-size="!!search ? search[props.pagesize] || defaultSearch[props.pagesize] : defaultSearch[props.pagesize]"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>

<script>
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { Loading } from 'element-ui';

export default {
    props: {
        // 列表数据
        value: {
            type: Array,
            default() {
                return []
            }
        },
        // 请求地址
        action: {
            type: String,
            default: ''
        },
        // 请求参数
        search: {
            type: Object,
            default() {
                return {}
            }
        },
        // 请求前方法
        beforeQuery: {
            type: Function,
            default: function(){}
        },
        // 请求后方法
        afterQuery: {
            type: Function,
            default: function(){}
        },
        // 不立即请求第一页
        lazy: {
            type: Boolean,
            default: false
        },
        // 双向绑定的请求状态
        loading: {
            // 用于双向绑定的加载状态
            type: Boolean,
            default: false
        },
        // 自动在外部table中挂载loading
        useLoading: {
            type: Boolean,
            default: true,
        },
        props: {
            type: Object,
            default: () => ({
                pagesize: 'pagesize',
                pageindex: 'pageindex',
                total: 'total',
                rows: 'rows',
            }),
        },
    },
    data () {
        var props = this.props;

        return {
            total: 1,
            currentPage: 1,
            defaultSearch: {
                sortname: 'addtime',
                sortorder: 'desc',
                [props.pagesize]: 20
            },

            elLoading: null
        };
    },
    computed: {
        pageData: {
            get: function () {
                return this.value;
            },
            set: function (e) {
                this.$emit('input', e);
            }
        }
    },
    methods: {
        queryData: function (page) {
            var that = this;

            NProgress.start();

            if (this.useLoading) {
                let table = this.$parent.$children.filter(item => {
                        return /el-table/.test(item.$el.className)
                    })[0],
                    target = table ? table.$el : '#view-content';

                try {
                    this.elLoading.close();
                } catch (e) {
                    // e
                }
                
                this.elLoading = Loading.service({
                    target,
                    lock: true,
                    text: '数据加载中...'
                });
            }

            this.$emit('update:loading', true);

            this.$nextTick(() => {
                if (!that.action) {
                    console.error('请绑定action属性（数据api请求地址）');

                    return;
                }
                
                let queryPage = this.getQuery('page'),
                    searchData = this.search || {};

                page = queryPage ? queryPage : (page || 1);

                this.currentPage = page;
                searchData[this.props.pageindex] = page;

                searchData = {
                    ...this.defaultSearch,
                    ...searchData,
                };

                !!this.beforeQuery && this.beforeQuery(searchData);

                this.$ajax({
                    url: that.action,
                    data: searchData,
                    callback: (data, res) => {
                        if (data[this.props.rows].length === 0 && this.currentPage !== 1) {
                            this.queryData(--this.currentPage);
                            return;
                        }

                        !!this.afterQuery && this.afterQuery(data[this.props.rows], data);

                        that.$emit('update:loading', false);
                        that.pageData = data[this.props.rows];

                        that.$nextTick(() => {
                            that.total = data[this.props.total];
                        });

                        this.$emit('update:statistics', data.statistics);
                    },
                    complete() {
                        NProgress.done();

                        if (that.useLoading) {
                            that.elLoading.close();
                        }
                    }
                });
            });
        },
        handleCurrentChange: function (e) {
            this.$emit('currentChange', e);
            this.queryData(e);
        },
        reload: function () {
            this.queryData(this.currentPage);
        }
    },
    mounted: function() {
        !this.lazy && this.queryData(1);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.my-pagination{
    text-align:right; 
    margin-top:1em;
}
</style>

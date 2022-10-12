<template>
    <div class="my-search">
        <el-form
        :inline="true"
        :model="pgData"
        size="small"
        >
            <slot></slot>

            <slot name="time">
                <el-form-item>
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        :start-placeholder="timeStartPlaceholder"
                        :end-placeholder="timeEndPlaceholder"
                        popper-class="bd__datepiaker"
                    ></el-date-picker>
                </el-form-item>
            </slot>

            <slot name="title">
                <el-form-item>
                    <el-input
                        v-model="pgData.title"
                        :placeholder="titlePlaceholder"
                        clearable
                    ></el-input>
                </el-form-item>
            </slot>

            <el-form-item>
                <el-button
                type="primary"
                icon="el-icon-search"
                @click="searchHandler"
                >
                    {{$store.state.config.i18n['zh-CN'].btn.search}}
                </el-button>

                <el-button
                    v-if="reset"
                    icon="el-icon-close"
                    @click="resetHandler"
                ></el-button>
                
                <slot name="btn"></slot>
            </el-form-item>

            <slot name="dr"></slot>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        // 双向绑定的搜索表单值
        value: {
            type: Object,
            default: () => ({
                time: [],
                title: '',
            }),
        },
        // 默认title的placeholder
        titlePlaceholder: {
            type: String,
            default: '标题',
        },
        // 默认starttime的placeholder
        timeStartPlaceholder: {
            type: String,
            default: '添加时间早至',
        },
        // 默认endtime的placeholder
        timeEndPlaceholder: {
            type: String,
            default: '添加时间晚至',
        },
        // 是否自动缓存搜搜条件
        alive: {
            type: Boolean,
            default: true,
        },
        // 是否展示重置按钮
        reset: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            defaultSearch: {
                title: '',
                starttime: '',
                endtime: '',
                sortname: '',
                sortorder: 'desc',
            },

            ordinary: {},
        };
    },
    computed: {
        pgData: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        time: {
            get() {
                if (this.value.starttime && this.value.endtime) {
                    return [this.value.starttime, this.value.endtime];
                }

                return [];
            },
            set(val) {
                var starttime = '',
                    endtime = '';

                if (val) {
                    starttime = val[0];
                    endtime = val[1];
                }

                this.pgData.starttime = starttime || '';
                this.pgData.endtime = endtime || '';
            },
        }
    },
    methods: {
        searchHandler: function () {
            if (this.alive) {
                this.storeSearch();
            }
            this.$emit('search');
        },
        resetHandler() {
            this.clearStore();
            
            this.pgData = this.ordinary;
        },
        storeSearch: function () {
            window.setSession(
                'search[' + window.location.hash + ']',
                this.value
            );
        },
        getStoreSearch() {
            return window.getSession(
                'search[' + window.location.hash + ']'
            );
        },
        clearStore() {
            window.setSession(
                'search[' + window.location.hash + ']',
                ''
            );
        },
        combineSearchData() {
            var pgData = {
                ...this.defaultSearch,
                ...this.value,
            };

            return pgData;
        },
        combineStoreData() {
            var searchSession = this.getStoreSearch(),
                pgData;

            if (searchSession) {
                pgData = searchSession;
            } else {
                pgData = this.combineSearchData();
            }

            return pgData;
        },
    },
    created: function () {
        var pgData = this.combineSearchData();

        this.ordinary = pgData;

        if (this.alive) {
            pgData = this.combineStoreData();
        } else {
            pgData = this.ordinary;
        }

        this.pgData = pgData;
    },
    mounted: function () {
        // this.valReCalc(this.pgData);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// 搜索栏样式
.my-search{
    ::v-deep{
        .el-form-item{margin-bottom:10px;}
    }
}
</style>

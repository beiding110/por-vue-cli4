<template>
    <div class="my-search">
        <el-form :inline="true" :model="pgData" size="small">
            <slot></slot>
            <slot name="time">
                <el-form-item>
                    <el-date-picker value-format="yyyy-MM-dd" v-model="pgData.time" type="daterange" range-separator="至" :start-placeholder="timeStartPlaceholder" :end-placeholder="timeEndPlaceholder" popper-class="bd__datepiaker"></el-date-picker>
                </el-form-item>
            </slot>
            <slot name="title">
                <el-form-item>
                    <el-input v-model="pgData.title" :placeholder="titlePlaceholder" clearable></el-input>
                </el-form-item>
            </slot>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">查询</el-button>
                <slot name="btn"></slot>
            </el-form-item>
            <slot name="dr"></slot>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({
                time: [],
                title: '',
            })
        },
        titlePlaceholder: {
            type: String,
            default: '标题'
        },
        timeStartPlaceholder: {
            type: String,
            default: '添加时间早至'
        },
        timeEndPlaceholder: {
            type: String,
            default: '添加时间晚至'
        },
        alive: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            pgData: {
                time: [],
                title: '',
            }
        }
    },
    watch: {
        pgData: {
            handler: function (val) {
                this.valReCalc(val)
            },
            deep: true
        }
    },
    methods: {
        onSearchSubmit: function () {
            if(this.alive) {
                this.storeSearch();
            }
            this.$emit('search');
        },
        storeSearch: function() {
            window.setSession('search[' + window.location.hash + ']', this.value);
        },
        valReCalc: function (val) {
            var n = window.clone(val);
            window.mixin(this.value, n);

            n.starttime = val.time ? val.time[0] || '' : '';
            n.endtime = val.time ? val.time[1] || '' : '';
            n.title = val.title;
            delete n.time;

            n.sortname = (n.sortname || n.sortname === '') ? n.sortname : 'addtime';
            n.sortorder = n.sortorder ? n.sortorder : 'desc';

            n.pagesize = Number(n.pagesize) || 20;

            this.$emit('input', n);

            return n;
        }
    },
    created: function () {
        if (this.alive) {
            var searchSession = window.getSession('search[' + window.location.hash + ']');

            if (searchSession) {
                searchSession.time = (!!searchSession.starttime && !!searchSession.endtime) ? [searchSession.starttime, searchSession.endtime] : [];

                this.pgData = searchSession;
            }
        } else {
            this.valReCalc(this.pgData);
        }
    },
    mounted: function () {
        // this.valReCalc(this.pgData);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

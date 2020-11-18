<template>
    <span class="my__radio">
        <el-radio-group v-model="model" v-if="!readonly" @change="selectChange">
            <template v-for="item in list">
               <el-radio :label="item[props.value]" :key="item[props.value]">{{item[props.label]}}</el-radio>
            </template>
            <slot>

            </slot>
        </el-radio-group>
        <template v-else>
            {{selectedLabel}}
        </template>
    </span>
</template>

<script>
export default {
    props: {
        value: {
            // type: [String, Number],
            default: ''
        },
        action: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        props: {
            type: Object,
            default() {
                return {
                    value: 'key',
                    label: 'value'
                }
            }
        },
        readonly: {
            type: [Boolean, String, Number],
            default: false
        },
        '2way': {
            type: String
        },
    },
    data: function () {
        return {
            list: [],
            options: []
        }
    },
    computed: {
        model: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit('input', val);
            }
        },
        selectedLabel() {
            return this.list.reduce((res, item) => {
                if(item[this.props.value] === this.value) res = item[this.props.label];
                return res
            }, '');
        }
    },
    watch: {
        data: {
            handler: function (n, o) {
                if (n != o) {
                    this.list = n;
                    this.options = this.list2map(n || []);
                }
            },
            deep: true
        }
    },
    methods: {
        queryData: function () {
            if (!!this.action) {
                this.$get(this.action, function (data) {
                    this.list = data;
                    this.options = this.list2map(data || []);
                })
            } else {
                this.list = this.data;
                this.options = this.list2map(this.data || []);
            }
        },
        selectChange: function (item) {
            if(this['2way']) {
                var modelArr = this['2way'].split(',');
                modelArr.forEach(function(key) {
                    this.$emit('update:'+key, (this.options[item] || {})[key])
                }.bind(this));
            };

            this.$emit("select", this.options[item] || {});
        },
        list2map: function (list) {
            var that = this;
            return list.reduce(function (map, item) {
                map[item[that.props.value]] = item;
                return map;
            }, {})
        }
    },
    mounted: function () {
        this.queryData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my__radio{}

    @media screen and (max-width:500px) {
        .my__radio{
            /deep/ .el-radio{margin-left:0; margin-right:1em;}
        }
    }
</style>

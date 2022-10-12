<template>
    <span class="my-radio">
        <el-radio-group v-model="model" v-if="!readonly" @change="selectChange">
            <template v-for="item in list">
                <component
                :is="`el-radio${button ? '-button' : ''}`"
                :label="item[props.value]" 
                :key="item[props.value]"
                >
                    {{item[props.label]}}
                </component>
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
        // 双向绑定值
        value: {
            // type: [String, Number],
            default: ''
        },
        // 自动请求地址
        url: {
            type: String,
            default: ''
        },
        // 选项数据
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        // 配置
        props: {
            type: Object,
            default() {
                return {
                    value: 'key',
                    label: 'value'
                };
            }
        },
        // 只读
        readonly: {
            type: [Boolean, String, Number],
            default: false
        },
        /* 
        使用后的参数，会具备双向绑定功能
        参数应为数据中的键，如[{label: 'label', value: 'value'}]
        如 2way="label"
        :label.sync="form.label"
        */
        '2way': {
            type: String
        },
        button: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            list: [],
            options: []
        };
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
                if (item[this.props.value] === this.value) {
                    res = item[this.props.label];
                }

                return res;
            }, '');
        }
    },
    watch: {
        data: {
            handler: function (n, o) {
                if (n !== o) {
                    this.list = n;
                    this.options = this.list2map(n || []);
                }
            },
            deep: true
        }
    },
    methods: {
        queryData: function () {
            new Chain().link(next => {
                if (this.url) {
                    this.$get(this.url, (data) => {
                        this.list = data;
                        this.options = this.list2map(data || []);

                        next();
                    });
                } else {
                    this.list = this.data;
                    this.options = this.list2map(this.data || []);

                    next();
                }
            }).link(() => {
                if (!this.readonly && this.value) {
                    this.selectChange(this.model);
                }
            }).run();
        },
        selectChange: function (item) {
            if (this['2way']) {
                var modelArr = this['2way'].split(',');

                modelArr.forEach(function(key) {
                    this.$emit('update:'+key, (this.options[item] || {})[key]);
                }.bind(this));
            }

            this.$emit('select', this.options[item] || {});
        },
        list2map: function (list) {
            return list.reduce((map, item) => {
                map[item[this.props.value]] = item;
                return map;
            }, {});
        }
    },
    mounted: function () {
        this.queryData();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my-radio{}

    @media screen and (max-width:500px) {
        .my-radio{
            ::v-deep .el-radio{margin-left:0; margin-right:1em;}
        }
    }
</style>

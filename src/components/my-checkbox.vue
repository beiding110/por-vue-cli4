<template>
    <span class="my__checkbox">
        <span v-if="!inAttr(readonly)">
            <el-checkbox-group v-model="model" style="display:inline-block;">
            	<el-checkbox v-for="item in list" 
                    :key="item[props.value]" 
                    :label="item[props.value]"
                >
                    {{item[props.label]}}
                </el-checkbox>
            </el-checkbox-group>
            <el-checkbox v-model="otherController" style="margin-left:1em;" v-if="inAttr(other)" disabled>
                <el-input v-model="input" placeholder="其它" size="mini"></el-input>
            </el-checkbox>
        </span>
        <span v-else>
            {{readonlyStr}}
        </span>
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: 'my-checkbox',
    props: {
        value: {
            type: [Array, String],
            default() {
                return []
            }
        },
        action: {
            type: String,
            default: ''
        },
        other: {
            type: Boolean,
            default: false
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
            type: Boolean,
            default: false
        },
        all: {
            type: Boolean,
            default: false
        },
        modelStr: {
            type: Boolean,
            default: false
        },
        strSpliter: {
            tyep: String,
            default: ','
        }
    },
    data: function () {
        return {
            list: [],
            otherController: false,

            readonlyStr: ''
        }
    },
    computed: {
        model: {
            get: function () {
                if(this.modelStr) {
                    var valueArr = [];
                    if(getType(this.value) === 'string') {
                        valueArr = this.value.split(this.strSpliter);
                    };
                    if(valueArr[0] === '') {
                        return valueArr.slice(1);
                    } else {
                        return valueArr;
                    };
                } else {
                    return this.other ? this.value.slice(0, -1) : this.value;
                };
            },
            set: function (val) {
                if(this.modelStr) {
                    this.$emit('input', val.join(this.strSpliter));
                    
                    this.$nextTick(() => {
                        this.$emit('change', val.join(this.strSpliter));
                    });
                } else {
                    if (this.other) {
                        var res = clone(val);
                        res.push(this.input);
                    };
                    this.$emit('input', this.other ? res : val);
                    
                    this.$nextTick(() => {
                        this.$emit('change', val.join(this.strSpliter));
                    });
                };
            }
        },
        input: {
            get: function () {
                return this.other ? this.value.slice(-1) : '';
            },
            set: function (n) {
                this.otherController = !!n;

                if (this.other) {
                    var res = clone(this.model);
                    res.push(n);
                };
                this.$emit('input', this.other ? res : val);
                
                this.$nextTick(() => {
                    this.$emit('change', val.join(this.strSpliter));
                });
            }
        },
    },
    watch: {
        data: {
            handler: function (n, o) {
                if (n != o) {
                    this.list = n;
                    this.readonlyStr = this.fetchKey();
                };
            },
            deep: true
        },
        value: function (n, o) {
            this.readonlyStr = this.fetchKey();
        },
        input: function (n, o) {
            if (n.slice(-1) != o.slice(-1) && /,|\/|;|、|，/.test(n.slice(-1))) {
                ShowMsg.call(this, '无效的特殊字符', 'error');
                this.input = o;
            }
        }
    },
    methods: {
        queryData: function () {
            if (!!this.action) {
                this.$get(this.action, function (data) {
                    this.list = data;

                    this.readonlyStr = this.fetchKey();
                })
            } else {
                this.list = this.data;

                this.readonlyStr = this.fetchKey();
            }
        },
        fetchKey: function () {
            var that = this;
            var res = [];
            this.list.forEach(function (item) {
                if (that.all) {
                    res.push(item[that.props.label]);
                } else {
                    if (item[that.props.value] == that.value) {
                        res.push(item[that.props.label]);
                    }
                }

            })
            return res.join(',');
        }
    },
    mounted: function () {
        this.queryData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my__checkbox{

    }

    @media screen and (max-width:500px) {
        .my__checkbox{
            /deep/ .el-checkbox{margin-left:0; margin-right:1em;}
        }
    }
</style>

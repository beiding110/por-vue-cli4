<template>
    <div>
        <el-transfer
            v-if="!readonly"
            v-model="model"
            :data="action ? innerData : data"
            :titles="[title1, title2]"
            :props="reprops"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="快速搜索"
            class="my-transfer"
            :style="{ margin: position === 'center' ? '0 auto' : '' }"
            @change="changeHandler"
        ></el-transfer>

        <template v-else>
            {{selectedLabel}}
        </template>
    </div>
</template>

<script>
export default {
    props: {
        // 双向绑定值
        value: {
            type: [Array, String],
            default: function () {
                return [];
            },
        },
        // 右侧标题
        title2: {
            type: String,
            default: "已选择",
        },
        // 左侧标题
        title1: {
            type: String,
            default: "可选",
        },
        // 自动请求数据地址
        url: {
            type: String,
            default: "",
        },
        // 传入数据
        data: {
            type: Array,
            default: () => []
        },
        // 配置
        props: {
            type: Object,
            default: function () {
                return {
                    key: "key",
                    label: "label",
                };
            },
        },
        // 展示位置
        position: {
            type: String,
            default: "center",
        },
        // 绑定字符串
        modelStr: {
            type: Boolean,
            default: false
        },
        // 绑定字符串时，字符串间链接字符
        strSpliter: {
            type: String,
            default: ','
        },
        /* 
        使用后的参数，会具备双向绑定功能
        参数应为数据中的键，如[{label: 'label', value: 'value'}]
        如 2way="label"
        :label.sync="form.label"
        */
        '2way': {
            type: String,
            default: ''
        },
        // 只读
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data: function () {
        return {
            innerData: [],
            reprops: {
                key: this.props ? this.props.key : 'key',
                label: this.props ? this.props.label : 'label',
            },
            map: {},

            selectedLabel: '',
        };
    },
    computed: {
        model: {
            get: function () {
                var value;
                if(this.modelStr) {
                    value = this.value || '';
                    return value.split(this.strSpliter).reduce((arr, item) => {
                        if(item) {
                            arr.push(item);
                        };

                        return arr;
                    }, []);
                } else {
                    value = this.value || [];
                    return value;
                };
            },
            set: function (e) {
                var value = (e || []).reduce((arr, item) => {
                    if(item) {
                        arr.push(item);
                    };

                    return arr;
                }, []);

                if(this.modelStr) {
                    this.$emit("input", value.join(this.strSpliter));
                } else {
                    this.$emit("input", value);
                };
            },
        },
    },
    watch: {
        action: function () {
            this.queryData();
        },
        data: function(n) {
            this.dataInit(n);
        },
        innerData: {
            handler() {
                this.calcReadonly()
            }, deep: true
        },
        model: {
            handler() {
                this.calcReadonly()
            }, deep: true
        }
    },
    methods: {
        filterMethod: function (query, item) {
            return item[this.reprops["label"]].indexOf(query) > -1;
        },
        queryData: function () {
            if(!this.url) return;
            
            this.$get(this.url, data => {
                this.dataInit(data)
            });
        },
        changeHandler: function (e) {
            var that = this;
            var res = [];
            e.forEach(function (item) {
                res.push(that.map[item]);
            });
            this.$emit("change", res);

            if(this['2way']) {
                var modelArr = this['2way'].split(',');
                modelArr.forEach(function (key) {
                    var updateData = res.reduce(function(arr, i) {
                        arr.push(i[key])
                        return arr;
                    }, []);

                    if(that.modelStr) {
                        updateData = updateData.join(that.strSpliter);
                    };

                    that.$emit('update:' + key, updateData);
                }.bind(this));
            }
        },
        dataInit(data) {
            this.innerData = data;
            data.forEach(item => {
                this.map[item[this.reprops.key]] = item;
            });
        },
        calcReadonly() {
            this.selectedLabel = this.model.reduce((arr, item) => {
                var mapItem = this.map[item];

                if(mapItem) {
                    arr.push(mapItem[this.reprops.label]);
                }

                return arr
            }, []).join(this.strSpliter);
        }
    },
    mounted: function () {
        this.queryData();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-transfer{}
</style>

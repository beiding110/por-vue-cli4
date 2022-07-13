<template>
    <div class="my-bumber-range">
        <el-input 
            :placeholder="`${placeholder}少至`" 
            v-model="modelMin"
            :controls="false"
            type="number"
            :min="0"
            clearable
            @change="updateValue"
        ></el-input>

        <el-input 
            :placeholder="`${placeholder}多至`" 
            v-model="modelMax"
            clearable
            :controls="false"
            type="number"
            :min="0"
            @change="updateValue"
            @clear="clearHandler"
        ></el-input>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        min: {
            type: [String, Number],
            default: '',
        },
        max: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            modelMin: '',
            modelMax: '',
        };
    },
    computed: {
        calcMin() {
            return this.getNum('min', this.modelMin, this.modelMax);
        },
        calcMax() {
            return this.getNum('max', this.modelMin, this.modelMax);
        },
    },
    methods: {
        updateValue() {
            if (this.modelMin === '' || this.modelMax === '') {
                return;
            }

            var min = this.getNum('min', this.modelMin, this.modelMax),
                max = this.getNum('max', this.modelMin, this.modelMax);

            this.modelMin = min;
            this.modelMax = max;

            this.$emit('update:min', this.modelMin);
            this.$emit('update:max', this.modelMax);
        },
        getNum(method, num1, num2) {
            return Math[method](Number(num1), Number(num2));
        },
        clearHandler() {
            this.$emit('update:min', '');
            this.$emit('update:max', '');

            this.modelMin = '';
            this.modelMax = '';
        },
    },
    created() {
        if (this.max === '' || this.min === '') {
            return;
        }

        this.modelMin = this.getNum('min', this.min, this.max);
        this.modelMax = this.getNum('max', this.min, this.max);
    }
};
</script>

<style lang="scss">
    .my-bumber-range{
        display: flex;

        // .el-input-number{
        //     flex: 1;

        //     .el-input__inner{
        //         border-radius: 0;
        //     }

        //     &:first-child {
        //         .el-input__inner{
        //             border-top-left-radius: 4px;
        //             border-bottom-left-radius: 4px;
        //         }
        //     }

        //     &:last-child {
        //         .el-input__inner{
        //             border-top-right-radius: 4px;
        //             border-bottom-right-radius: 4px;
        //             margin-left: -1px;
        //         }
        //     }
        // }

        width: 300px;

        .el-input{
            flex: 1;

            .el-input__inner{
                border-radius: 0;
                border-right: 0;
            }

            &:first-child {
                .el-input__inner{
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
            }

            &:last-child {
                .el-input__inner{
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    border-right: 1px solid #DCDFE6;
                }
            }
        }
    }
</style>
<template>
    <my-form
    readonly
    table
	ref="form"
	v-model="form"
    class="form-page"
    >
        <my-form-item-group title="组1">
            <el-form-item label="输入" prop="input" >
                输入
            </el-form-item>

            <el-form-item label="数字" prop="number" >
                123
            </el-form-item>

            <el-form-item label="单选" prop="xmlx" >
                备选项
            </el-form-item>

            <el-form-item label="多选" prop="xmlx" >
                复选框 A,复选框 B
            </el-form-item>

            <el-form-item label="下拉选择" prop="number" >
                北京烤鸭
            </el-form-item>

            <el-form-item label="级联" prop="number" >
                侧向导航
            </el-form-item>
                        
            <el-form-item class="table-full-row" label="文本框" prop="gz_content" >
                文本框
                文本框
                文本框
            </el-form-item>
        </my-form-item-group>
        
        <my-form-item-group title="组2">
            <el-form-item label="开关" prop="yzlx" >
                按年付费
            </el-form-item>

            <el-form-item label="日期" prop="yzlx" >
                2022-06-29
            </el-form-item>

            <el-form-item class="table-full-row" label="日期范围" prop="yzlx" >
                2022-06-29
                至
                2022-06-30
            </el-form-item>

            <el-form-item class="table-full-row" label="评分" prop="yzlx" >
                <el-rate value="3.5" disabled allow-half score-template="3.5"></el-rate>
            </el-form-item>
        </my-form-item-group>

	</my-form>
</template>

<script>
import FORM_PAGE_MIXIN from '@mixins/form-page'

export default {
    mixins: [ FORM_PAGE_MIXIN ],
    components: {},
    props: {
        row: {
            type: Object,
            default: () => ({})
        },
        bsk: {
            type: Boolean,
            default: false
        },
        dialog: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        form: {
            shyj: '',
            // isbsk: true
        }
    }),
    methods: {
        saveHandler(type, cb) {

            cb && cb();
        },
        beforeSend(send, deny) {
            send();
        },
        cancleHandler() {
            this.$router.go(-1);
        }
    },
    created() {

    }
}
</script>

<style scoped lang="scss">

</style>

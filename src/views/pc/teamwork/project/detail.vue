<template>
    <my-form
    readonly
    table
	ref="form"
	v-model="form"
    class="form-page"
    :detail-url="`${getGetters('twUrl')}/xmgl/project/detail`"
    :detail-extra="detailExtra"
    >
        <my-form-item-group title="项目信息">
            <el-form-item label="项目名称" prop="proname">
                {{form.proname}}
            </el-form-item>
            <el-form-item label="项目类型" prop="xmlx">
                {{form.workflowtype}}
            </el-form-item>
        </my-form-item-group>

        <my-form-item-group title="业主信息">
            <el-form-item label="业主类型" prop="yzlx" required change>
                {{form.yzlx}}
            </el-form-item>
        </my-form-item-group>

	</my-form>
</template>

<script>
import FORM_PAGE_MIXIN from '@views/pc/mixins/form-page'

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

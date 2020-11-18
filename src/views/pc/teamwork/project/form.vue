<template>
    <my-form
	ref="form"
	v-model="form"
	class="form-page"
    :submit-url="`${getGetters('twUrl')}/xmgl/project/add`"
    :detail-url="`${getGetters('twUrl')}/xmgl/project/detail`"
    @cancle="cancleHandler"
    :detail-extra="detailExtra"
    >
		<el-card shadow="never">
			<h4 class="form-title">项目信息</h4>
			<el-row>
				<el-col :sm="12" :xs="24">
					<el-form-item label="项目名称" prop="proname" :rules="newRule('项目名称' ,'required')">
				    	<el-input v-model="form.proname"></el-input>
				  	</el-form-item>
				</el-col>
				<el-col :sm="12" :xs="24">
					<el-form-item label="项目类型" prop="xmlx" :rules="newRule('项目类型' ,'required')">
						<my-select
						v-model="form.xmlx"
						placeholder="项目类型"
						:props="{label:'key', value:'key'}"
						:url="`${getGetters('twUrl')}/xmgl/project/xmlxlist`"
						2way="value"
						:value.sync="form.workflowtype"
						@select="form.ywlx = '造价'"></my-select>
				  	</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="工作内容" prop="gz_content" :rules="newRule('工作内容' ,'required')">
		    	<el-input type="textarea" v-model="form.gz_content"></el-input>
			</el-form-item>
		</el-card>

		<el-card shadow="never">
			<h4 class="form-title">业主信息</h4>
			<el-row>
				<el-col :sm="12" :xs="24">
					<el-form-item label="业主类型" prop="yzlx" :rules="newRule('业主类型' ,'required')">
					    <my-select :url="`${getGetters('sysUrl')}/dictionary/select/yzlx`" v-model="form.yzlx"></my-select>
				  	</el-form-item>
				</el-col>
			</el-row>
	  	</el-card>
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
    computed: {
        detailExtra() {
            return {
                rowguid: this.getQuery('rowguid')
            };
        }
    },
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

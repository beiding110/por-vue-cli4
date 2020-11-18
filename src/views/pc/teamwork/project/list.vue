<template>
    <el-card>
        <my-search v-model="pgData" @search="searchHandler">
            <template slot="btn">
                <my-btn type="new" @click="addHandler">新增</my-btn>

                <el-button type="default">default</el-button>
                <el-button type="primary">primary</el-button>
                <el-button type="success">success</el-button>
                <el-button type="warning">warning</el-button>
                <el-button type="danger">danger</el-button>
            </template>
        </my-search>

        <action-row>
            <el-button type="danger" v-if="$au.isAdmin()">我是管理员(if)</el-button>
            <el-button type="danger" v-admin>我是管理员(directive)</el-button>
        </action-row>

        <my-table
		:data="tableData"
		:height="tableHeight"
        v-loading="loadingController"
        >
			<el-table-column prop="proname" label="项目名称" sortable min-width="180" fixed="left" key="proname">
				<template slot-scope="scope">
                    <el-button type="text" @click="detailHandler({rowguid:scope.row.procode})">{{scope.row.proname}}</el-button>
                </template>
			</el-table-column>

			<template>
				<el-table-column prop="procode" label="项目编码" min-width="180" key="procode"></el-table-column>
				<el-table-column prop="yzdw" label="合作单位" min-width="120" sortable key="yzdw"></el-table-column>
				<el-table-column prop="hangye" label="行业类型" min-width="120" sortable key="hangye"></el-table-column>
				<el-table-column prop="scale" label="规模" min-width="120" sortable key="guimo"></el-table-column>
				<el-table-column prop="scaleunit" label="规模单位" sortable min-width="120" key="until"></el-table-column>
				<el-table-column prop="cityname" label="所在区域" sortable min-width="120" key="cityname"></el-table-column>
			</template>

			<el-table-column prop="xmlx" label="项目类型" sortable min-width="120" key="xmlx"></el-table-column>
			<el-table-column prop="prousername" sortable label="项目经理" min-width="120" key="prousername"></el-table-column>

			<template>
				<el-table-column label="成果信息" min-width="200" key="dinggao">
					<template slot-scope="scope">
						<div v-for="item in scope.row.projectdinggaolist" class="dinggao">
							{{item.customizecode ? item.customizecode + '-' : ''}}
							{{item.filename}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="zaojiae" label="造价额（元）" sortable min-width="140" key="zaojiae"></el-table-column>
				<el-table-column prop="addusername" label="添加人" sortable min-width="120" key="addusername"></el-table-column>
				<el-table-column prop="addtime" label="添加时间" sortable min-width="120" key="addtime">
					<template slot-scope="scope">{{ timeToDate(scope.row.addtime) }}</template>
				</el-table-column>
                <el-table-column label="操作" min-width="100" fixed="right">
					<template slot-scope="scope">
						<btn-builder :row="scope.row" :config="btnConfig"></btn-builder>
					</template>
				</el-table-column>
			</template>
		</my-table>

		<!-- 分页 -->
        <my-pagination
            v-model="tableData"
            :action="$store.getters.twUrl + '/xmgl/project/powerpagelist'"
            :search="pgData"
            ref="page"
            :loading.sync="loadingController"
        ></my-pagination>
    </el-card>
</template>

<script>
import LIST_MIXIN from '@pc/mixins/list-page'

import BTN_CONFIG from './config/btn-list'

export default {
    mixins: [ LIST_MIXIN ],
    props: [],
    data () {
        return {
            tableData: [],
			pgData:{
				proname:'' ,//项目名称
				xmlx:'' ,//项目类型
				shstate: '',
				onlyshowhistory: false,
			},

            btnConfig: BTN_CONFIG,

            loadingController: false
        }
    },
    computed: {

    },
    methods: {

    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

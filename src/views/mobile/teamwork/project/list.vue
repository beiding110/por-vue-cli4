<template>
    <el-card>
        <el-button type="default">default</el-button>
        <el-button type="primary">primary</el-button>
        <el-button type="success">success</el-button>
        <el-button type="warning">warning</el-button>
        <el-button type="danger">danger</el-button>

        <div>
            <el-button type="danger" v-if="$au.isAdmin()">我是管理员(if)</el-button>
            <el-button type="danger" v-admin>我是管理员(directive)</el-button>
        </div>

        <el-table
			:data="tableData"
			border
			:height="autoHeight">
				<el-table-column prop="proname" label="项目名称" sortable min-width="180" fixed="left" key="proname">
					<template slot-scope="scope">
                        <!--<el-input v-model="scope.row.title" size="mini"></el-input>-->
						<a class="a-btn" @click="win.g('detail.html?code='+scope.row.procode)">
							{{scope.row.proname}}
						</a>
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
				<!-- <el-table-column prop="xmcynames" label="项目助理" min-width="150"></el-table-column> -->

				<el-table-column label="项目情况" key="xmqk">
					<el-table-column label="成果数" width="70" key="cg">
						<template slot-scope="scope">
							<div class="t-center">
								<template v-if="scope.row.shbj=='1'">
									<el-tooltip effect="lignt" :content="'该项目已有成果数：' + scope.row.projectdinggaonumber" placement="top">
										<el-tag :type="!!scope.row.projectdinggaonumber ? 'success' : 'warning'">
											{{scope.row.projectdinggaonumber}}
										</el-tag>
									</el-tooltip>
								</template>
								<template v-else>
									<el-tag type="info">空</el-tag>
								</template>
							</div>
						</template>
					</el-table-column>
				</el-table-column>

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
				</template>
			</el-table>

			<!-- 分页 -->
            <my-pagination v-model="tableData" :action="$store.getters.twUrl + '/xmgl/project/powerpagelist'" :search="pgData" ref="page"></my-pagination>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            tableData: [],
			pgData:{
				proname:'' ,//项目名称
				xmlx:'' ,//项目类型
				shstate: '',
				onlyshowhistory: false,
				pagesize: 15
			},
        }
    },
    computed: {
		autoHeight: function() {
			return (window.top === window) ? (window.innerHeight - 260) : (window.innerHeight - 200);
		}
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

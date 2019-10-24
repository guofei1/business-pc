<template>
    <div class="page bg-white" style="min-height:500px;">
		<div style="padding:20px;">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
			  <template v-for="(item, key) in embread">
				<router-link to="'/lists/' + item.id ">{{item.categoryname}}</router-link>
			  </template>
			</el-breadcrumb>
		</div>
        <div style="padding:20px;">
            <el-row style="margin-top:10px;">
                <el-button-group>
					<el-button type="primary">分类</el-button>
					<template v-for="(item, key) in subnav">
					<router-link class="el-button" size="small" :to="'/lists/' + item.id ">{{item.categoryname}}</router-link>
					</template>
				</el-button-group>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="5">
                <template v-for="(item, key) in productionData">
                    <el-col :span="6" :key="key">
                    <router-link :to="'/detail?id='+item.id">
                        <el-card :body-style="{ padding: '0px' }" class="item-production">
                            <el-image :src="item.productionphoto">
                                <div slot="placeholder" class="image-slot">
                                    <img src="/static/images/loading.gif">
                                </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{item.productiontitle}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{item.addtime|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{item.productionprice}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </router-link>
                    </el-col>
                </template>
            </el-row>
            <el-row v-if="this.scrollbottom > 0">
                <i class="el-icon-loading"></i>
            </el-row>
            <el-row v-if="this.scrollbottom < 0">
                <el-divider content-position="center">我是有底线的</el-divider>
            </el-row>
        </div>
    </div>
</template>
<script>
import {getArrChildById, getChildCategoryInfo, getPid, getEmbreadInfo} from '@/utils/index'
export default {
    data () {
        return {
            currentPage:1,
            pageSize: 8,
            totalPages: 1,
            productionData: [],
			subnav: [],
			embread: []
        }
    },
    computed: {
        scrollbottom () {
            return this.$store.state.scrolltimes
        }
    },
    mounted () {
        // 监控的是 从别的路由进来
        this.getData()
    },
    methods: {
        getData () {
            let categoryid = this.$route.params.id
            console.log(categoryid)
			let childs = getArrChildById(categoryid)
			console.log(childs)
			
            this.axios.get('/api/production/getDataByCategoryIds', {
                params: {
                    categoryid: ids,
                    pagesize: this.pageSize,
                    currentpage: this.currentPage
                }
            }).then((data) => {
                if (data.data.code === 0) {
                    data.data.data.listdata.forEach((item) => {
                        this.productionData.push(item)
                    })
                    this.pageSize = parseInt(data.data.data.pagesize)
                    this.currentPage = parseInt(data.data.data.currentpage)
                    this.totalPages = parseInt(data.data.data.totalpages)
                } else {
                    this.$message({message: '网络繁忙请重试', type:'warning'})
                }
                this.$store.commit('scrollBottonInit', 0)
            }).catch((error) => {
                this.$router.push('/error')
            })
        }
    },
    watch: {
        $route (to, from) {
            this.productionData = []
            this.getData()
        },
        scrollbottom () {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++
                this.getData()
            } else {
                this.$store.commit('scrollBottonInit', -1)
            }
        }
    }
}
</script>
<style scoped>
.item-production{
    margin-top:5px!important;
}
.el-image{
    height: 205px;
    overflow: hidden;
}
.el-image >>> img{
    width: 100%;
    height: auto;
}
.el-card >>> .title-production{
    height: 42px;
    overflow: hidden;
    padding-bottom: 5px;
    font-size: 14px;
}
.el-card >>> .title-production a{
    color:#333 !important;
}
.el-card >>> a:link, .el-card >>> a:visited{
    color:#333
}
.addtime-production{
    float: right;
    font-size: 14px;
}
.price-production{
    color:#f40;
}
</style>
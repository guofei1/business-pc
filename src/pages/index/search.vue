<template>
		<div class="center page">
		    <el-row>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item to="/">平台首页</el-breadcrumb-item>
                  <el-breadcrumb-item>搜索</el-breadcrumb-item>
                </el-breadcrumb>
		    </el-row>
            <el-row :gutter="5"  v-if="listData.length > 0">
                <el-col :span="6" v-for="(item, key) in listData"
                    :key="item.id"
                    >
                        <div class="pro-info" :key="key">
                            <div class="pro-cover">
                                <img :src="item.productionphoto">
                            </div>
                            <div class="pro-title">
                            {{item.productiontitle}}
                            </div>
                            <div class="pro-price">
                                ￥{{item.productionprice}}
                            </div>
                        </div>
                </el-col>
            </el-row>
		</div>
</template>

<script>
export default {
    name:"lists",
    data(){
        return {
            keywords: '',
            listData: [],
            totalRows:0,
            currentPage:1,
            pageSize:16
        }
    },
    created() {
        this.keywords = this.$route.query.keywords;
        this.pageInit();
    },
    beforeRouteUpdate (to, from, next) {
        this.keywords = this.$route.query.keywords;
        this.pageInit();
        next();
    },
    methods: {
       pageInit() {

            this.axios.get('/api/production/getSearchData', {params:{
                keywords: this.keywords,
                currentpage: this.currentpage,
                pagesize:16
            }})
            .then(function (response) {
                if (response.data.code == 0) {
                    this.listData = response.data.data.listdata
                    this.totalRows = parseInt(response.data.data.totalrows);
                    this.currentPage = parseInt(response.data.data.currentpage);
                    this.pageSize = parseInt(response.data.data.pagesize);
                } else {
                    this.$message(response.data.msg, 'error');
                }
            }.bind(this))
            .catch(function (error) {
                this.$message('服务器繁忙，请稍后重试');
            }.bind(this));
       }
    }
}
</script>

<style scoped>
.el-breadcrumb{ line-height:50px; background:#eee; padding-left:20px; margin:10px auto;}
.filters{ margin:10px auto;}
.pro-list{ padding:20px;}
.ordersrule{ backgroud:#f60!important; margin-bottom:20px;}
</style>

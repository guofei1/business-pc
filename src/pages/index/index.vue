<template>
    <div style="overflow:auto; height:100%;" class="infinite-list" v-infinite-scroll="load" infinite-scroll-delay="1000">
        <el-container class="bg-gray border-bottom">
            <div class="page">
                <el-row class="toplink">
                    <el-col :span="12">
                        服务热线：400-000-0000
                    </el-col>
                    <el-col :span="12" class="help">
                        <template v-if="this.$store.state.userInfo.id">
                             欢迎 {{this.$store.state.userInfo.username}} |
                             <router-link to="/member">个人中心</router-link>
                        </template>
                        <template v-else>
                            你好,请<router-link to="/login">登录</router-link> | 
                            <router-link to="/register">注册</router-link>
                        </template>
                    </el-col>
                </el-row>
            </div>
        </el-container>
        <el-container class="bg-white">
            <div class="page">
                <el-row class="logo">
                    <el-col :span="6">
                        <img :src="require('@/assets/images/logo.png')">
                    </el-col>
                    <el-col :span="12">
                        <el-autocomplete
                        v-model="keywords"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                        style="width:100%; margin-top:20px;"
                        >
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-autocomplete>
                    </el-col>
                    <el-col :span="6">
                        <el-badge :value="this.$store.getters.cartTotalNum" class="cart">
                        <el-button  @click="mycart" id="cartButton">我的购物车</el-button>
                        </el-badge>
                    </el-col>
                </el-row>
                <el-row class="nav">
                    <keep-alive>
                        <el-menu default-active="/index" class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item index="/index" style="width:200px; text-align:center;">所有分类</el-menu-item>
                        <template v-for="(item, key) in navData">
                            <el-menu-item :index="'/lists/'+item.id" :key="key">
                            {{item.categoryname}}
                            </el-menu-item>
                        </template>
                        </el-menu>
                    </keep-alive>
                </el-row>
            </div>
        </el-container>
        <div>
            <keep-alive>
            <router-view name="main" />
            </keep-alive>
        </div>
        <el-container class="bg-dark">
            <div class="page">
            <el-row class="footer">
                <p>京公网安备 11000002000088号|京ICP证070359号|互联网药品信息服务资格证编号(京)-经营性-2014-0008|新出发京零 字第大120007号</p>
                <p>互联网出版许可证编号新出网证(京)字150号|出版物经营许可证|网络文化经营许可证京网文[2014]2148-348号|违法和不良信息举报电话：4006561155</p>
                <p>Copyright © 2004 - 2019  京东JD.com 版权所有|消费者维权热线：4006067733经营证照|(京)网械平台备字(2018)第00003号|营业执照</p>
                <p>京东旗下网站：京东钱包|京东云</p>
            </el-row>
            </div>
        </el-container>
    </div>
</template>
<script>
export default {
    data () {
       return {
           keywords:'',
           navData: this.$store.state.navData
       }
    },
    mounted () {
        if (this.$route.path === '/') {
            this.$router.push('/index')
        }
        this.getNav()
    },
    methods: {
        getNav () {
            if (this.$store.state.navData.length  < 1) {
                this.axios.get('/api/category/getChildrenData')
                .then((data) => {
                    if (data.data.code === 0) {
                        this.$store.commit('setNav', data.data.data)
                    }
                })
                .catch ((error) => {

                })
            }
        },
        load () {
            this.$store.commit('scrollLoad')
        },
        mycart () {
            if (this.$store.state.userInfo.id) {
                this.$router.push('/mycart')
            } else {
                this.$alert('您尚未登录请先登录', '提示')
            }
        },
        querySearch(queryString, cb) {
            this.axios.get('/api/production/search', {params:{
                keywords: queryString
            }})
            .then(function (response) {
                if (response.data.code == 0) {
                    cb(response.data.data);
                } else {
                    cb([])
                }
            })
            .catch(function (error) {
                cb([]);
            })
        },
        search () {
            if (this.keywords != '') {
                this.$router.push({path:'/search', query:{keywords:this.keywords}});
            } else {
                this.$message({message:'请输入关键字', type:'warning'})
            }
        }
    }
}
</script>
<style scoped>
.el-menu, .el-menu-item{
    height: 50px;
    line-height: 50px;
}
.page{
    width: 1170px;
    margin: 0 auto;
}
.toplink {
    font-size:14px;
    height: 25px;
    line-height: 25px;
}
.toplink a{
    color:#333;
}
.toplink a:link, .toplink a:visited{
    color:#333;
}
.toplink .help{
    text-align: right;
}
.logo{
    height:60px;
    margin-top:10px;
    overflow: hidden;
}
.logo .el-input{ 
    margin-top:10px;
}
.logo .cart{
    float:right;
    margin-top:10px;
    margin-right: 20px;
}
.footer{
    color:#fff;
    text-align: center;
    font-size: 14px;
}
</style>

<template>
    <div>
        <div class="banner-container">
            <el-carousel :interval="5000" arrow="always" :height="height">
                <el-carousel-item v-for="(item, key) in banner" :key="key" :style="item.bg">
                    <div class="page">
                        <img :src="item.src">
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="category-container">
                <ul>
                    <template v-for="(item, key) in navData">
                        <li :key="key">
                            <router-link :to="'/lists/'+item.id">
                            {{item.categoryname}}
                            </router-link>
                            <div>
                                <ol>
                                    <li v-for="(subitem, subkey) in item.children" :key="subkey">
                                    <router-link :to="'/lists/'+subitem.id">
                                        {{subitem.categoryname}}
                                    </router-link>
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="page">
            <div class="produciton-page">
            <el-divider content-position="left">男装</el-divider>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" class="cover-production">
                        <router-link :to="'/detail?id='+nanzhuangData[0]['id']">
                            <el-image :src="nanzhuangData[0]['productionphoto']" class="cover-image">
                            <div slot="placeholder" class="image-slot">
                                <img src="/static/images/loading.gif">
                            </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{nanzhuangData[0]['productiontitle']}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{nanzhuangData[0]['addtime']|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{nanzhuangData[0]['productionprice']}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="5">
                     <template v-for="(item, key) in nanzhuangData">
                         <el-col :span="6" v-if="key>0" :key="key">
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
                </el-col>
            </el-row>
            </div>
            <div class="produciton-page">
            <el-divider content-position="left">女装</el-divider>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" class="cover-production">
                        <router-link :to="'/detail?id='+nvzhuangData[0]['id']">
                            <el-image :src="nvzhuangData[0]['productionphoto']" class="cover-image">
                            <div slot="placeholder" class="image-slot">
                                <img src="/static/images/loading.gif">
                            </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{nvzhuangData[0]['productiontitle']}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{nvzhuangData[0]['addtime']|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{nvzhuangData[0]['productionprice']}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="5">
                     <template v-for="(item, key) in nvzhuangData">
                         <el-col :span="6" v-if="key>0" :key="key">
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
                </el-col>
            </el-row>
            </div>
            <div class="produciton-page">
            <el-divider content-position="left">运动</el-divider>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" class="cover-production">
                        <router-link :to="'/detail?id='+yundongData[0]['id']">
                            <el-image :src="yundongData[0]['productionphoto']" class="cover-image">
                            <div slot="placeholder" class="image-slot">
                                <img src="/static/images/loading.gif">
                            </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{yundongData[0]['productiontitle']}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{yundongData[0]['addtime']|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{yundongData[0]['productionprice']}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="5">
                     <template v-for="(item, key) in yundongData">
                         <el-col :span="6" v-if="key>0" :key="key">
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
                </el-col>
            </el-row>
            </div>
            <div class="produciton-page">
            <el-divider content-position="left">女鞋</el-divider>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" class="cover-production">
                        <router-link :to="'/detail?id='+nvxieData[0]['id']">
                            <el-image :src="nvxieData[0]['productionphoto']" class="cover-image">
                            <div slot="placeholder" class="image-slot">
                                <img src="/static/images/loading.gif">
                            </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{nvxieData[0]['productiontitle']}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{nvxieData[0]['addtime']|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{nvxieData[0]['productionprice']}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="5">
                     <template v-for="(item, key) in nvxieData">
                         <el-col :span="6" v-if="key>0" :key="key">
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
                </el-col>
            </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import timeformate from '@/filters/index'
export default {
    data() {
        return {
            height: '400px',
            navData: this.$store.state.navData,
            banner: [
                {
                    url: '/lists',
                    src: require('@/assets/images/banner1.jpg'),
                    bg: {backgroundColor: '#fcb9c2'}
                },
                 {
                    url: '/lists',
                    src: require('@/assets/images/banner2.jpg'),
                    bg: {backgroundColor: '#fdfdfd'}
                }
            ],
            nanzhuangData: [],
            nvzhuangData: [],
            yundongData: [],
            nvxieData: [],
        }
    },
    filters: {
        timeformate
    },
    mounted () {
        this.getProductionData()
    },
    methods: {
        getProductionData () {
            this.axios.get('/api/production/getDataByCategoryIds', {
                    params: {
                        // 男装
                        categoryid: [3, 26, 33],
                        pagesize:9
                    }
                }
            ).then((data) => {
                if (data.data.code === 0) {
                    this.nanzhuangData = data.data.data.listdata
                    return this.axios.get('/api/production/getDataByCategoryIds', {
                        params: {
                            // 女装
                            categoryid: [34, 35],
                            pagesize: 9
                        }
                    })
                } else {
                    //throw error()
                }
            }).then((data) => {
                console.log(data)
                if (data.data.code === 0) {
                    this.nvzhuangData = data.data.data.listdata
                    return this.axios.get('/api/production/getDataByCategoryIds', {
                        params: {
                            // 运动
                            categoryid: [40, 41,42,43,44],
                            pagesize:9
                        }
                    })
                } else {
                    //throw error()
                }
            }).then((data) => {
                if (data.data.code === 0) {
                    this.yundongData = data.data.data.listdata
                    return this.axios.get('/api/production/getDataByCategoryIds', {
                        params: {
                            // 女鞋
                            categoryid: [45, 46,47],
                            pagesize:9
                        }
                    })
                } else {
                    //throw error()
                }
            }).then((data) => {
                if (data.data.code === 0) {
                    this.nvxieData = data.data.data.listdata
                } else {
                    //throw error()
                }
            }).catch((error) => {
                console.log(error)
                //this.$router.push('/error')
            })
        }
    }
}
</script>
<style scoped>
.banner-container{
    width: 100%;
    height: 400px;
}
.el-carousel{
    height: 400px;
}
.el-carousel-item{
    height: 400px;
}
.banner-container .category-container{
    position: relative;
    width: 1170px;
    margin: 0 auto;
    top:-400px;
    z-index: 1000000;
}
.banner-container .category-container ul{
    margin:0;
    padding:0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    color:#333;
    width: 200px;
    height: 400px;
}
.banner-container .category-container ul li {
    height: 30px;
    line-height: 30px;
    text-indent: 20px;
}
.banner-container .category-container ul li div{
    position: absolute;
    display: none;
    background: #fff;
    color:#333;
    left:200px;
    top:0;
    width: 970px;
    height: 400px;
}
.banner-container .category-container ul li div a{
    color:#333;
}
.banner-container .category-container ul li:hover div{
    display: block
}

.page{
    width:1170px;
    margin:0 auto;
    background: #fff;
}
.produciton-page{
    padding:10px;
}
.page img{
    width: 100%;
}
.category-container ul li a{
    color:#fff;
    text-decoration: none;
}
.cover-production{
    height: 616px;
    overflow: hidden;
    margin-top:5px;
}
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
.cover-image{
    height: 505px;
    overflow: hidden;
}
.cover-image >>> img {
    height: 100%;
    width: auto!important;
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
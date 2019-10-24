<template>
    <div class="page">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
        <p class="circle" v-show="transitionshow"></p>
        </transition>
        <el-row :gutter="10" class="bg-white produciton-page">
            <el-col :span="19" style="border-right:1px solid #eee;">
                <el-divider></el-divider>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-image :src="detailData.productionphoto">
                            <div slot="placeholder" class="image-slot">
                                <img src="/static/images/loading.gif">
                            </div>
                        </el-image>
                    </el-col>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="24" class="production-title">
                                {{detailData.productiontitle}}
                            </el-col>
                            <el-col :span="24" class="production-addtime">
                               <el-tag>上架时间</el-tag> 
                               <el-tag type="info">{{detailData.addtime}}</el-tag>
                            </el-col>
                            <el-col :span="24" class="production-price">
                                <el-tag>产品价格</el-tag> 
                                <el-tag type="info">{{price}}</el-tag>
                            </el-col>
                            <el-col :span="24" class="production-size">
                                <el-tag>产品尺码</el-tag>
                                <el-radio-group v-model="size" size="small">
                                    <template v-for="(item,key) in detailData.productionsize">
                                        <el-radio-button :label="item" :key="key"></el-radio-button>
                                    </template>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="24" class="production-color">
                                <el-tag>产品颜色</el-tag>
                                <el-radio-group v-model="color" size="small">
                                    <template v-for="(item,key) in detailData.productioncolor">
                                        <el-radio-button :label="item" :key="key"></el-radio-button>
                                    </template>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="24" class="production-number">
                                <el-tag>产品数量</el-tag>
                                <el-input-number  size="small" v-model="number" @change="numberchange" :min="1" :max="10" label="购买数量"></el-input-number>
                            </el-col>
                            <el-col :span="24">
                                <el-button-group>
                                    <el-button type="primary" icon="el-icon-edit" @click="buy">立刻购买</el-button>
                                    <el-button type="primary" icon="el-icon-share" @click="addcart" ref="addcart">加入购物车</el-button>
                                </el-button-group>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="产品参数" name="params">
                            <el-row>
                                <template v-for="(item, key) in detailData.productionparam">
                                    <el-col :span="6" :key="key">
                                        {{item.key}}:{{item.value}}
                                    </el-col>
                                </template>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                <el-row>
                    <el-divider></el-divider>
                    <span>产品详情</span>
                    <el-divider></el-divider>
                    <div v-html="detailData.productiondesc"></div>
                </el-row>
            </el-col>
            <el-col :span="5">
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            transitionshow: false,
            activeName: 'params',
            price: 0.00,
            size: '',
            color: '',
            number: 1,
            detailData:{}
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        numberchange () {
        },
        buy () {
            if (this.$store.state.userInfo.id) {
                this.$store.commit('buy', [
                    {
                        productionid:this.detailData.id,
                        productionsize: this.size,
                        productioncolor: this.color,
                        productionnum: this.number
                    }
                ])
                this.$router.push('/order')
            } else {
                this.$alert('您尚未登录请先登录', '提示')
            }
        },
        addcart () {
            if (this.$store.state.userInfo.id) {
                if (this.size == '') {
                    this.$alert('尺码不能为空', '提示')
                    return
                }
                if (this.color == '') {
                    this.$alert('颜色不能为空', '提示')
                    return
                }
                this.transitionshow = true
                this.$store.dispatch('addcart', {
                    accountid: this.$store.state.userInfo.id,
                    productionid: this.detailData.id,
                    productionnum: this.number,
                    productionsize: this.size,
                    productioncolor: this.color
                })
            } else {
                this.$alert('您尚未登录请先登录', '提示')
            }
            
        },
        getData() {
            let id = this.$route.query.id
            this.axios.get('/api/production/getRow', {
                params: {
                    id:id
                }
            }).then( (data) => {
                if (data.data.code === 0) {
                    
                    this.detailData = data.data.data
                    let paramsArr = []
                    let paramsCurArr = this.detailData['productionparam'].split(';')
                    paramsCurArr.pop()
                    paramsCurArr.forEach( (item) => {
                        let curitem = item.split(':')
                        paramsArr.push({
                            key:curitem[0],
                            value: curitem[1]
                        })
                    })
                    this.detailData['productionparam'] = paramsArr
                    this.detailData['productionsize'] = this.detailData['productionsize'].split('-')
                    this.detailData['productioncolor'] = this.detailData['productioncolor'].split('-')
                    this.price = this.detailData.productionprice
                } else {
                    this.$router.push('/error')
                }
            }).catch( (error) => {

            })
        },
        beforeEnter (el) {
            // el定位到 添加购物车按钮位置
            var bodyRect = this.$refs['addcart'].$el.getBoundingClientRect()
            let left = bodyRect.left;
            let top = bodyRect.top;
            el.style.transform = 'translate('+left+'px, '+(top-200)+'px)'
        },
        enter (el, down) {
            var bodyRect = document.getElementById('cartButton').getBoundingClientRect()
            let left = bodyRect.left-150
            let top = bodyRect.top 
            el.style.transform = 'translate('+left+'px, '+(top-150)+'px)'
            el.style.transition = "all 2s ease"
            done()
        },
        afterEnter(el){
            this.transitionshow = false
        }
    }
}
</script>
<style scoped>
.page{
    margin-top:10px;
}
.produciton-page{
    padding:10px;
}
.production-title{
    height: 60px;
    font-size: 16px;
    line-height: 30px;
}
.el-breadcrumb{
    line-height: 20px;
    font-size:14px;
}
.production-addtime, .production-price, .production-size, .production-color, .production-number{
    margin-bottom: 10px;
}
.el-image{
    height: 312px;
    overflow: hidden;
}
.el-image img{
    width: 100%;
    height: auto;
}
.circle{
    width:20px;
    height:20px;
    border-radius: 50%;
    position: absolute;
    background: #f00;
    z-index:10000
}
</style>
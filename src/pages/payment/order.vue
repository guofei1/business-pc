<template>
	<div class="container">
		<el-row class="page">
            <el-col :span="6" class="padding-10" :offset="4">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item :title="(key+1) + ' '+item.productiontitle + ' ￥:'+item.itemtotal" :name="key"
                   v-for="(item,key) in productionData"
                   :key="key"
                  >
                    <div class="pro-list">
                        <div class="pro-cover">
                        <img :src="item.productionphoto">
                        </div>
                        <div class="pro-info">
                            数量: {{item.productionnum}}
                            颜色: {{item.productioncolor}}
                            尺码: {{item.productionsize}}
                            <br/>
                            价格: {{item.productionprice}}
                            <br />
                            小计: {{item.itemtotal.toFixed(2)}}
                        </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-card shadow="never" class="order-pay margin-top-10">
                      <i class="el-icon-s-shop"></i> 收款方法: 聚划算
                      <br />
                      <i class="el-icon-s-goods"></i>支付总金额: {{total}}
                      <br />
                      <i class="el-icon-s-ticket"></i>订单号: {{ordersn}}
                      <br />
                      <el-divider></el-divider>
                      <el-button type="success" @click="payment" v-loading.fullscreen.lock="fullscreenLoading">立刻支付</el-button>
                      <el-button @click="back">放弃支付</el-button>
                </el-card>
            </el-col>
        </el-row>
	</div>
</template>
<script>
export default {
    name: "order",
    data() {
        return {
            fullscreenLoading:false,
            activeName:0,
            productionData: [],
            total: 0.00,
            ordersn: '',
            paymentTotal: 0.00
        }
    },
    created() {
        this.getData();
    },
    activated() {
        this.getData();
    },
    beforeRouteUpdate (to, from, next) {
        this.getData();
    },
    methods: {
        paramsInit() {
            let ids = [];
            let nums = [];
            let sizes = [];
            let colors = [];
            for(let i in this.$store.state.orderData) {
                ids.push(this.$store.state.orderData[i]['productionid']);
                nums.push(this.$store.state.orderData[i]['productionnum']);
                sizes.push(this.$store.state.orderData[i]['productionsize']);
                colors.push(this.$store.state.orderData[i]['productioncolor']);
            }
            let param =  {
               productionid: ids,
               productionnum: nums,
               productionsize: sizes,
               productioncolor: colors
            }
            return param;
        },
        getData() {
            //取出所有的产品信息
            if (this.$store.state.orderData.length<1) {
                this.$alert('尚未选中任何商品', '提示')
                this.$router.go(-1);
                return;
            }
            let params = this.paramsInit()
            this.axios.get('/api/order/getData', {
                params: params
            })
            .then((response) => {
                if (response.data.code == 0) {
                    //初始化
                    this.productionData = response.data.data
                    this.total = response.data.total.toFixed(2)
                    this.ordersn = response.data.ordersn
                } else {
                    this.$alert(response.data.msg, '提示');
                }
                this.loading = false
            })
            .catch((error) => {
                this.$alert('服务器繁忙，请稍后重试', '提示')
            })
        },
        back() {
            this.$confirm('确定要放弃支付吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$router.go(-1);
            }).catch(() => {
            });
        },
        payment() {
            //支付
            this.fullscreenLoading = true;
            //验证登录
            if (!this.$store.state.userInfo.id) {
                this.fullscreenLoading = false;
                this.$alert('尚未登录请先登录','提示')
                this.$router.push('/login');
                return;
            }
            //写入订单(未支付)
            this.writeOrder();
        },
        writeOrder() {
            let params = this.paramsInit();
            //扩展数据
            params.accountid = this.$store.state.userInfo.id
            params.type = 'PC'
            params.ordersn = this.ordersn
            params.totalprice = this.total
            this.axios.post('/api/order/create', {
                params: params
            })
            .then((response) => {
                if (response.data.code == 0) {
                    //直接开始支付(不用验证用户余额)
                    //跳转到支付组件页面
                    this.$router.push(
                        {
                            path:'/payment',
                            query:{ordersn: response.data.data.ordersn}
                        }
                    );
                } else if (response.data.code == 5) {
                    //该订单已提交
                    this.fullscreenLoading = false;
                    this.$router.push(
                        {
                            path:'/payment',
                            query:{ordersn: response.data.data.ordersn}
                        }
                    );
                } else {
                    this.fullscreenLoading = false;
                    this.$alert(response.data.msg);
                    return;
                }
            })
            .catch( (error) => {
                this.fullscreenLoading = false;
                this.$alert('服务器繁忙，请稍后重试');
            })
        }
    }
}
</script>

<style scoped="scoped">
	.container {
		margin-top: 10px;
	}
	.padding-10{
	    padding:10px;
	}
	.margin-bottom-10{
	    margin-bottom:10px;
	}
	.margin-top-10{
        margin-top:10px;
    }
    .pro-list{
        border:1px solid #eee;
        height:238px;
        overflow-y:auto;
    }
    .el-collapse-item{
        overflow:hidden;
    }
    .pro-list .pro-cover{
        width:70px; height:70px;
        overflow:hidden;
        float:left;
        margin:10px;
    }
    .pro-list .pro-info{
        margin-top:10px;
    }
    .order-pay{
        line-height:50px;
        font-size:20px;
    }
</style>

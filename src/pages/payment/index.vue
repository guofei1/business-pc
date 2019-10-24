<template>
	<div class="container">
		<el-row class="page">
            <el-col :span="6" :offset="4">
                <div class="pro-list margin-top-10">
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item :title="(key+1) + ' '+item.productiontitle + ' ￥:'+item.itemtotal" :name="key"
                       v-for="(item,key) in productionData"
                       :key="key"
                      >
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
                      </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-card shadow="never" class="order-pay margin-top-10 margin-botom-10">
                      <i class="el-icon-s-shop"></i> 收款方法: 聚划算
                      <br />
                      <i class="el-icon-s-goods"></i>支付总金额: {{total}}
                      <br />
                      <i class="el-icon-s-ticket"></i>订单号: {{ordersn}}
                      <br />
                      <el-divider></el-divider>
                      <el-button type="success" @click="keeppay" v-loading.fullscreen.lock="fullscreenLoading">立刻支付</el-button>
                      <el-button>放弃支付</el-button>
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
            paytimes:0,
            fullscreenLoading: true,
            activeName:0,
            productionData: [],
            total: 0.00,
            ordersn: '',
            paymentTotal: 0.00
        }
    },
    created() {
        this.getData()
    },
    beforeRouteUpdate (to, from, next) {
        this.getData()
    },
    methods: {
        getData() {
            this.ordersn = this.$route.query.ordersn
            this.axios.get('/api/order/getRow', {
                params: {ordersn: this.ordersn}
            })
            .then((response) => {
                if (response.data.code == 0) {
                    //初始化
                    this.productionData = response.data.data
                    this.total = response.data.total.toFixed(2)
                    this.ordersn = response.data.ordersn
                    //开始支付
                    this.paymentSubmit();
                } else {
                    this.fullscreenLoading = false;
                    this.$alert(response.data.msg, '提示')
                    this.$router.push('/myorder');
                }
            })
            .catch((error) => {
                this.$alert('服务器繁忙，请稍后重试', '提示')
            })
        },
        paymentSubmit() {
            //输入支付密码
            let noticeMessage = '请输入支付密码';
            if (this.paytimes > 0) {
                let leasttimes = 3 - this.paytimes;
                noticeMessage = '重新输入支付密码(剩余'+leasttimes+'次机会)';
            }
            this.$prompt('', noticeMessage, {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      inputType:'password',
                      inputPlaceholder: '请输入登录密码',
                      inputPattern: /^.{6,20}$/,
                      inputErrorMessage: '登录密码格式不正确',
                      center: true
            }).then(({ value }) => {
                //记录 提交ajax
                this.fullscreenLoading = false;
                this.paymentContinue(value);
            }).catch(() => {
               //关闭弹窗
               this.fullscreenLoading = false;
            });
        },
        keeppay() {
            this.paymentSubmit();
        },
        paymentContinue(password) {
            //继续支付
            this.axios.post('/api/payment/pay', {
                params: {
                    accountid: this.$store.state.userInfo.id,
                    ordersn: this.ordersn,
                    password: password
                }
            })
            .then((response) => {
                if (response.data.code == 0) {
                    //支付成功界面
                    this.fullscreenLoading = false
                    this.$router.push({path:'/paysuccess', query:{ordersn:this.ordersn}});
                } else if(response.data.code == 5) {
                    //支付密码不正确
                    this.paytimes++;
                    if (this.paytimes > 2) {
                        this.$alert('支付密码错误超过3次', '警告');
                        this.$router.push('/myorder');
                    } else {
                        //重新输入
                        this.paymentSubmit();
                    }
                } else if (response.data.code == 6) {
                    //余额不足
                    this.fullscreenLoading = false;
                    this.$alert(response.data.msg);
                    this.$router.push('/recharge');
                } else {
                    this.fullscreenLoading = false;
                    this.$alert(response.data.msg);
                }
                this.fullscreenLoading = false;
            })
            .catch(function (error) {
                this.$alert('服务器繁忙，请稍后重试', '提示');
            });
        },
        clearCart() {
            //清空对应的购物车 找出购物车中对应的值
            let ids = [];
            for (let i in this.$store.state.cartData) {
                for (let j in this.productionData) {
                    if (
                        this.$store.state.cartData[i]['productionid']
                        == this.productionData[j]['id'] &&
                        this.$store.state.cartData[i]['productioncolor']
                        == this.productionData[j]['productioncolor'] &&
                        this.$store.state.cartData[i]['productionsize']
                        == this.productionData[j]['productionsize'] &&
                        this.$store.state.cartData[i]['productionnum']
                        == this.productionData[j]['productionnum']
                    ) {
                        ids.push(this.$store.state.cartData[i]['id'])
                    }
                }
            }
            if (ids.length>0) {
                this.$store.dispatch('cart/deleteCart', ids)
            }
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
        height:258px;
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
    .page .el-message-box__content .el-message-box__input .el-input .el-input__inner{ text-align:center !important;}
</style>

<template>
   <el-row>
        <el-col :span="12" :offset="6">
            <el-card shadow="never" class="order-pay margin-top-10">
                <div class="success">
                    <div class="success-icon">
                    <i class="el-icon-check"></i>
                    </div>
                    <div class="success-info">支付成功</div>
                </div>
                <div class="orderinfo">
                    订单号：{{ordersn}}
                    <br />
                    订单金额: {{total}}
                    <br />
                    订单状态: {{orderstatus}}
                </div>
            </el-card>
        </el-col>
   </el-row>
</template>
<script>
export default {
    name: 'pay-success',
    data() {
        return {
            ordersn: '',
            total:0.00,
            orderstatus: '未支付',
        }
    },
    created() {
        this.getData();
    },
    beforeRouteUpdate (to, from, next) {
        this.getData();
    },
    methods: {
        getData() {
            this.ordersn = this.$route.query.ordersn;
            this.axios.get('/api/order/getRow', {
                params: {ordersn: this.ordersn}
            })
            .then((response) => {
                if (response.data.code == 0) {
                    //初始化
                    if (response.data.orderdata.orderstatus != 1) {
                        this.$alert('该订单未支付');
                        this.$router.push('/orders');
                    } else {
                        this.total = response.data.total.toFixed(2)
                        this.ordersn = response.data.ordersn
                        this.orderstatus  = '已支付'
                    }
                } else if (response.data.code == 2) {
                    this.total = response.data.orderdata.totalprice
                    this.ordersn = response.data.orderdata.ordersn
                    this.orderstatus  = '已支付'
                } else {
                    this.$alert(response.data.msg);
                    this.$router.push('/orders');
                }
            })
            .catch((error) => {
                this.$alert('服务器繁忙，请稍后重试');
            })
        },
        updateBalance () {
            this.axios.get('/api/user/login', {
                params: {
                    telphone: this.$store.state.userInfo.telphone,
                    password: this.$store.state.userInfo.password
                }
            }).then( (data) => {
                if (data.data.code === 0) {
                    this.$store.commit('initLogin', {
                        userInfo: data.data.data,
                        cartData: data.data.cartdata
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
.success .success-icon{
    font-size:50px;
    color:#76d802;
    line-height:80px;
    width:80px;
    height:80px;
    border-radius: 50%;
    border:2px solid #76d802;
    margin:20px auto;
    text-align:center;
}
.success .success-info{
    text-align:center;
    font-size:20px;
    color:#76d802;
    font-size:20px;
}
.orderinfo{
    margin-top:20px;
    line-height:25px;
    text-align:center;
    font-size:16px;
}
</style>

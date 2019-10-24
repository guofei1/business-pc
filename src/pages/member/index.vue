<template>
    <div class="page" style="margin-top:10px;">
        <el-row :gutter="10">
            <el-col :span="5">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                    <span>个人信息</span>
                    </div>
                    <div class="text item">
                        <div class="user-action">
                        <el-avatar :src="require('@/assets/images/logo.png')">
                            <img :src="this.$store.state.userInfo.avatarUrl"/>
                        </el-avatar>
                        </div>
                        <p>用户名: {{this.$store.state.userInfo.username}}</p>
                        <p>余额: {{this.$store.state.userInfo.balance}} | <router-link to="/recharge">充值</router-link></p>
                        <p>
                            <router-link to="/finishinfo">完善信息</router-link>
                            |
                            <router-link to="/editpassword">修改密码</router-link>
                        </p>
                        <el-divider></el-divider>
                        <p>
                            <router-link to="/mycart">我的购物车</router-link>
                        </p>
                        <p>
                            <router-link to="/myorder">我的订单</router-link>
                        </p>
                        <p>
                            <router-link to="/mytrade">消费记录</router-link>
                        </p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="19" class="bg-white">
                <router-view name="member"></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
</script>
<style scoped>
.user-action >>> .el-avatar{
    text-align: center;
    width:100px;
    height:100px;
    margin: 10px auto;
}
.user-action a{
    color:#333;
}
a:link, a:visited{ 
    color:#333;
}
</style>
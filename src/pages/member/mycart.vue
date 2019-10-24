<template>
    <div class="container-page">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/member">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="text-align:right; margin-bottom:10px;">
            <el-button-group>
            <el-button size="small" type="danger">
                总金额
            </el-button>
            <el-button size="small" type="danger">{{total}}</el-button>
            </el-button-group>
            <el-button size="small" type="primary" @click="order">立刻结算</el-button>
        </el-row>
        <el-table
            :data="this.$store.state.cartData"
            border
            show-summary
            style="width: 100%"
            @selection-change="selectionChange"
            >
            <el-table-column
            type="selection"
            width="55"
            >
            </el-table-column>
            <el-table-column
            label="图片">
            <template slot-scope="scope">
                <div style="width:50px; height:50px; overflow:hidden;">
                    <img :src="scope.row.productionphoto" width="100%">
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="productiontitle"
            label="产品名称">
            </el-table-column>
            <el-table-column
            prop="productioncolor"
            label="颜色">
            </el-table-column>
            <el-table-column
            prop="productionsize"
            label="尺码">
            </el-table-column>
            <el-table-column
            prop="productionprice"
            sortable
            label="价格">
            </el-table-column>
            <el-table-column
            prop="productionnum"
            sortable
            label="价格">
            </el-table-column>
            <el-table-column
            sortable
            label="小计">
            <template slot-scope="scope">
                {{scope.row.productionprice * scope.row.productionnum}}
            </template>
            </el-table-column>
        </el-table>
         <el-row style="text-align:right;margin-top:10px;">
             <el-button-group>
            <el-button size="small" type="danger">
                总金额
            </el-button>
            <el-button size="small" type="danger">{{total}}</el-button>
             </el-button-group>
            <el-button size="small" type="primary" @click="order">立刻结算</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            total:0.00,
            checkedids:[],
            orderData: []
        }
    },
    methods: {
        order () {
            if (this.checkedids.length < 1) {
                this.$alert('请选择要结算的选项', '提示')
                return
            }
            this.$store.commit('buy', this.orderData)
            this.$router.push('/order')
        },
        selectionChange (selection) {
            this.total = 0.00
            let curids = []
            let curOrderData = []
            if (selection.length > 0) {
                selection.forEach((item) => {
                    curids.push(item.id)
                    curOrderData.push({
                        productionid: item.productionid,
                        productionsize: item.productionsize,
                        productioncolor: item.productioncolor,
                        productionnum: item.productionnum
                    })
                    this.total += item.productionnum*item.productionprice
                })
            }
            this.checkedids = curids
            this.orderData = curOrderData
        }
    }
}
</script>
<style scoped>
.container-page{
    padding-bottom: 20px;
}
.container-page >>> .el-breadcrumb{
    height: 50px;
    line-height: 50px;
}
</style>

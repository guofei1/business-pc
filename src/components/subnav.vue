<template>
    <el-button-group>
        <template v-for="(item, key) in subrouter">
            <el-button type="primary" size="small" :key="key" @click="open(item.modulepath, item.actiontype)">{{item.modulename}}</el-button>
        </template>
    </el-button-group>
</template>
<script>
export default {
    props: ['ids'],
    data () {
        return {
            subrouter: []
        }
    },
    methods: {
        open (path, actiontype) {
            if (actiontype === 1) {
                // 修改 盘端用户选中了几项
                if (this.ids.length !== 1) {
                    this.$alert('只能选择一项', '提示', {
                        confirmButtonText: '确定'
                    })
                } else {
                    this.$router.push({
                        path: path,
                        query: {id: this.ids}
                    })
                }
            } else if (actiontype === 2) {
                if (this.ids.length < 1) {
                    this.$alert('至少选择一项', '提示', {
                        confirmButtonText: '确定'
                    })
                } else {
                    this.$router.push({
                        path:path,
                        query: {id: this.ids}
                    })
                }
            } else {
                this.$router.push(path)
            }
        }
    },
    beforeMount () {
        let curpath = this.$route.path
        this.$store.state.moduleInfo.forEach((item) => {
            if (item.modulepath == curpath) {
                this.subrouter = item.children;
            }
        })
    }
}
</script>
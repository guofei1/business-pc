<template>
    <div class="login-box">
        <div class="login">
            <el-divider content-position="center">用户登录</el-divider>
            <el-form ref="login" :rules="rules" :model="form" label-width="80px" action="http://www.baidu.com">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userpassword">
                    <el-input type="password" v-model="form.userpassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitform" :loading="loading">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                username: '',
                userpassword: ''
            },
            loading: false,
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 5, max: 20, message: '用户名长度在 5 到 20 个字符', trigger: 'blur'}
                ],
                userpassword: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 5, max: 20, message: '密码长度在 5 到 20个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitform () {
            this.$refs.login.validate((status) => {
                if (status) {
                    this.axios.get('/api/admin/checkLogin',
                        {
                            params: {
                                username: this.form.username,
                                userpassword: this.form.userpassword
                            }
                        }
                    ).then((data) => {
                        console.log('拦截器发起的', data)
                        if (data.data.code === 0) {
                            this.$store.commit('initLogin', {
                                userInfo: data.data.data.admindata,
                                roleInfo: data.data.data.roledata,
                                moduleInfo: data.data.data.moduledata
                            })
                            this.$router.push('/')
                        } else {
                            this.$alert(data.data.msg, '错误提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    console.log(status)
                }
            })
        }
    }
}
</script>
<style scoped>
.login-box{
    width:0px;
    height: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
}
.login {
    width: 300px;
    height: auto;
    position: relative;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px
}
</style>

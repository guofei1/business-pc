<template>
    <div class="page" style="position:relative; height:100%;">
        <el-row style="height: 400px; overflow:hidden;">
            <el-col :span="18" style="overflow:hidden;">
                <img :src="require('@/assets/images/loginbanner.jpg')" style="height:100%;">
            </el-col>
            <el-col :span="6" class="bg-white" style="height:400px;">
                <div style="padding:20px;">
                <el-divider content-position="center">用户注册</el-divider>
                <el-form ref="login" :rules="rules" :model="form" label-width="90px" label-position="left">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label=" 手机号码" prop="telphone">
                        <el-input v-model="form.telphone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input type="password" v-model="form.repassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitform" :loading="loading">登录</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loading: false,
            form: {
                username: '',
                telphone: '',
                password: '',
                repassword: ''
            },
            loading: false,
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 2, max: 20, message: '用户名2到20字符', trigger: 'blur'}
                ],
                telphone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {min: 11, max: 11, message: '手机号码长度在11位', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 5, max: 20, message: '密码长度在 5 到 20个字符', trigger: 'blur'}
                ],
                repassword: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {validate(rules, value, callback) {
                        if (value != this.form.password) {
                            callback(new Error('确认密码不正确'))
                        }
                    },
                    trigger: 'blur'
                    }
                ]
                
            }
        }
    },
    methods: {
        submitform () {
            this.$refs.login.validate((status) => {
                this.loading = true
                if (status) {
                    this.axios.post('/api/user/register',
                        {
                            params: {
                                username: this.form.username,
                                telphone: this.form.telphone,
                                password: this.form.password
                            }
                        }
                    ).then((data) => {
                        if (data.data.code === 0) {
                            this.$alert('注册成功，请等待审核', '提示')
                            this.$router.push('/')
                        } else {
                            this.$alert(data.data.msg, '错误提示', {
                                confirmButtonText: '确定'
                            })
                            this.loading = false
                        }
                    }).catch((error) => {
                        this.loading = false
                        console.log(error)
                    })
                } else {
                    this.loading = false
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

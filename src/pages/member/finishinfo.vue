<template>
	<div class="container-page">
		<el-breadcrumb separator="/">
        <el-breadcrumb-item to="/member">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
        </el-breadcrumb>
		<el-row>
			<el-upload
				v-loading.fullscreen.lock="fullscreenLoading"
				class="avatar-uploader"
				action="/api/common/UploadUserimage"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="userData.avatarUrl" :src="userData.avatarUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<!--完善信息-->
			<el-form>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="用户姓名:" label-width="90px" >
							<span>{{userData.username}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="用户电话:" label-width="90px" >
							<span>{{userData.telphone}}</span>
							</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="用户昵称:" label-width="90px" >
							<el-input v-model='userData.nickName' v-on:blur="getuse('nickName')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="用户性别:" label-width="90px" >
							<el-input v-model='userData.gender' v-on:blur="getuse('gender')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="用户住址:" label-width="90px" >
							<el-cascader
								v-model="value"
								:options="options"
								@change="handleChange"></el-cascader>
							</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
	</div>
</template>

<script>
import City from '@/utils/city'
export default {
		name: 'Userinfo',
		data(){
			return {
			    options: City,
			    fullscreenLoading: false,
				userData: this.$store.state.userInfo
			}
		},
		methods:{
			   handleAvatarSuccess(res, file) {
			    this.fullscreenLoading = false;
		        this.userData.avatarUrl = res.data.src;
		        this.getuse('avatarUrl');
		      },
		      beforeAvatarUpload(file) {
                this.fullscreenLoading = true;
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		      },
		      getuse(key){
		        if (key && this['userData'][key] != '') {
                    let id = this.$store.state.user.userData.id
                    this.axios.post("/api/User/editUserInfo",{
                    params:{
                            accountid:id,
                            [key]:this['userData'][key]
                        }
                    })
                    .then(function(response){
                        if(response.data.code == 0){
                            this.$store.commit('user/updateUserInfo',{[key]: this[key]});
                        }
                    }.bind(this))
                     .catch(function (error) {
                        this.$message('服务器繁忙，请稍后重试');
                    }.bind(this));

                }
		      },
              goBack() {
                 this.$router.push('/member');
              },
		},
		created(){
			let use = this.$store.state.user.userData;
			this.name=use.username;
			this.telphone=use.telphone;
			this.nickName= use.nickName;
			this.city = use.city;
			this.gender = use.gender;
			this.imageUrl = use.avatarUrl;
			console.log(use.city)
		},
		actived(){

		}
	}
</script>

<style scoped="scoped">
	.form{
		margin: 0px auto;
	}
	 .avatar-uploader .el-upload {
    border: 1px dashed #eee;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus {
    border:1px solid #eee;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  	.el-page-header{
  	    height:50px;
  	    line-height:50px;
  	    border-bottom:1px solid #eee;
  	    padding-left:20px;
  	    margin-bottom:10px;
  	}
</style>

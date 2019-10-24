<template>
    <div class="upload-container">
        <el-upload
        ref="upload"
        action="/api/common/Uploadimage"
        accept="image/png, image/jpeg, image/gif"
        list-type="picture-card"
        :file-list="fileList"
        :on-remove="onRemove"
        :on-success="onsuccess"
        :before-upload="beforeupload"
        :auto-upload="false"
        >
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>
</template>
<script>
export default {
    props: ['productionphoto'],
    data () {
        return  {
            fileList:[],
        }
    },
    beforeMount () {
        if (this.productionphoto !== "") {
            this.fileList = [{name:'', url:this.productionphoto}]
        }
    },
    methods: {
        onRemove () {
            this.$emit('uploaded', '')
        },
        onsuccess (response, file, fileList) {
            if (response.code === 0) {
                this.$emit('uploaded', response.data.src)
            } else {
                this.$alert(response.msg, '提示')
            }
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        beforeupload (file) {
            //判断文件类型
            let acceptArr = ['image/png', 'image/gif', 'image/jpeg']
            if ( !acceptArr.includes(file.type)) {
                this.$alert('只允许上传jpg|png|gif格式图片')
                this.
                return
            }
            //判断文件大小
            if (file.size > 1*1024*1024 ) {
                this.$alert('只允许1M的图片')
                return
            }
        },
    }
}
</script>
<template>
    <quill-editor class="editor"
        ref="myTextEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
    </quill-editor>
</template>
<script>
export default {
props: ['desc'],
    data () {
        return {
            content: '',
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            ["bold", "italic", "underline"], // 加粗 斜体 下划线 删除线
                            ["clean"], // 清除文本格式
                            ["image"] // 链接、图片、视频
                        ]
                    }
                },
                placeholder: '请在这里添加产品描述', //提示
                readyOnly: false, //是否只读
                theme: 'snow', //主题 snow/bubble
                syntax: true, //语法检测,
            }
        }
    },
    mounted () {
        this.content = this.desc
    },
    methods: {
        // 失去焦点
        onEditorBlur(editor) {},
        // 获得焦点
        onEditorFocus(editor) {},
        // 开始
        onEditorReady(editor) {

        },
        // 值发生变化
        onEditorChange(editor) {
            this.content = editor.html
            this.$emit('editfinished', this.content)
        },
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
}
</script>
<style scoped>
.editor{
    height: 400px;
}
</style>
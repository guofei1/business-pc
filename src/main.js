// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from './http/index'
import VueAxios from 'vue-axios'
import store from './store/index'
// 编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.use(ElementUI)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        ok: 100
    },
    router,
    store
})

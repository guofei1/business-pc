import Vue from 'vue'
import router from '@/router/index'
import axios from 'axios'
import baseConfig from '@/config/config'
import {Alert} from 'element-ui'
import store from '@/store/index'

Vue.use(Alert)
axios.interceptors.request.use(function (config) {
    let token = store.state.token
    config.headers.token = token
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    if (response.data.code === 400) {
        let curConfig = response.config
        axios.get(baseConfig.tokenUrl).then((data) => {
            if (data.data.code === 0) {
                store.commit('setToken', data.data.data.token)
                curConfig.headers.token = data.data.data.token
                axios(curConfig)
            } else {
                let tokenError = {name: 'token', message: 'token续订失败'}
                return Promise.reject(tokenError)
            }
        })
    } else if (response.data.code === 401) {
        Alert('非法访问', '错误提示', {
            confirmButtonText: '确定',
            callback: action => {
                router.push('/login')
            }
        })
    }
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})
export default axios

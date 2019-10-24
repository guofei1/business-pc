import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from '@/config/router.config'
Vue.use(Router)
const router = new Router({
    mode: 'history'
})
router.addRoutes(routerConfig)
router.beforeEach((to, from, next) => {
    // if (to.path !== '/login') {
    //     // 登录验证
    //     if (!store.state.userInfo.id) {
    //         router.push('/login')
    //     }
    // }
    next()
})
export default router

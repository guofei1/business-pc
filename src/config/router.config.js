import index from '@/pages/index/index'
import home from '@/pages/index/home'
import lists from '@/pages/lists/index'
import login from '@/pages/login/index'
import detail from '@/pages/detail/index'
import register from '@/pages/login/register'
import member from '@/pages/member/index'
const routers = [
    {
        path: '/',
        name: 'index',
        components: {
            default: index
        },
        meta: {
            label: '主页'
        },
        children: [
            {
                path: '/index',
                name: 'home',
                components: {
                    main: home
                }
            },
            {
                path: '/lists/:id',
                name: 'lists',
                components: {
                    main: lists
                }

            },
            {
                path: '/detail',
                name: 'detail',
                components: {
                    main: detail
                }
            },
            {
                path: '/register',
                name: 'register',
                components: {
                    main: register
                },
                meta: {
                    label: '登录'
                }
            },
            {
                path: '/login',
                name: 'login',
                components: {
                    main: login
                },
                meta: {
                    label: '登录'
                }
            },
            {
                path: '/search',
                name: 'search',
                components: {
                    main: resolve => require(['@/pages/index/search'], resolve)
                }
            },
            {
                path: '/member',
                name: 'member',
                components: {
                    main: member
                },
                meta: {
                    label: '会员中心'
                },
                children: [
                    {
                        path: '/mycart',
                        name: 'mycart',
                        components: {
                            member: resolve => require(['@/pages/member/mycart'], resolve)
                        }
                    },
                    {
                        path: '/myorder',
                        name: 'myorder',
                        components: {
                            member: resolve => require(['@/pages/member/myorder'], resolve)
                        }
                    },
                    {
                        path: '/finishinfo',
                        name: 'finishinfo',
                        components: {
                            member: resolve => require(['@/pages/member/finishinfo'], resolve)
                        }
                    },
                    {
                        path: '/editpassword',
                        name: 'editpassword',
                        components: {
                            member: resolve => require(['@/pages/member/editpassword'], resolve)
                        }
                    },
                    {
                        path: '/recharge',
                        name: 'recharge',
                        components: {
                            member: resolve => require(['@/pages/member/recharge'], resolve)
                        }
                    }
                ]
            },
            {
                path: '/payment',
                name: 'payment',
                components: {
                    main: resolve => require(['@/pages/payment/index'], resolve)
                }
            },
            {
                path: '/order',
                name: 'order',
                components: {
                    main: resolve => require(['@/pages/payment/order'], resolve)
                }
            },
            {
                path: '/paysuccess',
                name: 'paysuccess',
                components: {
                    main: resolve => require(['@/pages/payment/paysuccess'], resolve)
                }
            }
        ]
    },
    {
        path: '/error',
        name: 'error',
        components: {
            main: {template: '<h1>error</h1>'}
        },
        meta: {
            label: '错误'
        }
    }
]
export default routers

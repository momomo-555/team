import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import Welcome from '@/views/Welcome/Welcome.vue'
import normalUsers from '@/views/Users/normalUsers.vue'
import registerUsers from '@/views/Users/registerUsers.vue'
import blockUsers from '@/views/Users/blockUsers.vue'
import About from '@/views/firstPage/About.vue'
import learnStyle from '@/views/firstPage/learnStyle.vue'
import Location from '@/views/firstPage/Location.vue'
import recruitmentInfo from '@/views/Recruitment/recruitmentInfo.vue'
import recruitmentTime from '@/views/Recruitment/recruitmentTime.vue'
import mainDirection from '@/views/Organization/mainDirection.vue'
import awardInfo from '@/views/Organization/awardInfo.vue'
import alreadyCheck from '@/views/Blog/alreadyCheck.vue'
import withoutCheck from '@/views/Blog/withoutCheck.vue'

const routes = [
    {
        path: '/',
        // 重定向
        redirect: '/Login',
    },
    {
        name: 'Login',
        path: '/Login',
        component: Login,
    }, {
        name: 'Home',
        path: '/Home',
        component: Home,
        redirect: '/Welcome',
        meta: { title: "首页", msg: '首页' },
        children: [
            {
                path: '/Welcome',
                component: Welcome,
                meta: { msg: '首页' },
            },
            //用户管理
            {
                path: '/normalUsers',
                component: normalUsers,
                meta: { title: "用户管理/正常用户", msg: '正常用户' }
            },
            {
                path: '/registerUsers',
                component: registerUsers,
                meta: { title: "用户管理/正在注册", msg: '正在注册' }
            },
            {
                path: '/blockUsers',
                component: blockUsers,
                meta: { title: "用户管理/黑名单", msg: '黑名单' }
            },
            //信息管理
            {
                path: '/About',
                component: About,
                meta: { title: "信息管理/首页信息/关于我们", msg: '关于我们' }
            },
            {
                path: '/learnStyle',
                component: learnStyle,
                meta: { title: "信息管理/首页信息/学习方式", msg: '学习方式' }
            }, {
                path: '/Location',
                component: Location,
                meta: { title: "信息管理/首页信息/社团位置", msg: '社团位置' }
            },
            {
                path: '/recruitmentInfo',
                component: recruitmentInfo,
                meta: { title: "信息管理/社团招新/培训信息", msg: '培训信息' }
            },
            {
                path: '/recruitmentTime',
                component: recruitmentTime,
                meta: { title: "信息管理/社团招新/培训时间", msg: '培训时间' }
            },
            {
                path: '/mainDirection',
                component: mainDirection,
                meta: { title: "信息管理/社团信息/主攻方向", msg: '主攻方向' }
            },
            {
                path: '/awardInfo',
                component: awardInfo,
                meta: { title: "信息管理/社团信息/获奖信息", msg: '获奖信息' }
            },
            //博客管理
            {
                path: '/alreadyCheck',
                component: alreadyCheck,
                meta: { title: "博客管理/已审核", msg: '已审核' }
            },
            {
                path: '/withoutCheck',
                component: withoutCheck,
                meta: { title: "博客管理/未审核", msg: '未审核' }
            },
        ]
    },
    {
        // :pathMatch‌：动态参数命名，用于捕获未匹配的路径
        // (.*)*‌：正则表达式匹配任意字符（包括嵌套路径）‌
        path: "/:pathMatch(.*)*",//必备
        component: () => import('@/views/error/404.vue')
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
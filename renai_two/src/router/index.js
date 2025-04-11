/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-17 13:48:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 10:13:26
 * @FilePath: \renai_two\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { createRouter,createWebHistory} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '../views/FirstPage/FirstPage.vue'
import Login from '@/views/Login/Login.vue'
import Blog from '@/views/Blog/Blog.vue'
import Write from '@/views/Blog/Write.vue'
import Article from '@/views/Blog/Article.vue'
import Check from '@/views/Blog/Check.vue'
import unCheck from '@/views/Blog/unCheck.vue'
import Draft from '@/views/Blog/Draft.vue'
import Delete from '@/views/Blog/Delete.vue'
import Publish from '@/views/Blog/Publish.vue'
import Search from '@/views/Blog/Search.vue'
import Essay from '@/views/Blog/Essay.vue'
import Special from '@/views/Blog/Special.vue'
import Information from '@/views/Information/Information.vue'
import Recruitment from "@/views/Recruitment/Recruitment.vue"
import Center from '@/views/Center/Center.vue'
const routes = [
    {
        name: '/',
        path: '/',
        component: FirstPage,
    },
    {
        name: 'Login',
        path: '/Login',
        component: Login,
    },
    {
        name: 'Blog',
        path: '/Blog',
        component: Blog,
    },
    {
        name: 'Search',
        path: '/Search',
        component: Search,
    },
    {
        name: 'Write',
        path: '/Write',
        component: Write,
        children: [
            {
                name: 'Article',
                path: 'Article',
                component: Article,
                children: [
                    {
                        name: 'Check',
                        path: 'Check',
                        component: Check
                    },
                    {
                        name: 'unCheck',
                        path: 'unCheck',
                        component: unCheck
                    }
                ]
            }, {
                name: 'Draft',
                path: 'Draft',
                component: Draft
            }, {
                name: 'Delete',
                path: 'Delete',
                component: Delete
            }
        ]
    },
    {
        name: 'Publish',
        path: '/Publish',
        component: Publish
    },
    {
        name: 'Essay',
        path: '/Essay',
        component: Essay
    },
    {
        name: 'Special',
        path: '/Special',
        component: Special
    },
    {
        name: 'Information',
        path: '/Information',
        component: Information,
    },
    {
        name: 'Recruitment',
        path: '/Recruitment',
        component: Recruitment,
    },
    {
        name: 'Center',
        path: '/Center',
        component: Center,
    },
    {
        // :pathMatch‌：动态参数命名，用于捕获未匹配的路径
        // (.*)*‌：正则表达式匹配任意字符（包括嵌套路径）‌
        path: "/:pathMatch(.*)*",//必备
        component: () => import('@/views/error/404.vue')
    },
]

// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })
// export default router
// console.log(process.env.BASE_URL,'env')
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 14:47:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-10 10:34:21
 * @FilePath: \renai_admin_two\src\utils\requestToken.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import router from '@/router'
import { setToken, getToken, removeToken } from './token'

//1.根据域名配置
//2.超过时间
//3.请求拦截器/响应拦截器
const requestToken = axios.create({
    baseURL: 'http://106.14.30.173:8008',
    timeout: 6000
})

//请求拦截器
requestToken.interceptors.request.use((config) => {
    //显示loading
    ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    //操作config 注入token数据
    //1.获取token 
    //2.按照后段的格式要求做token拼接
    // 判断token
    let token = ''
    if (getToken('token')) {
        token = getToken('token')
        // console.log(token,'token')
    }
    config.headers['Token'] = token
    return config
}, (error) => {
    return Promise.reject
})
//响应拦截器
requestToken.interceptors.response.use((response) => {
    ElLoading.service().close()
    // 过期
    if(response.data.code==2009){
        ElMessage.error('登陆过期')
        router.push('/Login')
    }
    return response.data
}, (error) => {
    console.log(error, 'err')
    ElLoading.service().close()
    // 显示错误信息
    ElMessage.error('网络出现错误，请稍后再试');
})

export {requestToken}
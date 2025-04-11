/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 14:47:33
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-09 18:29:51
 * @FilePath: \renai_admin_two\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
// 1.根据域名配置
//2.超时时间
//3.请求拦截器/相应拦截器
const request = axios.create({
    baseURL: 'http://106.14.30.173:8008',
    timeout: 6000,
})

//添加请求拦截器
//在发送之前 做拦截 插入一些配置
request.interceptors.request.use((config) => {
    // 显示loading 
    ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
}, (error) => {
    return Promise.reject(error)
})

//添加响应拦截器
//在响应返回客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
    ElLoading.service().close();
    // console.log(response,'...')
    return response.data
}, (error) => {
    console.log(error, 'err')
    ElLoading.service().close();
    // 显示错误信息
    ElMessage.error('网络出现错误，请稍后再试');
})

export { request }
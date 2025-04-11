/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 19:42:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-21 10:36:36
 * @FilePath: \renai_two\src\utils\requset.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { mapStatus } from './status'
import router from '@/router/index'
import axios from 'axios'
import { setToken, getToken, removeToken } from './token'
import { ElMessage } from 'element-plus'

//1.根据域名配置
//2.超时时间
//3.请求拦截器/响应拦截器
// let port=''
const request = axios.create({
    baseURL: `http://106.14.30.173:8081`,
    timeout: 6000,
})

//添加请求拦截器
//在请求发送之前 做拦截 插入一些自定义的配置
request.interceptors.request.use((config) => {
    // 显示loading
    ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    
    return config
}, (error) => {
    return Promise.reject(error)
})

//添加响应拦截器
//在响应返回客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use(async (response) => {
    ElLoading.service().close();
    //2xxx范围内的状态都会触发该函数
    //对响应数据做点什么
    // console.log(response, 'response', response.data.code, mapStatus.has(response.data.code))
    // ElMessage.success(mapStatus.get(response.data.code))
    // if(response.data.code==0){
    // // console.log('调用了......', response.config.data)
    // setToken('name', '111222')
    // // request.defaults.headers.common['Access_token'] = getToken('name')
    // response.config.headers.Access_token = getToken('name')

    // response = await axios.request(response.config)
    // }else{
    //     //错误情况
    // }
    return response.data
}, (error) => {
    //超出2xx范围的状态码会触发该函数
    //对响应错误做些什么
    console.log(error, 'err')
    //监控401 token失效
    // if(error.response.status==401){
    //     removeToken()
    //     router.push('/Login')
    //     window.location.reload()
    // }
    // setTimeout(() => {
    //     // ElLoading.service().close();
    //     ElLoading.service({
    //         lock: true,
    //         text: '网络出现错误，请稍后再试...',
    //         spinner: 'el-icon-loading',
    //         background: 'rgba(255, 255, 255, 0.7)'
    //     });
    // }, 1000);
    ElLoading.service().close();
    // 显示错误信息
    ElMessage.error('网络出现错误，请稍后再试');

    // return Promise.reject(error)
})

export { request }
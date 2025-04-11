/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-21 10:12:08
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-09 10:23:09
 * @FilePath: \renai_two\src\utils\requsetToken.js
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
const requestToken = axios.create(
    {
        baseURL: 'http://106.14.30.173:8081',
        timeout: 6000,
    }
)
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
    if (getToken('access_token')) {
        token = getToken('access_token')
    }
    config.headers['Access_token'] = token
    return config
}, (error) => {
    return Promise.reject
})

function getNewToken() {
    // window.location.reload() 
    let url = 'http://106.14.30.173:8081/api/user/refresh/token'
    // if (getToken('Refresh_token')){
    //     //发请求
    // }
    // console.log('调用了')
    let token2 = ''
    token2 = getToken('refresh_token')
    return axios.get(url, { headers: { 'Refresh_token': token2 } })
}
let code=0;
//响应拦截器
requestToken.interceptors.response.use(async (response) => {
    ElLoading.service().close()
    // 过期
    if (response.data.code == 2003) {
        // 重新配置请求头(短期token过期)
        // 更新token发请求

        const res2 = await getNewToken()
        if (res2.data.code == 0) {
            //刷新成功
            // 重新存储两个token  setToken('Access_token',)
            if (res2.data.data) {
                // console.log(res2.data.data, 'token')
                // if (res2.data.data.access_token !== '' && res2.data.data.refresh_token !== '') {
                //     setToken('access_token', res2.data.data.access_token)
                //     setToken('refresh_token', res2.data.data.refresh_token)
                //     response.config.headers.Access_token = getToken('access_token')
                //     response = await axios.request(response.config)
                // }
                setToken('access_token', res2.data.data.access_token)
                setToken('refresh_token', res2.data.data.refresh_token)
                response.config.headers.Access_token = getToken('access_token')
                response = await axios.request(response.config)
            }
            else {
                // 跳转页面
                // router.push('/')
                setToken('access_token', '')
                setToken('refresh_token', '')
            }

        } 
        // else if (res2.data.code == 2004 &&code<=1) {
        //     response.config.headers.Access_token = getToken('access_token')
        //     // console.log(response.config.url,'...')
        //     response = await axios.request(response.config)
        //     code++
        // } 
        else {
            // ElMessage(mapStatus.get(res2.data.code))
            // router.push('/')
            // console.log('...')
        }

    }

    return response.data
}, (error) => {
    console.log(error, 'err')
    ElLoading.service().close()
    // 显示错误信息
    ElMessage.error('网络出现错误，请稍后再试');
})
export { requestToken }
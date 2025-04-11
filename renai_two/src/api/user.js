/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 19:44:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-21 20:02:30
 * @FilePath: \renai_two\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils"
import { requestToken } from '@/utils'

/*登陆注册*/

//用户登录
export function loginAPI(formData) {
    return request({
        url: 'api/user/unlisted/login',
        method: "POST",
        data: formData
    })
}
//图片获取验证码
export function photoYzmAPI() {
    return request({
        url: 'api/user/unlisted/get/picture/code',
        method: 'GET',
    })
}
//注册和忘记密码 获得邮箱验证码
export function regGetYzmAPI(url, data) {
    return request({
        url,
        method: 'POST',
        data,
    })
}
// 注册验证
export function regAPI(data) {
    return request({
        url: 'api/user/unlisted/register/mailbox',
        method: 'POST',
        data,
    })
}

// 忘记密码
export function forgetPasswordAPI(data) {
    return request({
        url: 'api/user/unlisted/forgect/password',
        method: 'POST',
        data,
    })
}

/*用户个人信息*/

// //用户获取头像
// export function getHeadPhotoAPI(uuid){
//     return request({
//         url:`api/user/unlisted/get/user/picture/:${uuid}`
//     })
// }

//获取用户uuid(头像需要)/是否登录
export function userUuidAPI() {
    return requestToken({
        url: 'api/user/listed/get/user/basic',
        method: 'GET',
    })
}
//退出登录
export function logOutAPI() {
    return requestToken({
        url: 'api/user/listed/quit',
        method: 'GET'
    })
}

//获取用户信息
export function getUserMessageAPI() {
    return requestToken({
        url: 'api/user/listed/get/user/message',
        method: 'GET'
    })
}

// 修改基本信息
export function alterMessageAPI(change_user) {
    return requestToken({
        url: 'api/user/listed/change/user/message',
        method: 'POST',
        data: change_user
    })
}

//修改头像
export function alterHeadPhotoAPI(file) {
    return requestToken({
        url: 'api/user/listed/change/user/picture',
        method: 'POST',
        data: file,
    })
}

//修改密码
export function alterPasswordAPI(data){
    return requestToken({
        url:'api/user/listed/revise/user/password',
        method:'POST',
        data,
    })
}

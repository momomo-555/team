/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 15:18:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-10 15:10:44
 * @FilePath: \renai_admin_two\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from '@/utils'
import { requestToken } from '@/utils'

/**登录  */
//登录 ---获取验证码
export function loginYzmAPI() {
    return request({
        url: 'api/user/unlisted/get/picture/code',
        method: 'GET',
    })
}

//登录
export function loginAPI(data) {
    return request({
        url: 'api/user/unlisted/login',
        method: 'POST',
        data,
    })
}
//退出登录
export function outLoginAPI() {
    return requestToken({
        url: 'api/user/listed/quit',
        method: 'GET',
    })
}

/**用户 */
//根据姓名查找
export function nameSearchAPI(p, pn, data) {
    return requestToken({
        url: `api/user/listed/seek/name/user?p=${p}&pn=${pn}`,
        method: 'POST',
        data,
    })
}
//根据年级查找
export function gradeSearchAPI(p, pn, data) {
    return requestToken({
        url: `api/user/listed/seek/grade/user?p=${p}&pn=${pn}`,
        method: 'POST',
        data,
    })
}
//修改正常用户信息
export function editorUserAPI(data) {
    return requestToken({
        url: 'api/user/listed/change/user/message',
        method: 'POST',
        data,
    })
}
//不同用户获取页面信息
export function userGetMessageAPI(p, pn, data) {
    return requestToken({
        url: `api/user/listed/get/user/status?p=${p}&pn=${pn}`,
        method: 'POST',
        data,
    })
}

//同意用户注册
export function agreeRegisterAPI(data) {
    return requestToken({
        url: 'api/user/listed/agree/register/user',
        method: 'POST',
        data,
    })
}
///拒绝用户注册
export function rejectRegisterAPI(data) {
    return requestToken({
        url: 'api/user/listed/refuse/register/user',
        method: 'POST',
        data,
    })
}
//正在注册，添加一个黑名单
export function registerAddBlockAPI(data) {
    return requestToken({
        url: 'api/user/listed/add/user/to/black',
        method: 'POST',
        data,
    })
}

//黑名单，增加一个黑名单
export function addBlockAPI(data) {
    return requestToken({
        url: 'api/user/listed/add/user/black',
        method: 'POST',
        data,
    })
}
//删除一个黑名单
export function deleteBlockAPI(data) {
    return requestToken({
        url: 'api/user/listed/delete/user/black',
        method: 'POST',
        data,
    })
}

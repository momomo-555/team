/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-21 17:01:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-24 12:43:25
 * @FilePath: \renai_two\src\api\pageMessage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils"
import { requestToken } from '@/utils'
//首页关于我们
export function aboutAPI() {
    return request({
        url: 'api/reception/get/about/us',
        method: 'GET'
    })
}
// 首页--学习方式
export function learnStyleAPI() {
    return request({
        url: 'api/reception/get/learning/style',
        method: 'GET'
    })
}
// 首页--社团位置
export function comAdressAPI() {
    return request({
        url: 'api/reception/get/club/location',
        method: 'GET'
    })
}

// 招新--培训时间
export function timeInfoAPI() {
    return request({
        url: 'api/reception/get/training/time',
        method: 'GET'
    })
}
// 招新--培训信息
export function trainInfoAPI() {
    return request({
        url: 'api/reception/get/training/message',
        method: "GET"
    })
}
// 社团招新(社团信息)--培训人员
export function perInfoAPI(num, type) {
    return request({
        url: `api/reception/get/number/message?p=${num}&pn=6`,
        method: "POST",
        data: type,
    })
}

//社团信息--主攻方向
export function mainDirectionAPI() {
    return request({
        url: 'api/reception/get/club/direction',
        method: 'GET'
    })
}
// 社团信息--获奖信息
export function awardInfoAPI(num) {
    return request({
        url: `api/reception/get/prize/message?p=${num}&pn=6`,
        method: 'GET',
    })
}
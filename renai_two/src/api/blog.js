/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-02 16:53:08
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-04 16:32:59
 * @FilePath: \renai_two\src\api\blog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils"
import { requestToken } from '@/utils'

//复原文章
export function regainArtileAPI(data) {
    return requestToken({
        url: 'api/blog/listed//garbage/move/draft',
        method: 'POST',
        data,
    })
}

//删除文章
export function deleteArtileAPI(data) {
    return requestToken({
        url: 'api/blog/listed/delete/user/blog',
        method: 'POST',
        data
    })
}
//回收站彻底删除文章
export function completeDeleteArtileAPI(data) {
    return requestToken({
        url: 'api/blog/listed/completely/delete/blog',
        method: 'POST',
        data
    })
}
//加载页面信息(未审核，已经审核，草稿，已经删除)
export function getWriteMessageAPI(p, pn,one, data) {
    return requestToken({
        url: `api/blog/listed/get/blog/type?p=${p}&pn=${pn}&one=${one}`,
        method: 'POST',
        data
    })
}

//用户保存博客或者获取博客uuid
export function articleAPI(data) {
    return requestToken({
        url: 'api/blog/listed/add/user/blog',
        method: 'POST',
        data
    })
}

//博客上传图片
export function blogUploadFileAPI(uuid, data) {
    return requestToken({
        url: `api/blog/listed/add/blog/picture/${uuid}`,
        method: 'POST',
        data
    })
}

//修改文章获取单个博客内容
export function articleMessageAPI(data) {
    return requestToken({
        url: 'api/blog/listed/get/change/blog',
        method: 'POST',
        data
    })
}
//发布博客或保存草稿
export function articleOptionsAPI(data) {
    return requestToken({
        url: 'api/blog/listed/add/user/blog',
        method: 'POST',
        data
    })
}

//首页信息加载获取底部文章信息
export function firstPageMessage(p, pn,one, data) {
    return request({
        url: `api/blog/unlisted/get/blog?p=${p}&pn=${pn}&one=${one}`,
        method: 'POST',
        data
    })
}

//搜索加载文章
export function searchArticleAPI(p, pn,one, data) {
    return request({
        url: `api/blog/unlisted/get/blog/search?p=${p}&pn=${pn}&one=${one}`,
        method: 'POST',
        data
    })
}

//获取具体某一篇文章的内容
export function EssayContentAPI(uuid) {
    return requestToken({
        url: `api/blog/unforce/get/blog/${uuid}`,
        method: 'GET',
    })
}

//收藏博客
export function collectEssayAPI(data) {
    return requestToken({
        url: 'api/blog/listed/add/collection/blog',
        method: 'POST',
        data
    })
}
//删除收藏博客
export function removeCollectEssayAPI(data) {
    return requestToken({
        url: 'api/blog/listed/delete/collection/blog',
        method: 'POST',
        data
    })
}

//加载所有收藏文章(个人中心--收藏)
export function collectArticlesAPI(p, pn,one) {
    return requestToken({
        url: `api/blog/listed/get/collection/blog?p=${p}&pn=${pn}&one=${one}`,
        method: 'GET',
    })
}

//博客中心--审核文章
export function checkArticleAPI(data){
    return requestToken({
        url: 'api/blog/listed/publish/draft/blog',
        method: 'POST',
        data
    })
}

//文章具体页面--获取作者信息
export function getAuthorMessageAPI(uuid){
    return request({
        url: `api/blog/unlisted/user/message/${uuid}`,
        method: 'GET',
    })
}
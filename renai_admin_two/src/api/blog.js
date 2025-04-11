/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 15:19:01
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-07 18:13:09
 * @FilePath: \renai_admin_two\src\api\blog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from '@/utils'
import { requestToken } from '@/utils'
/**已审核 */
export function alreadyCheckAPI(p, pn, data) {
    return requestToken({
        url: `api/blog/get/blog?p=${p}&pn=${pn}`,
        method: 'POST',
        data
    })
}

/*公共*/
//修改文章状态(已审核删除/未审核...)
export function editorArticleAPI(data) {
    return requestToken({
        url: 'api/blog/revise/blog/process',
        method: 'POST',
        data
    })
}
//获取单个博客单个内容
export function getArticleContent(data) {
    return requestToken({
        url: 'api/blog/get/one/article',
        method: 'POST',
        data
    })
}

/**未审核 */
export function withoutCheckAPI(p, pn) {
    return requestToken({
        url: `api/blog/get/article/unapproved?p=${p}&pn=${pn}`,
        method: 'GET',
    })
}
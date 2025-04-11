import { request } from '@/utils'
import { requestToken } from '@/utils'

/**信息 */
/*获奖信息*/
export function awardInfoAPI(p, pn) {
    return requestToken({
        url: `api/reception/get/award/information?p=${p}&pn=${pn}`,
        method: 'GET',
    })
}
//获奖信息修改
export function awardInfoEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/award/information',
        method: 'POST',
        data
    })
}
//获奖信息删除
export function awardInfoDeleteAPI(data) {
    return requestToken({
        url: 'api/reception/delete/award/information',
        method: 'POST',
        data
    })
}
//获奖信息增加
export function awardInfoAddAPI(data) {
    return requestToken({
        url: 'api/reception/add/award/information',
        method: 'POST',
        data
    })
}

/**公共 */
//上传图片
export function uploadPhotoAPI(id,data) {
    return requestToken({
        url: `api/reception/change/picture/${id}`,
        method: 'POST',
        data,
    })
}

/**主攻方向 */
export function mainDirectionAPI() {
    return requestToken({
        url: 'api/reception/get/club/direction',
        method: 'GET',
    })
}
//修改主攻方向
export function mainDirectionEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/club/direction',
        method: 'POST',
        data
    })
}
//删除主攻方向
export function mainDirectionDeleteAPI(data) {
    return requestToken({
        url: 'api/reception/delete/club/direction',
        method: 'POST',
        data
    })
}
//增加主攻方向
export function mainDirectionAddAPI(data) {
    return requestToken({
        url: 'api/reception/add/club/direction',
        method: 'POST',
        data
    })
}

/**培训信息 */
export function recruitmentInfoAPI() {
    return requestToken({
        url: 'api/reception/get/training/message',
        method: 'GET',
    })
}
//修改培训信息
export function recruitmentInfoEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/training/message',
        method: 'POST',
        data
    })
}
/*培训时间*/
export function recruitmentTimeAPI() {
    return requestToken({
        url: 'api/reception/get/training/time',
        method: 'GET',
    })
}
//时间修改
export function recruitmentTimeEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/training/time',
        method: 'POST',
        data
    })
}
//时间删除
export function recruitmentTimeDeleteAPI(data) {
    return requestToken({
        url: 'api/reception/delete/training/time',
        method: 'POST',
        data
    })
}
//时间增加
export function recruitmentTimeAddAPI(data) {
    return requestToken({
        url: 'api/reception/add/training/time',
        method: 'POST',
        data
    })
}

/**首页信息 */
/**关于我们 */
export function AboutAPI() {
    return requestToken({
        url: 'api/reception/get/about/us',
        method: 'GET',
    })
}
//关于我们修改
export function AboutEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/about/us',
        method: 'POST',
        data
    })
}
/**学习方式 */
export function learnStyleAPI() {
    return requestToken({
        url: 'api/reception/get/learning/style',
        method: 'GET',
    })
}
//学习方式修改
export function learnStyleEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/learning/style',
        method: 'POST',
        data
    })
}
/**社团位置 */
export function LocationAPI() {
    return requestToken({
        url: 'api/reception/get/club/location',
        method: 'GET',
    })
}
//社团位置修改
export function LocationAPIEditorAPI(data) {
    return requestToken({
        url: 'api/reception/revise/community/location',
        method: 'POST',
        data
    })
}
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 14:48:33
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 14:48:48
 * @FilePath: \renai_admin_two\src\utils\token.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 封装token相关的方法 存 取 删
function setToken(tokenName, token) {
    return localStorage.setItem(tokenName, token)
}

function getToken(tokenName) {
    return localStorage.getItem(tokenName)
}

function removeToken(tokenName) {
    return localStorage.removeItem(tokenName)
}

export { setToken, getToken, removeToken }

// 封装token相关的方法 存 取 删
function setToken(tokenName,token){
    return localStorage.setItem(tokenName,token)
}

function getToken(tokenName){
    return localStorage.getItem(tokenName)
}

function removeToken(tokenName){
    return localStorage.removeItem(tokenName)
}

export { setToken, getToken, removeToken }

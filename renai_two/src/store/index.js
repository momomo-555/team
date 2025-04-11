/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-21 18:02:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-24 20:48:39
 * @FilePath: \renai_two\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'
export default createStore({
    state: {
        // 判断是否登陆成功
        loginFight: false,
        // 头像是否修改
        editPhoto:false,
    },
    mutations: {
        loginFightToggle(state,val) {
            state.loginFight = val
            console.log('loginFight...', state.loginFight)
        },
        isEditPhoto(state,val){
            state.editPhoto=val
            console.log('isEditPhoto...', state.editPhoto)
        }
    },
    actions: {
        // loginFightUpdata({ commit }) {
        //     commit('loginFightToggle')
        // }
    },
    // getters:{
    //     loginFight: (state) => state.loginFight
    // }
})
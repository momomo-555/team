<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 09:53:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-26 13:56:29
 * @FilePath: \renai_two\src\components\Center\Model_password.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="Model_wai" v-show="model_pa_show">
        <div class="model_2">
            <div class="model_header">
                <span style="margin-left:10px;font-size:18px;">修改密码</span>
                <span style="margin-right:10px;font-size:25px;cursor:pointer" @click="close_button">x</span>
            </div>
            <div style="margin-top: 30px;">
                <div class="model_con">
                    <label for="oldpassword" style="margin-right:15px;cursor:pointer;margin-top: 2px;">输入旧密码</label>
                    <div style="position:relative">
                        <input id="oldpassword" v-model="oldpassword.value"
                            :type="showPassword.value ? 'text' : 'password'" placeholder="密码(必须包含一个大写,一个小写字母,且长度为8到16位)"
                            @input="verify_password(oldpassword, old_pa_err)">
                        <p class="err" v-show="old_pa_err.value">{{ old_pa_err.value }}</p>
                        <span class="iconfont " :class="showPassword.value ? 'icon-yanjing-zhengyan' : 'icon-biyan'"
                            @click="swith_click(showPassword)"></span>
                    </div>
                </div>
                <div class="model_con">
                    <label for="newpassword" style="margin-right:15px;cursor:pointer;margin-top: 2px;">输入新密码</label>
                    <div style="position:relative">
                        <input id="newpassword" v-model="newpassword.value" placeholder="密码(必须包含一个大写,一个小写字母,且长度为8到16位)"
                            :type="showPassword2.value ? 'text' : 'password'"
                            @input="verify_password(newpassword, new_pa_err)">
                        <p class=" err" v-show="new_pa_err.value">{{ new_pa_err.value }}</p>
                        <span class="iconfont " :class="showPassword2.value ? 'icon-yanjing-zhengyan' : 'icon-biyan'"
                            @click="swith_click(showPassword2)"></span>
                    </div>
                </div>
                <div class="model_con">
                    <label for="twopassword" style="margin-right:15px;cursor:pointer;margin-top: 2px;">确认新密码</label>
                    <div style="position:relative">
                        <input id="twopassword" v-model="twopassword.value"
                            :type="showPassword3.value ? 'text' : 'password'" placeholder="请再次输入密码"
                            @input="verify_password_two(twopassword, new_two_pa_err)">
                        <p class="err" v-show="new_two_pa_err.value">{{ new_two_pa_err.value }}</p>
                        <span class="iconfont " :class="showPassword3.value ? 'icon-yanjing-zhengyan' : 'icon-biyan'"
                            @click="swith_click(showPassword3)"></span>
                    </div>
                </div>
                <div class="model_con">
                    <button @click="firm_button" :class="firm_style" :disabled="firm_disable">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { alterPasswordAPI, logOutAPI } from '@/api/user'
import { mapStatus } from '@/utils'
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, reactive, watch } from 'vue'
import router from '@/router'
export default {
    name: 'Model_password',
    props: ['Msgpass'],
    setup(props, { emit }) {
        const store = useStore()

        let showPassword = reactive(
            {
                value: false
            }
        )
        let showPassword2 = reactive({
            value: false
        })
        let showPassword3 = reactive({
            value: false
        })
        // 输入框值
        let oldpassword = reactive({
            value: ''
        })
        let newpassword = reactive({
            value: ''
        })
        let twopassword = reactive({
            value: ''
        })
        // 错误
        let old_pa_err = reactive({
            value: ''
        })
        let new_pa_err = reactive({
            value: ''
        })
        let new_two_pa_err = reactive({
            value: ''
        })
        let firm_style = ref('firm_style1')
        let firm_disable = ref(false)
        function init() {
            oldpassword.value = ''
            newpassword.value = ''
            twopassword.value = ''
            old_pa_err.value = ''
            new_pa_err.value = ''
            new_two_pa_err.value = ''
            firm_style.value = 'firm_style1'
            firm_disable.value = false
        }
        let model_pa_show = ref(false)

        function swith_click(val) {
            val.value = !val.value
        }
        // 关闭按钮
        function close_button() {
            // 输入框内容清空
            init();
            model_pa_show.value = false;
            emit('child-parent-pa', false)
        }
        //退出登录
        async function logOut() {
            const res = await logOutAPI()
            if (res.code == 0) {
                // ElMessage.success('退出成功')
                // if (props.home_msg == '首页') {
                //     window.location.reload()
                //     // 刷新一下
                // }
                ElMessage.success('修改成功')
                init();
                model_pa_show.value = false;
                emit('child-parent-pa', false)

                store.commit('loginFight', false)
                router.push('/Login')
            } else {
                init();
                ElMessage.error('修改失败')
            }
        }
        //交互 
        async function password_firm() {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            if (!oldpassword.value || !newpassword.value || !twopassword.value || !passwordRegex.test(newpassword.value) || !passwordRegex.test(oldpassword.value) || !passwordRegex.test(twopassword.value)) {

                ElMessage.warning('密码不能为空且格式不能错误')
                return
            }
            firm_disable.value = true
            firm_style.value = 'firm_style2'
            // const map = new Map()
            // map.set('passowrd', newpassword.value)
            let change_user = {
                oldpassword: oldpassword.value,
                newpassword: newpassword.value,
            }
            const res = await alterPasswordAPI(change_user)
            if (res.code == 0) {
                // ElMessage.success('修改成功')
                // init();
                // model_pa_show.value = false;
                // emit('child-parent-pa', false)

                //退出登录
                logOut()
            } else {
                init();
                ElMessage.error(mapStatus.get(res.code))
            }

        }
        function firm_button() {
            password_firm()
        }


        function verify_password(val, err_val) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            if (val.value) {
                if (!passwordRegex.test(val.value)) {
                    err_val.value = '格式错误'
                } else {
                    err_val.value = ''
                }
            } else {
                err_val.value = '请输入密码'
            }

        }
        function verify_password_two(val, err_val) {
            if (val.value) {
                if (val.value != newpassword.value) {
                    err_val.value = '两次密码不一致'
                } else {
                    err_val.value = ''
                }
            } else {
                err_val.value = '请输入密码'
            }
        }

        watch(() => props.Msgpass, (newval, oldval) => {
            if (newval) {
                model_pa_show.value = newval
            }
        })
        return {
            showPassword,
            swith_click,
            showPassword2,
            showPassword3,
            close_button,
            model_pa_show,
            firm_button,
            oldpassword,
            newpassword,
            twopassword,
            verify_password,
            old_pa_err,
            new_pa_err,
            new_two_pa_err,
            verify_password_two,
            firm_style,
            firm_disable,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.firm_style1 {
    background-color: lightskyblue;
}

.firm_style2 {
    background-color: #9a9a9a;
}

.err {
    color: red;
    text-align: center;
}

.Model_wai {
    z-index: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.model_2 {
    z-index: 2;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-45%, -50%);
    background-color: #ffffffd8;
    height: 320px;
    width: 600px;
    border-radius: 4px;
}

.model_2 .model_header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #cec5c5;
}

.model_con {
    height: 60px;
    width: 400px;
    display: flex;
    margin: 0 auto;
}

.model_con input {
    width: 250px;
    height: 20px;
    padding: 5px 25px 5px 5px;
    border-radius: 2px;
    outline: 0px;
    border: 0px;
}

.model_con button {
    margin: 0 auto;
    height: 30px;
    width: 110px;
    outline: 0px;
    border: 0px;
    border-radius: 5px;
}

.iconfont {
    font-size: 20px;
    color: rgb(78, 78, 78);
    cursor: pointer;
    position: absolute;
    top: 1px;
    right: 2px;
}
</style>
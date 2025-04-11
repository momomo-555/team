<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 09:53:26
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-19 10:54:54
 * @FilePath: \renai_two\src\components\Center\Model.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
-->
<template>
    <div class="model_wai" v-show="model_fight">
        <div class="model_1">
            <div class="model_header">
                <span style="margin-left:10px;font-size:18px;">修改邮箱</span>
                <span style="margin-right:10px;font-size:25px;cursor:pointer" @click="close_button">x</span>
            </div>

            <div class="model_con">
                <div class="con_top">
                    <div class="top_l" style="margin-left:15px; position:relative">
                        <span class="iconfont icon-1" :class="iconfont_style_1"></span>
                        <span style="margin-left:30px;">邮箱验证</span>
                    </div>
                    <div class="line"></div>
                    <div class="top_r" style="margin-right:15px;position:relative">
                        <span class="iconfont icon-2" :class="iconfont_style_2"></span>
                        <span style="margin-left:30px;">更改邮箱</span>
                    </div>
                </div>
                <!-- 开始验证 -->
                <div class="con_content" v-show="ver_fight">
                    <div class="content_box">
                        <label for="mail" style="margin-right: 10px;cursor:pointer">邮&nbsp;&nbsp;&nbsp;箱</label>
                        <input v-model="mali_input.value" id="mail" style="width:330px;"
                            @input="mail_verify(mali_input, mail_err)" placeholder="请输入邮箱">
                        <p class="err" v-show="mail_err.value">{{ mail_err.value }}</p>
                    </div>
                    <div class="content_box" style="display:flex;justify-content:space-between">
                        <div>
                            <label for="yzm" style="margin-right: 10px;cursor:pointer">验证码</label>
                            <input id="yzm" v-model="yzm_input.value" style="width:150px;">
                        </div>
                        <button :class="yzm_input.style" :disabled="yzm_input.disable"
                            @click="get_yzm(mali_input, yzm_input)">{{
                                yzm_input.button_val }}</button>
                    </div>
                    <div class="content_box" style="display:flex;justify-content:center">
                        <button @click="get_yanzheng" :class="beginVerify.style"
                            :disabled="beginVerify.disable">开始验证</button>
                    </div>
                </div>
                <!-- 提交 -->
                <div class="con_content" v-show="sub_fight">
                    <div class="content_box">
                        <label for="new_mail" style="margin-right: 10px;cursor:pointer">新邮箱</label>
                        <input id="new_mail" placeholder="请输入新邮箱" v-model="new_mail_input.value" style="width:330px;"
                            @input="mail_verify(new_mail_input, mail_new_err)">
                        <p class="err" v-show="mail_new_err.value">{{ mail_new_err.value }}</p>
                    </div>
                    <div class="content_box" style="display:flex;justify-content:space-between">
                        <div>
                            <label for="ver" style="margin-right: 10px;cursor:pointer">验证码</label>
                            <input v-model="yzm_two_input.value" id="ver" style="width:150px;">
                        </div>
                        <button @click="get_yzm_two(new_mail_input, yzm_two_input)" :class="yzm_two_input.style"
                            :disabled="yzm_two_input.disable">{{
                                yzm_two_input.button_val }}</button>
                    </div>
                    <div class="content_box" style="display:flex;justify-content:center">
                        <button @click="mail_sub_click" :class="submitButton.style"
                            :disabled="submitButton.disable">提交</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
export default {
    name: 'Model',
    props: ['Msg'],
    setup(props, { emit }) {
        let model_fight = ref(false)
        model_fight.value = props.Msg
        // console.log(props.Msg, 'props.Msg')
        let ver_fight = ref(true)
        let sub_fight = ref(false)

        let iconfont_style_1 = ref('iconfont_style')
        let iconfont_style_2 = ref('')
        let time = ref(60)
        let mali_input = reactive({
            value: ''
        })
        let yzm_input = reactive({
            value: '',
            style: 'yz_button_style1',
            disable: false,
            button_val: '获取验证码',
        })
        let new_mail_input = reactive({
            value: ''
        })
        let yzm_two_input = reactive({
            value: '',
            style: 'yz_button_style1',
            disable: false,
            button_val: '获取验证码',
        })

        let mail_err = reactive({
            value: ''
        })
        let mail_new_err = reactive({
            value: ''
        })
        let beginVerify = reactive({
            style: 'yz_button_style1',
            disable: false,
        })
        let submitButton = reactive({
            style: 'yz_button_style1',
            disable: false,
        })
        let timer1;
        function init_data() {
            mali_input.value = ''
            yzm_input.value = ''
            new_mail_input.value = ''
            yzm_two_input.value = ''
            mail_err.value = ''
            mail_new_err.value = ''

            yzm_input.style = 'yz_button_style1'
            yzm_input.disable = false
            yzm_input.button_val = '获取验证码'

            yzm_two_input.style = 'yz_button_style1'
            yzm_two_input.disable = false
            yzm_two_input.button_val = '获取验证码'
            time.value = 60
            clearInterval(timer1);

            beginVerify.style = 'yz_button_style1'
            beginVerify.disable = false

            submitButton.style = 'yz_button_style1'
            submitButton.disable = false
        }
        // 初始化
        function init() {
            iconfont_style_1.value = 'iconfont_style'
            iconfont_style_2.value = ''
            ver_fight.value = true
            sub_fight.value = false
        }
        // 关闭整个弹窗
        function close_button() {
            init_data()
            emit('child-parent', false)
            model_fight.value = false
            init();
        }
        // 新邮箱提交按钮需要的数据
        let captcha = ref('');


        // 检验邮箱格式
        function mail_verify(val, err_val) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val.value) {
                if (!emailRegex.test(val.value)) {
                    err_val.value = '格式错误'
                } else {
                    err_val.value = ''
                }
            } else {
                err_val.value = '请输入邮箱'
            }
        }
        watch(() => props.Msg, (newval, oldval) => {
            if (newval) {
                model_fight.value = newval
            }
        })



        return {
            model_fight,
            close_button,
            iconfont_style_1,
            iconfont_style_2,
            // get_yanzheng,
            // mail_sub_click,
            ver_fight,
            sub_fight,
            mali_input,
            yzm_input,
            new_mail_input,
            yzm_two_input,
            mail_verify,
            mail_err,
            mail_new_err,
            // get_yzm,
            beginVerify,
            // get_yzm_two,
            // loading_yz_two,
            submitButton,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.yz_button_style1 {
    background-color: lightskyblue;
}

.yz_button_style2 {
    background-color: #9a9a9a;
}

.err {
    text-align: center;
    color: red
}

.click_style {
    color: #9a9a9a !important;
}

.model_wai {
    z-index: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.model_1 {
    z-index: 2;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-45%, -50%);
    background-color: #ffffffd8;
    height: 310px;
    width: 600px;
    border-radius: 4px;
}

.model_1 .model_header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #cec5c5;
}

.model_con .con_top {
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
}

.line {
    margin: 12px 10px;
    flex-grow: 1;
    border-top: 1px solid #cec5c5;
}

.model_con .con_content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.iconfont {
    font-size: 25px;
    position: absolute;
    top: -5px;
}

.iconfont_style {
    color: rgb(120, 166, 250);
}

.con_content {
    margin-top: 30px;
}

.con_content .content_box {
    height: 60px;
    width: 400px;
}

.con_content .content_box input {
    height: 20px;
    padding: 5px;
    border-radius: 2px;
    outline: 0px;
    border: 0px;
}

.content_box button {
    height: 30px;
    width: 110px;
    outline: 0px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
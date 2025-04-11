<template>
    <div class="Model_wai" v-show="cancle_fig_show">
        <div class="model_3">
            <div class="model_header">
                <span style="margin-left:10px;font-size:18px;">注销账户</span>
                <span style="margin-right:10px;font-size:25px;cursor:pointer" @click="close_button">x</span>
            </div>
            <div class="con_content">
                <div class="content_box">
                    <label for="mail_cel"
                        style="margin-right: 10px; cursor:pointer;">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                    <input v-model="mail_input.value" id="mail_cel" style="width:300px;" placeholder="请输入邮箱"
                        @input="verify_mail">
                    <p class="err" v-show="mail_err">{{ mail_err }}</p>
                </div>
                <div class="content_box" style="display:flex;justify-content:space-between">
                    <div>
                        <label for="yzm_cel"
                            style="margin-right: 10px; cursor:pointer">验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>
                        <input v-model="yzm_input.value" id="yzm_cel" style="width:130px;">
                    </div>
                    <button @click="get_yzm(mail_input, yzm_input)" style="margin-right:15px;" :class="yzm_input.style"
                        :disabled="yzm_input.disable">{{ yzm_input.button_val }}</button>
                </div>
                <div class="content_box" style="height:auto !important;position:relative;margin-bottom:15px;">
                    <label for="liyou" style="margin-right: 10px;position:absolute;cursor:pointer">注销理由</label>
                    <textarea v-model="textarea_liyou" id="liyou"></textarea>
                </div>
                <div class="content_box" style="display:flex;justify-content:center">
                    <button @click="destroy_button" :class="Firmcancel.style"
                        :disabled="Firmcancel.disable">确认注销</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import router from '@/router'
export default {
    name: 'Model_cancel',
    props: ['Msgcel'],
    setup(props, { emit }) {
        let cancle_fig_show = ref(false)
        let mail_input = reactive({
            value: '',
        })
        let yzm_input = reactive({
            value: '',
            style: 'yz_button_style1',
            disable: false,
            button_val: '获取验证码',
        })
        let textarea_liyou = ref('')
        let mail_err = ref('')
        let Firmcancel = reactive({
            style: 'yz_button_style1',
            disable: false,
        })
        let time = ref(60)
        let timer1;
        function init() {
            mail_input.value = ''
            yzm_input.value = ''
            textarea_liyou.value = ''
            mail_err.value = ''

            yzm_input.style = 'yz_button_style1'
            yzm_input.disable = false
            yzm_input.button_val = '获取验证码'
            time.value = 60
            clearInterval(timer1);
            Firmcancel.style = 'yz_button_style1'
            Firmcancel.disable = false
        }
        function close_button() {
            // 清空输入框数据
            init();
            cancle_fig_show.value = false
            emit('child-parent-cel', false)
        }

        // 验证邮箱格式
        function verify_mail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (mail_input.value) {
                if (!emailRegex.test(mail_input.value)) {
                    mail_err.value = '格式错误'
                } else {
                    mail_err.value = ''
                }
            } else {
                mail_err.value = '请输入邮箱'
            }
        }

        //交互


        watch(() => props.Msgcel, (newval, oldval) => {
            if (newval) {
                cancle_fig_show.value = newval
            }
        })
        return {
            cancle_fig_show,
            close_button,
            // destroy_button,
            mail_input,
            yzm_input,
            textarea_liyou,
            verify_mail,
            mail_err,
            // get_yzm,
            Firmcancel,
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

.model_3 {
    z-index: 2;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-45%, -50%);
    background-color: #ffffffd8;
    height: auto;
    width: 600px;
    border-radius: 4px;
}

.model_3 .model_header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #cec5c5;
}

.con_content {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content_box {
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
}

.con_content .content_box textarea {
    max-height: 80px;
    padding: 5px;
    border-radius: 2px;
    outline: 0px;
    border: 0px;
    width: 300px;
    outline: none;
    resize: vertical;
    overflow-y: auto;
    margin-left: 75px;
}
</style>
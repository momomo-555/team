<template>
    <!-- <button :plain="true" @click="open2">Success</button> -->

    <div class="login">
        <form class="Form" v-show="p.fight" onsubmit="return false;">
            <LoginHeader @cfanhui="Pfanhui"></LoginHeader>
            <div class="con">
                <div class="con_nei">
                    <div style="position:relative">
                        <div class="img"><img src="../../assets/hello.gif"></div>
                        <div class="St ">
                            <p class="p">登录</p>
                        </div>
                    </div>
                    <div class="St">
                        <div>
                            <input class="" placeholder="邮箱" type="text" @input="checkEmailFormat" v-model="p.email"
                                @focus="Efocus">
                            <p v-if="p.emailError" class="error">{{ p.emailError }}</p>
                        </div>
                    </div>
                    <div class="St eye-icon-wai" style="position:relative">
                        <div>
                            <input class="" v-model="p.password" :type="p.showPassword ? 'text' : 'password'"
                                placeholder="请输入密码(必须包含大小写字母,且长度为8到16位)" @input="Pgeshi" @focus="Pfocus">
                            <p v-if="p.passwordError" class="error">{{ p.passwordError }}</p>
                        </div>
                        <span class="eye-icon" @click="togglePassword">{{ p.showPassword ? '😃' : '😞' }}</span>
                    </div>
                    <div class="St An">
                        <div>
                            <input class="Yzm" placeholder="验证码" type="text" v-model="p.Yvalue" @input="Iskong"
                                @focus="Yfocus">
                            <p v-if="p.YvalueError" class="error">{{ p.YvalueError }}</p>
                        </div>
                        <img class="Y_photo" :src="p.B64s" alt="验证码" @click="PhotoYzm" />
                    </div>
                    <div class="St An ">
                        <button type="button" class="span" :class="p.ZC_button" :disabled="p.is_ZC"
                            @click="botton_log">登录</button>
                        <span class="span span2" style="cursor:pointer;" @click="Switch">注册</span>
                    </div>
                    <div class="St Wang">
                        <span class="Wm" @click="Modelshow">忘记密码</span>
                    </div>
                </div>
            </div>
        </form>
        <!-- 模态框 -->
        <!-- model1 -->
        <div class="model_wai" v-show="p.m_fight">
            <div class="model model1" v-show="p.m_fight">
                <div class="Mtop">
                    <p class="m_p">忘记密码</p>
                    <i @click="m_close">X</i>
                </div>
                <div class="m_St m_St4">
                    <div class="input_wai">
                        <input class="w_input" placeholder="邮箱" type="text" @input="checkEmailFormat" v-model="p.email"
                            @focus="Efocus">
                        <p v-if="p.emailError" class="error">{{ p.emailError }}</p>
                    </div>
                </div>
                <!-- 密码一次 -->
                <div class="m_St m_St4 eye-icon-wai" style="position:relative">
                    <div class="input_wai">
                        <input class="w_input" v-model="p.password" :type="p.showPassword ? 'text' : 'password'"
                            placeholder="请输入密码(必须包含大小写字母,且长度为8到16位)" @input="Pgeshi" @focus="Pfocus">
                        <p v-if="p.passwordError" class="error">{{ p.passwordError }}</p>
                    </div>
                    <span class="eye-icon-m1" @click="togglePassword">{{ p.showPassword ? '😃' : '😞' }}</span>
                </div>
                <div class="m_St m_St4 eye-icon-wai" style="position:relative">
                    <div class="input_wai">
                        <input class="w_input" v-model="p.password2" :type="p.showPassword2 ? 'text' : 'password'"
                            placeholder="请再次输入密码" @input="Pgeshi2" @focus="Pfocus2">
                        <p v-if="p.passwordError2" class="error">{{ p.passwordError2 }}</p>
                    </div>
                    <span class="eye-icon-m2" @click="togglePassword2">{{ p.showPassword2 ? '😃' : '😞' }}</span>
                </div>
                <div class="m_St An">
                    <div>
                        <input class="m_input Yzm2" placeholder="验证码" type="text" v-model="p.Yvalue" @input="Iskong"
                            @focus="Yfocus">
                        <p v-if="p.YvalueError" class="error">{{ p.YvalueError }}</p>
                    </div>
                    <!-- <button class="Y_photo" src="../../assets/yan.png" alt="验证码" /> -->
                    <button :class="p.get_class" :disabled="p.isButtonDisabled"
                        @click=" ZC_GetYzm('api/user/unlisted/forgect/mailbox/code')">
                        {{ p.button_value
                        }}</button>
                </div>
                <div class="m_St m_St3">
                    <button class="m_button" :class="p.got_button_style" @click="finishYZ"
                        :disabled="p.got_button">完成</button>
                </div>
            </div>
        </div>

        <!-- 注册 -->
        <form v-show="p.fight2" class="Form" onsubmit="return false;">
            <LoginHeader @cfanhui="Pfanhui"></LoginHeader>
            <!-- <button @click="Switch2">denglu </button> -->
            <div class="con2">
                <div class="con2_nei">
                    <div style="position:relative">
                        <div class="img2"><img src="../../assets/reg2.gif"></div>
                        <div class="St ">
                            <p class="p">注册</p>
                        </div>
                    </div>
                    <div class="St ">
                        <div>
                            <input class="" placeholder="用户名" type="text" v-model="p.niCheng">
                            <!-- <p v-if="p.emailError" class="error">{{ p.emailError }}</p> -->
                        </div>
                    </div>
                    <div class="St ">
                        <div>
                            <input class="" placeholder="邮箱" type="text" @input="checkEmailFormat" v-model="p.email"
                                @focus="Efocus">
                            <p v-if="p.emailError" class="error">{{ p.emailError }}</p>
                        </div>
                    </div>
                    <div class="St eye-icon-wai" style="position:relative">
                        <div>
                            <input class="" v-model="p.password" :type="p.showPassword ? 'text' : 'password'"
                                placeholder="请输入密码(必须包含大小写字母,且长度为8到16位)" @input="Pgeshi" @focus="Pfocus">
                            <p v-if="p.passwordError" class="error">{{ p.passwordError }}</p>
                        </div>
                        <span class="eye-icon2" @click="togglePassword">{{ p.showPassword ? '😃' : '😞' }}</span>
                    </div>
                    <div class="St eye-icon-wai" style="position:relative">
                        <div>
                            <input class="" v-model="p.password2" :type="p.showPassword2 ? 'text' : 'password'"
                                placeholder="请再次输入密码" @input="Pgeshi2" @focus="Pfocus2">
                            <p v-if="p.passwordError2" class="error">{{ p.passwordError2 }}</p>
                        </div>
                        <span class="eye-icon3" @click="togglePassword2">{{ p.showPassword2 ? '😃' : '😞' }}</span>
                    </div>
                    <div class="St An ">
                        <div>
                            <input class=" Yzm2" placeholder="验证码" type="text" v-model="p.Yvalue" @input="Iskong"
                                @focus="Yfocus">
                            <p v-if="p.YvalueError" class="error">{{ p.YvalueError }}</p>
                        </div>
                        <!-- <button class="Y_photo" src="../../assets/yan.png" alt="验证码" /> -->
                        <button :class="p.get_class" @click="ZC_GetYzm('api/user/unlisted/get/mailbox/code')"
                            :disabled="p.isButtonDisabled">{{ p.button_value
                            }}</button>
                    </div>
                    <div class="St An ">
                        <button class="span" :class="p.ZC_button" :disabled="p.is_ZC" @click="botton_reg">注册</button>
                        <span class="span span2" style="cursor:pointer;" @click="Switch2">登录</span>
                    </div>
                </div>
            </div>
        </form>
        <!-- <img src="../../assets/yan.png"></img> -->
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { mapStatus } from '@/utils'
import { loginAPI, photoYzmAPI, regGetYzmAPI, regAPI, forgetPasswordAPI } from '@/api/user'
import { setToken, getToken } from '@/utils'
import router from '@/router/index'
import LoginHeader from './LoginHeader.vue'
import { reactive, ref, onUpdated, onMounted } from 'vue'
// import { ElMessage } from 'element-plus'

export default {
    name: 'MainLogin',
    components: { LoginHeader },
    setup() {
        const store = useStore()
        const p = reactive({
            // 登录
            time: 60,
            fight: true,
            fight2: false,
            password: '',
            passwordError: '',
            showPassword: false,
            email: '',
            emailError: '',
            Yvalue: '',
            YvalueError: '',
            // 模态框
            m_fight: false,
            // 
            button_value: '获取验证码',

            // 注册
            niCheng: '',
            password2: '',
            showPassword2: false,
            passwordError2: '',
            get_class: 'Getm',
            isButtonDisabled: false,
            // 交互
            ZC_button: 'ZC_button1',
            is_ZC: false,
            Id: '',
            B64s: '',
            // ../../assets/yan.png
            Forget_mailbox: '',
            Forget_yzm: '',
            got_button: false,
            got_button_style: 'got_button_style1',
            finish_button: false,
            finish_button_style: 'got_button_style1',
        })
        // 初始
        function Initial() {
            // p.Forget_mailbox='';
            // p.Forget_yzm='';
            p.B64s = '';
            // ../../assets/yan.png
            p.Id = '';
            p.is_ZC = false;
            p.ZC_button = 'ZC_button1'
            p.button_value = '获取验证码',
                p.time = 60;
            p.password = '';
            p.passwordError = '';
            p.showPassword = false;
            p.email = '';
            p.emailError = '';
            p.Yvalue = '';
            p.YvalueError = '';
            //
            p.niCheng = '';
            p.password2 = '';
            p.showPassword2 = false;
            p.passwordError2 = '';
            p.get_class = 'Getm';
            p.isButtonDisabled = false;
            p.got_button = false;
            p.got_button_style = 'got_button_style1';
            // p.finish_button = false;
            // p.finish_button_style = 'got_button_style1';
        }

        // 登录
        function togglePassword() {
            p.showPassword = !p.showPassword;
        }
        function checkEmailFormat() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (p.email) {
                if (!emailRegex.test(p.email)) {
                    p.emailError = '请输入有效的邮箱格式！';
                }
                else {
                    p.emailError = '';
                }
            } else {
                p.emailError = '请输入邮箱!';
            }
        }
        function Efocus() {
            p.emailError = '';
        }
        function Iskong() {
            if (p.Yvalue) {
                p.YvalueError = ''
            } else {
                p.YvalueError = '请输入验证码!'
            }
        }
        function Yfocus() {
            p.YvalueError = '';
        }
        function Pgeshi() {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            if (p.password) {
                if (!passwordRegex.test(p.password)) {
                    p.passwordError = '密码(必须包含一个大写,一个小写字母,且长度为8到16位)!';
                }
                else {
                    p.passwordError = '';
                }
            } else {
                p.passwordError = '请输入密码!'
            }
        }
        function Pfocus() {
            p.passwordError = ''
        }

        // 清除切换时验证码的定时器
        let timer1;
        function Switch() {
            p.fight = false;
            p.fight2 = true;
            Initial();
        }
        function Switch2() {
            PhotoYzm()
            p.fight = true;
            p.fight2 = false;
            //清除定时器
            clearInterval(timer1);
            Initial();
        }
        // 注册
        function togglePassword2() {
            p.showPassword2 = !p.showPassword2;
        }
        function Pgeshi2() {
            if (p.password2) {
                if (p.password !== p.password2) {
                    p.passwordError2 = '两次密码不一致!'
                }
                else {
                    p.passwordError2 = '';
                }
            }
            else {
                p.passwordError2 = '请输入密码!'
            }
        }
        function Pfocus2() {
            p.passwordError2 = ''
        }
        function Pfanhui(value) {
            // console.log(value);
            p.fight = true;
            p.fight2 = false;
        }

        // 模态
        function m_close() {
            p.m_fight = false;
            PhotoYzm()
            Initial();
        }
        function Modelshow() {
            p.m_fight = true;
            Initial();
        }
        // const open2=()=>{
        //     console.log('点击了')
        //     ElMessage({
        //         message: ' 成功',
        //         type: 'success',
        //     })
        // }
        //登录
        async function PhotoYzm() {
            const res = await photoYzmAPI()
            if (res.code == 0) {
                // ElMessage.success('图片验证码获得成功')
                p.Id = res.data.id
                p.B64s = res.data.b64s
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        async function botton_log() {
            if (!p.email || !p.password || !p.Yvalue) {
                // alert('请先填写完整')
                ElMessage.warning('请先填写完整')
                return
            }
            let Login_per = {
                mailbox: p.email,
                password: p.password,
                b64s: p.Id,
                code: p.Yvalue
            }
            if (p.is_ZC) {
                return
            }
            p.ZC_button = 'ZC_button2';
            p.is_ZC = true;
            //开始请求
            const res = await loginAPI(Login_per)
            // console.log(res, 'res...')
            // store.commit('loginFightToggle',true)
            // router.push('/')
            if (res.code == 0) {
                ElMessage.success(mapStatus.get(res.code))
                if (res.data) {
                    console.log(res.data.access_token)
                    if (res.data.access_token) {
                        setToken('access_token', res.data.access_token)
                    }
                    if (res.data.refresh_token) {
                        setToken('refresh_token', res.data.refresh_token)
                    }
                    // if (res.data.uuid) {
                    //     setToken('uuid', res.data.uuid)
                    // }
                }
                ElMessage.success('登陆成功')
                // 头像触发,登录成功
                store.commit('loginFightToggle', true)
                router.push('/')
            } else {
                ElMessage.error(mapStatus.get(res.code))
                PhotoYzm();
            }
            p.ZC_button = 'ZC_button1';
            p.is_ZC = false;
        }
        // 注册
        async function ZC_GetYzm(url) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!p.email || !emailRegex.test(p.email)) {
                // alert('请确保邮箱内容不为空，并且格式正确')
                ElMessage.warning('请确保邮箱内容不为空，并且格式正确')
                return
            }
            const Mailbox = ref({
                mailbox: p.email
            })
            if (p.isButtonDisabled) {
                return
            }
            p.get_class = 'disable';
            p.isButtonDisabled = true;
            clearInterval(timer1);

            const res = await regGetYzmAPI(url, Mailbox.value)
            if (res.code == 0) {
                ElMessage.success(mapStatus.get(res.code))
                //倒计时
                p.isButtonDisabled = true;
                p.get_class = 'disable';
                timer1 = setInterval(() => {
                    if (p.time == 0) {
                        clearInterval(timer1);
                        p.isButtonDisabled = false;
                        p.get_class = 'Getm';
                        p.button_value = '获取验证码';
                        p.time = 60;
                    } else {
                        p.get_class = 'disable';
                        p.isButtonDisabled = true;
                        p.button_value = `还剩下${p.time}秒`;
                        p.time--;
                    }
                }, 1000)
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
            p.get_class = 'Getm';
            p.isButtonDisabled = false;
        }
        async function botton_reg() {
            // regAPI
            if (!p.niCheng || !p.email || !p.password || !p.password2 || !p.Yvalue) {
                // alert('请先填写完整')
                ElMessage.warning('请先填写完整')
                return
            }
            const person = ref({
                mailbox: p.email,
                name: p.niCheng,
                code: p.Yvalue,
                password: p.password,
            })
            // 交互
            if (p.is_ZC) {
                return
            }
            p.ZC_button = 'ZC_button2';
            p.is_ZC = true;
            const res = await regAPI(person.value)
            if (res.code == 0) {
                ElMessage.success('注册成功')
                Switch2();
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
            p.ZC_button = 'ZC_button1';
            p.is_ZC = false;
        }
        //模态框
        //完成验证
        async function finishYZ() {
            if (!p.email) {
                // alert('请输入邮箱')
                ElMessage.warning('请输入邮箱')
                return;
            }
            if (!p.Yvalue) {
                // alert('请输入验证码')
                ElMessage.warning('请输入验证码')
                return;
            }
            if (!p.password) {
                // alert('请输入密码')
                ElMessage.warning('请输入密码')
                return;
            }
            if (!p.password2) {
                // alert('请输入密码')
                ElMessage.warning('请输入密码')
                return;
            }
            let info = {
                mailbox: p.email,
                code: p.Yvalue,
                password: p.password
            }
            if (p.got_button) {
                return
            }
            p.got_button = true
            p.got_button_style = 'got_button_style2'
            const res = await forgetPasswordAPI(info)
            if (res.code == 0) {
                ElMessage.success('更改成功')
                m_close()
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
            p.got_button = false
            p.got_button_style = 'got_button_style1'
        }
        onMounted(() => {
            // setToken('name','zhangzhangzhang')
            // setToken('name2', 'zhangzhangzhang22222')
            // console.log(getToken('name'))
            // console.log(getToken('name2'))
            // 加载验证码
            PhotoYzm()
        })
        return {
            // open2,
            // 登录
            p,
            Pfanhui,
            Switch,
            Switch2,

            togglePassword,
            checkEmailFormat,
            Efocus,
            Iskong,
            Yfocus,
            Pgeshi,
            Pfocus,

            togglePassword2,
            Pgeshi2,
            Pfocus2,

            m_close,
            Modelshow,

            finishYZ,
            botton_log,
            PhotoYzm,
            ZC_GetYzm,
            botton_reg,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 14px;
}

.got_button_style2 {
    background-color: #999aaa !important;
}

.got_button_style1 {
    background-color: #40a9ff !important;
}

.ZC_button1 {
    cursor: pointer;
    color: #fff;
    background-color: #5e9eff !important;
}

.ZC_button2 {
    background-color: #999aaa !important;
}

.model_wai {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
}

.login {
    position: relative;
}

.Form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
}

.img2 img {
    width: 66px;
    height: 66px;
    position: absolute;
    top: -20px;
    left: 80px;
    padding: 0;
    margin: 0;
}


.eye-icon-m2 {
    font-size: 17px;
    /* color: #999; */
    right: 0px;
    top: 3px;
    position: absolute;
}

.eye-icon-m1 {
    font-size: 17px;
    /* color: #999; */
    right: 0px;
    top: 3px;
    position: absolute;
}

.m_button,
.m_button2 {
    height: 30px;
    width: 120px;
    /* background-color: #999aaa; */
    /* background-color: #40a9ff; */
    border: 0px solid #fff;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
}

.m_input,
.w_input {
    border: 1px solid #999aaa;
}

.m_St4 {
    height: 60px !important;
}

.m_St2 {
    height: 60px !important;
}

.m_St {
    display: flex;
    justify-content: center;
    /* align-items:center; */
    width: 350px;
    height: 50px;
}

.Mfirst {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.le span {
    line-height: 25px;
    font-size: 14px;
    margin: 0 10px;
}

.line {
    flex-grow: 1;
    height: 13px;
    border-bottom: 1px solid #f0f0f0;
}


.Mtop {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    height: 45px;
    margin-bottom: 20px;
}

i:hover {
    color: #666;
}

i {
    color: #999aaa;
    font-size: 16px;
    line-height: 45px;
    margin-right: 15px;
}

.m_p {
    color: #000;
    font-size: 14px;
    line-height: 45px;
    margin-left: 15px;
}

.model1 {
    height: 320px;

}

.model {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 160px;
    left: 50%;
    transform: translate(-50%);
    /* z-index: 999; */
    background-color: #fff;
    /* height: 290px; */
    width: 540px;
    border: 0.5px solid rgba(0, 0, 0, .2);
    box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
    border-radius: 4px;
}

.Yzm2 {
    width: 120px;
    height: 30px;
    /* width: 100px; */
}

.Getm {
    height: 30px;
    width: 99px;
    /* background-color: #999aaa; */
    background-color: #40a9ff;
    border: 0px solid #fff;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
}

.disable {
    height: 30px;
    width: 99px;
    background-color: #999aaa;
    /* background-color: #40a9ff; */
    border: 0px solid #fff;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
}

.eye-icon3 {
    cursor: pointer;
    /* font-size: 1.2em; */
    font-size: 17px;
    color: #999;
    right: 0px;
    top: 3px;
    position: absolute;
}

.eye-icon2 {
    cursor: pointer;
    /* font-size: 1.2em; */
    font-size: 17px;
    color: #999;
    right: 0px;
    top: 3px;
    position: absolute;
}

.con2_nei {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 435px;
    padding-bottom: 15px;
    width: 100%;
}

.con2 {
    width: 450px;
    margin-top: 100px;
    height: 460px;
    box-shadow: 2px 2px 2px whitesmoke;
    /* position: relative; */
}


.error {
    color: red;
    font-size: 13px;
    text-align: center;
}

.eye-icon {
    cursor: pointer;
    font-size: 17px;
    color: #999;
    position: absolute;
    right: 0px;
    top: 3px;
}

.eye-icon:hover {
    color: #666;
}

.Wm:hover {
    color: blue;
}

.Wm {
    color: #773037;
    font-size: 12px;
}

input {
    height: 30px;
    width: 350px;
    text-align: center;
    border-radius: 4px;
    border: 0px solid #fff;
}

.span2:hover {
    border: 1px solid #40a9ff;
    color: #40a9ff;
}

.span {
    height: 30px;
    width: 120px;
    text-align: center;
    line-height: 28px;
    border-radius: 4px;
    background-color: #fff;
    font-size: 12px;
    border: 0px solid #fff;
}

.Y_photo {
    height: 35px;
    width: 120px;
}

.Yzm {
    height: 30px;
    width: 120px;
}


.St {
    width: 350px;
}

.An {
    /* height: 40px !important;; */
    display: flex;
    justify-content: space-between;
}

.p {
    color: #fff;
    font-size: 25px;
    text-align: center;
    margin-top: 5px;

}

.img img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -50px;
    left: 50px;
    padding: 0;
    margin: 0;
}

.con_nei {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 335px;
    padding-bottom: 15px;
    width: 100%;
}

.con {
    width: 450px;
    margin-top: 100px;
    height: 350px;
    box-shadow: 2px 2px 2px whitesmoke;
}

input:focus {
    outline: none;
    /* 移除默认的轮廓线 */
    border: blue solid 1px;
    /* 改变边框颜色以指示聚焦状态 */
    box-shadow: 0 0 3px blue;
    /* 添加阴影以提供视觉焦点指示 */
}

/* 尺寸变化 */
@media screen and (max-width:400px) {
    input {
        width: 300px;
    }

    .St {
        width: 300px;
    }

    .con {
        max-width: 400px;
    }

    .con2 {
        max-width: 400px;
        margin-top: 50px;
    }

    .img img {
        left: 26px;
    }

    .img2 img {
        left: 50px;
    }

    .input_wai {
        width: 100%;
    }

    .w_input {
        max-width: 100%;
    }

    .m_St {
        width: 300px;
    }
}

@media screen and (max-width:540px) {
    .model {
        width: 100%;
        height: auto;
    }

    .line {
        height: 15px;
    }

    .m_St2 {
        height: 70px !important;
    }

    .m_St {
        max-width: 500px;
        height: 60px;
    }


}

@media screen and (min-width:1400px) {
    .con {
        width: 600px;
        height: 450px;
    }

    .con_nei {
        height: 420px;
    }

    .St,
    input {
        width: 500px;
    }

    input {
        height: 40px;
    }

    .Y_photo,
    .Yzm {
        height: 40px;
    }

    .span {
        height: 35px;
        font-size: 16px;
        line-height: 33px;
    }

    .Wm {
        font-size: 16px;
    }

    .p {
        font-size: 35px;
    }

    .img img {
        width: 130px;
        height: 130px;
        position: absolute;
        top: -65px;
        left: 70px;
    }

    .eye-icon,
    .eye-icon2,
    .eye-icon3,
    .eye-icon-m1,
    .eye-icon-m2 {
        position: absolute;
        right: 0px;
        top: 3px;
        font-size: 22px;
    }

    .error {
        font-size: 16px;
    }

    /* 2 */
    .con2 {
        width: 600px;
        height: 600px;
    }

    .con2_nei {
        width: 600px;
        height: 560px;
    }

    .Yzm2,
    .disable,
    .Getm {
        height: 35px;
    }

    .img2 img {
        width: 100px;
        height: 100px;
        top: -40px;
        left: 100px;
    }

    /*  */
    .model {
        width: 760px;
        height: 400px;
    }

    .m_button {
        height: 35px;
        font-size: 15px;
    }

    .m_button2 {
        height: 35px;
        font-size: 15px;
        margin-top: 15px;
    }

    .m_St2 {
        height: 80px !important;
    }

    .m_St {
        width: 500px;
        height: 60px;
        /* margin: 10px auto 0; */
    }

    .line {
        /* background-color:#666; */
        /* width: 440px; */
        height: 15px;

    }

    .Mtop {
        height: 50px;
    }

    i {
        font-size: 18px;
        line-height: 50px;
    }

    .m_p {
        font-size: 16px;
        line-height: 40px;
    }

}
</style>
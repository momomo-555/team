<template>
    <div class="login_con">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../../assets/imgs/logo.png">
            </div>
            <!-- 登录表单 -->
            <el-form ref="logigForm_ref" :rules="login_formRule" label-width="0px" :model="Form_msg" class="login_form">
                <!-- 用户名 -->
                <!-- <span class="iconfont icon-yonghu"></span> -->
                <el-form-item prop="username">
                    <el-input v-model="Form_msg.username" prefix-icon="User" style="height:35px;"
                        placeholder="请输入用户名" />
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="Form_msg.password" type="password" prefix-icon="Lock" style="height:35px;"
                        placeholder="请输入密码" />
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="yzm" style="height:40px;">
                    <div style="width:100%;height:40px;display:flex;justify-content: space-between;position:relative">
                        <el-input v-model="Form_msg.yzm" prefix-icon="Key" style="width:40%;height:40px;"
                            placeholder="请输入验证码" />
                        <div style="width:40%;height:inherit;">
                            <img @click="click_photo" style="width:100%;height:40px;cursor:pointer" :src="yzm_photo"
                                alt="验证码">
                        </div>
                    </div>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" style="width:100%;height:35px;" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapStatus,setToken } from '@/utils'
import { loginYzmAPI, loginAPI } from '@/api/user'
import router from '@/router'
import { ref, reactive, onMounted } from 'vue'

export default {
    name: 'Login',
    setup() {
        // 验证码id
        let yzm_id = ref('')
        // 验证码图篇
        let yzm_photo = ref('')
        // 给表单绑定ref
        let logigForm_ref = ref()
        // 数据表单信息
        let Form_msg = reactive({
            username: '',
            password: '',
            yzm: '',
        })
        // 定义表单规则
        let login_formRule = reactive({
            // 验证用户名
            username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            yzm: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        })
        function login() {
            sessionStorage.setItem('navState', 'Welcome')
            // 调用表单的预验证
            logigForm_ref.value.validate(async (val) => {
                if (!val) {
                    yzm_axios()
                    return
                } else {
                    // 发请求
                    let axios_message = {
                        mailbox: Form_msg.username,
                        password: Form_msg.password,
                        b64s: yzm_id.value,
                        code: Form_msg.yzm,
                    }
                    const res = await loginAPI(axios_message)
                    if (res.code == 0) {
                        ElMessage.success(res.message)
                        setToken('token',res.data.token)
                        router.push('/Home')
                    } else {
                        yzm_axios()
                        ElMessage.error(mapStatus.get(res.code))
                    }
                }
            })
        }
        // 点击验证码切换
        function click_photo() {
            yzm_axios()
        }
        async function yzm_axios() {
            const res = await loginYzmAPI()
            if (res.code == 0) {
                yzm_photo.value = res.data.b64s
                yzm_id.value = res.data.id
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            yzm_axios();
            // 为了防止直接切换到登录而导致导航栏状态存储有问题
            sessionStorage.setItem('navState', 'Welcome')
            // console.log('调用了')
        })
        return {
            logigForm_ref,
            Form_msg,
            login_formRule,
            login,
            yzm_photo,
            click_photo,
        }
    }
}
</script>

<style scoped>
.login_con {
    height: 100%;
    background-color: #2b4d6b;
    /* background-color: rgb(45, 58,75); */
}

.login_box {
    width: 450px;
    height: 310px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
}

.avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.btns {
    display: flex;
    /* justify-content: flex-end; */
    /* align-items: center; */
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
}
</style>
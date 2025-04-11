<template>
    <div class="wai">
        <div class="l">
            <!-- <router-link to="/"> -->
            <router-link to="/">
                <a href="" class="l_content flex" title="返回首页">
                    <img src="../../assets/logo.png" class="logo">
                    <p class="theme_name">仁爱工作室</p>
                </a>
            </router-link>
        </div>
        <div class="m_content flex" style="position:relative">
            <div style="position:relative">
                <input class="input " v-model="input_value" @keydown="inputPress">
            </div>
            <span class="souSuo iconfont icon-sousuo" @mousedown="beginCheck" style="cursor:pointer"></span>
        </div>
        <nav class="r_content flex">
            <li>
                <span>消息</span>
            </li>
            <li style="cursor:pointer">
                <!-- <router-link to="/B_Write">
                    <a>创作</a>
                </router-link> -->
                <a @click="writeClick">创作</a>
            </li>
            <li class="" v-show="fight">
                <router-link to="/Login">
                    <a>登录/注册</a>
                </router-link>
            </li>
            <li class="" v-show="fight2">
                <a class="a1" @mouseover="fight1 = true" @mouseout="fight1 = false" @click="fight1 = false">
                    <img class="img2" :src="img_src">
                    <div class="div_style_1" v-show="fight1">
                        <div class="cen_style" style="padding:6px 0" @click="enter_center">PersonCenter</div>
                        <div class="cen_style" style="padding:6px 0" @click="logOut">退出登录</div>
                    </div>
                </a>
            </li>
        </nav>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { userUuidAPI, logOutAPI } from '@/api/user'
import { useStore } from 'vuex'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, onMounted } from 'vue'
export default {
    name: 'blogHeader',
    setup() {
        let fight1 = ref(false)
        let img_src = ref('')
        const fight = ref(true)
        const fight2 = ref(false)
        const store = useStore()
        fight.value = !store.state.loginFight
        fight2.value = store.state.loginFight

        const input_value = ref('')
        function beginCheck() {
            if (input_value.value) {
                // 开始跳转
                const queryString = input_value.value
                const url = router.resolve({ name: 'Search', query: { queryString } }).href
                window.open(url, '_blank')

            } else {
                alert('请先输入内容')
            }
        }
        function writeClick() {
            //的判断登陆是否过期
            isLoging()
            if (fight2.value) {
                // 可以点击
                router.push('/Write')
            } else {
                alert('请先登录')
            }
            // router.push('/Write')
        }
        // 退出登录
        async function logOut() {
            const res = await logOutAPI()
            if (res.code == 0) {
                ElMessage.success('退出成功')
                router.push('/')
                // if (props.home_msg == '首页') {
                //     window.location.reload()
                //     // 刷新一下
                // }
            } else {
                ElMessage.error('退出失败')
            }
        }

        //获取头像
        async function get_photo() {
            const res = await userUuidAPI()
            // let uuid=''
            if (res.code == 0) {
                // uuid=res.data.uuid
                // if (res.data.uuid) {
                //     img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/:${res.data.uuid}`
                // }
                if (res.data.uuid) {
                    img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/${res.data.uuid}?time=${Date.now()}`
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        function enter_center() {
            router.push('/Center')
        }
        // 判断按下的是或否是回车键
        function inputPress(event) {
            if (event.key === 'Enter') {
                beginCheck();
            }
        }
        //判断是否登录
        async function isLoging() {
            const res = await userUuidAPI()
            // if (res.code == 0) {
            //     store.commit('loginFightToggle', true)
            //     fight.value = !store.state.loginFight
            //     fight2.value = store.state.loginFight
            //     //获取头像
            //     get_photo()
            // } else {
            //     ElMessage.error(mapStatus.get(res.code))
            // }
            if (res.code == 2002 || res.code == 2003) {
                store.commit('loginFightToggle', false)
                fight.value = !store.state.loginFight
                fight2.value = store.state.loginFight
                ElMessage('还没有登录呢')
            } else if (res.code == 0) {
                //获取头像
                get_photo()
                store.commit('loginFightToggle', true)
                fight.value = !store.state.loginFight
                fight2.value = store.state.loginFight

            } else {
                //获取头像
                get_photo()
                store.commit('loginFightToggle', true)
                fight.value = !store.state.loginFight
                fight2.value = store.state.loginFight
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            // 发请求看是否获取头像
            isLoging()
        })
        return {
            fight,
            fight2,
            input_value,
            beginCheck,
            writeClick,
            inputPress,
            img_src,
            fight1,
            logOut,
            enter_center,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    color: #e2e2e2;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

/* 个人中心 */
.cen_style {
    cursor: pointer;
    color: #656262 !important;
}

.cen_style:hover {
    color: #000 !important;
}

a:hover {
    color: #fff;
}

.a1 {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
}

.img2 {
    height: 55px;
    width: 55px;
    position: absolute;
    top: -27px;
    left: -35px;
    border-radius: 50%;
}

.div_style_1 {
    position: absolute;
    top: 42px;
    left: -59px;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    padding: 8px 1px;
    line-height: 20px;
    color: #333;
    background-color: #fff;
    border-radius: 3px;
    font-size: 17px !important;
    text-align: center;
    cursor: default;
}

.div_style_1::before {
    content: '';
    width: 0;
    height: 0;
    /* font-size:13px !important; */
    position: absolute;
    top: -16px;
    left: 43%;
    border: 8px solid #000;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
}

/*  */
.flex {
    display: flex;
}

.wai {
    height: 70px;
    min-width: 1200px;
    background: #000;
    border-bottom: 1px rgb(119, 117, 117) solid;
    border-radius: 0 0 5px 5px;
    /* box-shadow: 0 0 4px 2px rgb(119, 117, 117); */
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
}

.logo {
    height: 55px;
    width: 55px;
    margin-left: 10px;
}

.theme_name {
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    /* margin-left: 10px; */
}

.l_content {
    /* display: block; */
    height: 70px;
    align-items: center;
    gap: 10px;
}

.m_content {
    align-items: center;
    gap: 10px;
}

.r_content {
    align-items: center;
    gap: 10px;
}

.r_content li {
    width: 100px;
    text-align: center;
    font-size: 18px;
}

.input {
    width: 350px;
    height: 30px;
    outline: none;
    color: #1d1d1d;
    border-radius: 20px;
    padding-left: 15px;
    padding-right: 35px;
    /* text-align: center; */
    /* border: blue solid 1px; */

}

.input:focus {
    width: 450px;
    border: blue solid 1px;
}

.souSuo {
    color: #000;
    /* right: -30px; */
    right: 10px;
    font-size: 22px;
    position: absolute;
}
</style>
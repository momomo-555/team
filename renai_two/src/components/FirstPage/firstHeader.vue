<template>
    <main class="header" :class="header_bc_style">
        <div class="li_one" :style="{ display: isOver600px || isBox1Visible ? 'block' : 'none' }">
            <router-link to=" /" class="h_con">
                <img class="img" src="@/assets/logo.png" alt="logo">
                <p title="Renai Studio">仁爱工作室</p>
            </router-link>
            <div class="icon_2"><span @click="toggleDivs" class="iconfont icon-gengduo"></span></div>
        </div>

        <ul class="one_ul" :style="{ display: isOver600px ? 'flex' : (isBox2Visible ? 'block' : 'none') }">
            <li class="kong"></li>
            <li class="kong"></li>
            <li class="icon_li"><span @click="toggleDivs" class="iconfont icon-chahao"></span></li>
            <li class="hide first_li">
                <FHeadernav name="社团招新" Ename="Recruitment" page="/Recruitment"></FHeadernav>
            </li>
            <li class="hide tow_li">
                <FHeadernav name="社团信息" Ename="Information" page="/Information"></FHeadernav>
            </li>
            <li class="hide tow_li">
                <FHeadernav name="博客专区" Ename="Blog_special" page="/Blog"></FHeadernav>
            </li>
            <li class="hide tow_li">
                <a v-if="login"><router-link :to="msg_ref">
                        {{ msg }}
                    </router-link></a>
                <a class="a1" v-else @mouseover="fight = true" @mouseout="fight = false" @click="fight = false">
                    <!-- <div>个人中心</div> -->
                    <img class="img2" :src="img_src">
                    <div class="div_style_1" v-show="fight">
                        <div class="cen_style" style="padding:6px 0" @click="enter_center">PersonCenter</div>
                        <div class="cen_style" style="padding:6px 0" @click="logOut">退出登录</div>
                    </div>
                </a>
            </li>
        </ul>
    </main>
</template>

<script>
import { logOutAPI, userUuidAPI } from '@/api/user'
import { getToken, mapStatus } from '@/utils'
import { useStore, mapGetters, mapState } from 'vuex'
import router from '@/router'
import FHeadernav from './FHeadernav'
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, onMounted, onUnmounted, onUpdated, watch, computed } from 'vue'
export default {
    name: 'firstHeader',
    components: { FHeadernav },
    props: ['msg', 'msg_ref', 'user', 'home_msg'],
    setup(props) {
        const store = useStore()
        const isOver600px = ref(window.innerWidth >= 600);
        const isBox1Visible = ref(true);
        const isBox2Visible = ref(false);
        let login = ref(true)
        let img_src = ref('')
        let fight = ref(false)
        let header_bc_style = ref('header_style')
        function toggleDivs() {
            isBox1Visible.value = !isBox1Visible.value;
            isBox2Visible.value = !isBox2Visible.value;
        }
        const updateWindowSize = () => {
            isOver600px.value = window.innerWidth >= 600;
        };
        //进入个人中心
        function enter_center() {
            router.push('/Center')
        }

        async function get_photo() {
            // console.log(props.msg)
            if (props.msg != '登录/注册') {
                // 
                login.value = false;
                const res = await userUuidAPI()
                // let uuid=''
                if (res.code == 0) {
                    // uuid=res.data.uuid
                    if (res.data.uuid) {
                        img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/${res.data.uuid}?time=${Date.now()}`
                    }
                    // 方便下次修改头像使用
                    store.commit('isEditPhoto', false)
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            }
        }
        async function logOut() {
            const res = await logOutAPI()
            if (res.code == 0) {
                ElMessage.success('退出成功')
                store.commit('loginFight', false)
                router.push('/')
                if (props.home_msg == '首页') {
                    window.location.reload()
                    // 刷新一下
                }

            } else {
                ElMessage.error('退出失败')
            }
        }
        const editPhoto = computed(() => store.state.editPhoto)
        watch(editPhoto, (newval, oldval) => {
            if (newval) {
                //修改了头像
                get_photo()
            }
            console.log(newval, '...')
        })
        onMounted(() => {
            window.addEventListener('resize', updateWindowSize);
            updateWindowSize();

            get_photo()

            if (props.user == 'Recruit') {
                header_bc_style.value = 'header_style2'
            } else if (props.user == 'Information') {
                header_bc_style.value = 'header_style3'
            } else if (props.user == 'Center') {
                header_bc_style.value = 'header_style4'
                //显示个人中心
                login.value = false
                // 
            }
        })
        // onUpdated(()=>{
        //     console.log('调用了')
        //     login.value=store.state.loginFight
        // })
        onUnmounted(() => {
            window.removeEventListener('resize', updateWindowSize);
        })
        return {
            isOver600px,
            isBox1Visible,
            isBox2Visible,
            toggleDivs,
            header_bc_style,
            login,
            img_src,
            fight,
            enter_center,
            logOut,
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 微软雅黑;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.header_style4 {
    background-color: #2b2a2a !important;
}

.header_style3 {
    background-color: #1b1919 !important;
}

.header_style2 {
    background-color: #1f1f1f !important;
}

.header_style {
    background-color: #313131 !important;
}

.header {
    width: 100%;
    height: 70px;
    background-color: #313131;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #a3a1a1;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    display: flex;
    /* line-height: 70px; */
}

.li_one {
    width: 250px;
}

.one_ul {
    flex-grow: 1;
    list-style: none;
    display: flex;
    /* width: calc(100% - 250px); */
}

.img {
    float: left;
    height: 55px;
    width: 55px;
    margin-top: 8px;
    margin-left: 10px;
}

p {
    float: left;
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    line-height: 66px;
    margin-left: 20px;
}

.li_one {
    width: 250px;
}

.one_ul {
    /* justify-content:center; */
    flex-grow: 1;
    list-style: none;
    display: flex;
    width: calc(100% - 250px);
}

.icon_2 {
    display: none;
}

.icon_li {
    display: none;
}

/*个人中心  */
.cen_style {
    cursor: pointer;
    color: #656262 !important;
}

.cen_style:hover {
    color: #000 !important;
}

/* 登录注册/个人中心 */
a:hover {
    color: #fff;
}

.a1 {
    width: 100%;
    height: 100%;
}

a {
    color: #cdcdcd;
    text-decoration: none;
    /* line-height:40px; */
    position: relative;
}

.img2 {
    height: 55px;
    width: 55px;
    position: absolute;
    top: -13px;
    left: -25px;
    border-radius: 50%;
}

.div_style_1 {
    position: absolute;
    top: 52px;
    left: -52px;
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

@media screen and (max-width:800px) {
    a {
        font-size: 15px;
    }
}

@media screen and (max-width:600px) {
    .one_ul {
        width: 100% !important;
        flex-grow: 1;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.85);
        display: none;
    }

    .h_con {
        display: fixed;
        width: 100%;
        top: 0;
        left: 0;
    }

    .li_one {
        width: 100%;
        flex-grow: 1;
        display: block;
    }


    .icon_2 {
        display: block;
        float: right;
        margin-top: 24px;
        margin-right: 10px;
        color: #fff;
    }

    .icon-gengduo1 {
        display: block;
    }

    .icon_li {
        display: block;
        position: absolute;
        top: 0px;
        right: 0px;
        width: 50px !important;
    }

    .icon-chahao {
        font-size: 23px;
        color: #fff;
    }

    .kong {
        display: none;
    }

    .first_li {
        margin-top: 70px !important;
        flex: none;
        height: 50px;
        border-bottom: 1px solid #999aaa;
        border-top: 1px solid #999aaa;
        width: 100% !important;
        line-height: 45px;
    }

    .one_ul .tow_li {
        flex: none;
        height: 60px;
        border-bottom: 1px solid #999aaa;
        border-top: 1px solid #999aaa;
        width: 100%;
        line-height: 60px;
        margin: 0px !important;
    }

    .img2 {
        top: 2px;
        left: -29px;
    }

    .div_style_1 {
        top: 67px;
        left: -59px;
    }

}

@media screen and (max-width:800px) {
    .one_ul .kong {
        display: none;
    }

    p {
        font-size: 20px;
        line-height: 70px;
        margin-left: 10px;
    }

    .one_ul {
        flex-grow: 1;
        width: calc(100%-200px);
    }

    .li_one {
        overflow: hidden;
        margin-top: 0px;
        width: 200px;
    }
}

@media screen and (max-width:1330px) {
    .li_one {
        width: 250px;
        overflow: hidden;
        margin-top: 0px;
        /* flex: 0 0 250px; */
    }

    .one_ul {
        flex-grow: 1;
        width: calc(100%-250px);
    }

    .one_ul li {
        color: #cdcdcd;
        width: 140px;
        text-align: center;
        margin-top: 22px;
        font-size: 18px;
        flex: 1;
    }
}

@media screen and (min-width:1330px) {

    .li_one {
        width: 600px;
        overflow: hidden;
        margin-top: 0px;
    }

    .one_ul {
        flex-grow: 1;
        width: calc(100% - 600px);
    }

    .one_ul li {
        color: #cdcdcd;
        text-align: center;
        margin-top: 22px;
        font-size: 18px;
        flex: 1;
    }
}
</style>
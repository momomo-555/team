<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-28 08:47:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-06 21:16:32
 * @FilePath: \renai_two\src\components\Blog\writeHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

-->
<template>
    <div class="wai">
        <div class="l flex" style="position:relative">
            <router-link :to="address">
                <span class="iconfont icon-zuojiantou" :class="class_fonts2" style="font-size:20px; "></span>
                <span class="iconfont " :class="class_fonts"></span>
            </router-link>
        </div>
        <div class="r">
            <ul class="flex">
                <li><a href="">消息</a></li>
                <li>
                    <a class="a1" @mouseover="fight1 = true" @mouseout="fight1 = false" @click="fight1 = false">
                        <img class="img2" :src="img_src">
                        <div class="div_style_1" v-show="fight1">
                            <div class="cen_style" style="padding:6px 0" @click="enter_center">PersonCenter</div>
                            <div class="cen_style" style="padding:6px 0" @click="logOut">退出登录</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { userUuidAPI, logOutAPI } from '@/api/user'
import '@/assets/fonts/souSuo/iconfont.css'
import router from '@/router'
import { ref, onMounted } from 'vue'
export default {
    name:'writeHeader',
    props: ['address', 'class_fonts', 'class_fonts2'],
    setup(){
        let fight1 = ref(false)
        let img_src = ref('')
        //获取头像
        async function get_photo() {
            const res = await userUuidAPI()
            // let uuid=''
            if (res.code == 0) {
                if (res.data.uuid) {
                    img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/${res.data.uuid}?time=${Date.now()}`
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 进入个人中心
        function enter_center() {
            router.push('/Center')
        }
        //退出登录
        async function logOut(){
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
        onMounted(() => {
            get_photo()
        })
        return{
            img_src,
            fight1,
            enter_center,
            logOut,
        }
    }
}
</script >

<style scoped>
*{
    padding: 0;
    margin: 0;
    color: #e2e2e2;
}
.wai {
    height: 70px;
    min-width: 1200px;
    /* background: #000; */
    background: rgb(21, 20, 20);
    border-bottom: 1px rgb(119, 117, 117) solid;
    /* border-bottom: 8px #3b3b3b solid; */
    border-radius: 0 0 5px 5px;
    /* box-shadow: 0 0 1px 1px rgb(119, 117, 117); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2000;
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
    top: 7px;
    left: 0px;
    border-radius: 50%;
}

.div_style_1 {
    position: absolute;
    top: 72px;
    left: -25px;
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

/* .r li {
    width:100px;
    font-size:18px;
} */
.r li a {
    display: block;
    height: 70px;
    width: 100px;
    font-size: 18px;
    line-height: 70px;
}

.l {
    cursor: pointer;
}

.icon-zuojiantou1 {
    position: absolute;
    top: 25px;
    left: 15px;

}

.icon-zuojiantou2 {
    position: absolute;
    top: 8px;
    left: 15px;
}

.icon-boke {
    font-size: 60px;
    color: cornflowerblue;
    margin-left: 35px;
}

.icon-chuangzuo1 {
    font-size: 35px;
    margin-left: 35px;
    color: #FA8072;
    /* color:#F08080; */
    /* color:coral; */
}
</style>
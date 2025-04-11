<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-17 18:49:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 13:52:17
 * @FilePath: \renai_two\src\views\FirstPage\FirstPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <!-- 头 -->
    <header class="con1">
        <!-- <firstHeader :msg="msg" :msg_ref="msg_ref" home_msg="首页">
        </firstHeader> -->
        <div v-if="fg2">
            <firstHeader msg="登录/注册" msg_ref="/Login" home_msg="首页"></firstHeader>
        </div>
        <div v-else>
            <firstHeader msg="个人中心" msg_ref="/Center" home_msg="首页"></firstHeader>
        </div>
    </header>
    <!-- 内容一 -->
    <main>
        <section class="con con2">
            <FirstClock></FirstClock>
        </section>
        <section class="con3 con" style=" background-color: #272727;padding-top:20px;">
            <!-- <h3>关于我们</h3> -->
            <div class="F_con_box">
                <p class="con_box_title"><span>关于我们</span></p>
                <div class="con_box_1">
                    <div>{{ aboutMsg }}</div>
                </div>
            </div>
        </section>
        <section class="con3 con" style=" background-color: #1b1b1b;padding-top:20px;">
            <!-- <h3>学习方式</h3> -->
            <div class="F_con_box">
                <p class="con_box_title"><span>学习方式</span></p>
                <div class="con_box_2">
                    <div v-for="(item, index) in learnWay_arr" :key="index">
                        <div class="con_box_2_nei">
                            <div style="width:100%;">
                                <img v-show="item.id" style="width:100%;height:200px;"
                                    :src="`http://106.14.30.173:8081/api/reception/get/picture/${item.id}`">
                            </div>
                            <div class="con_text">
                                <h2 style="text-align: center;margin-bottom:10px;">{{ item.name }}</h2>
                                <p>{{ item.value }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="con3 con" style=" background-color: #272727;padding-top:20px;">
            <!-- <h3>社团位置</h3> -->
            <div class="F_con_box">
                <p class="con_box_title"><span>社团位置</span></p>
                <div class="con_box_3">
                    <div style="color: #c7c4c4;font-size:20px;margin:20px 0;">
                        <div>{{ comAddress.value }}</div>
                    </div>
                    <div>
                        <img v-show="comAddress.id"
                            :src="`http://106.14.30.173:8081/api/reception/get/picture/${comAddress.id}`">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { useStore } from 'vuex'
import { mapStatus } from '@/utils'
import { userUuidAPI } from '@/api/user'
import { aboutAPI, learnStyleAPI, comAdressAPI } from '@/api/pageMessage'
import { ref, onMounted, reactive, computed, watch } from 'vue'
import FirstClock from '@/components/FirstPage/FirstClock.vue'
import firstHeader from '../../components/FirstPage/firstHeader.vue'
export default {
    name: 'FirstPage',
    components: { firstHeader, FirstClock },
    setup() {
        let fg2 = ref(true)
        const store = useStore()
        fg2.value = !store.state.loginFight

        // 存放关于我们的信息
        let aboutMsg = ref('')
        // 存放学习方式
        let learnWay_arr = reactive([])
        // 存放社团地址
        let comAddress = ref('')

        async function axios_message_1() {
            const res = await aboutAPI()
            if (res.code == 0) {
                if (res.data) {
                    aboutMsg.value = res.data.value
                } else {
                    ElMessage('关于我们没有数据')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        async function axios_message_2() {
            const res = await learnStyleAPI()
            if (res.code == 0) {
                if (res.data) {
                    res.data.forEach(item => {
                        learnWay_arr.push(item)
                    })
                } else {
                    ElMessage('学习方式没有数据')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        async function axios_message_3() {
            const res = await comAdressAPI()
            if (res.code == 0) {
                if (res.data) {
                    comAddress.value = res.data
                } else {
                    ElMessage('社团位置没有数据')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //判断是否登录
        async function isLoging() {
            const res = await userUuidAPI()
            if (res.code == 2002 || res.code == 2003) {
                store.commit('loginFightToggle', false)
                fg2.value = !store.state.loginFight
                ElMessage('还没有登录呢')
            } else if (res.code == 0) {
                store.commit('loginFightToggle', true)
                fg2.value = !store.state.loginFight
            } else {
                store.commit('loginFightToggle', true)
                fg2.value = !store.state.loginFight
                ElMessage.error(mapStatus.get(res.code))
            }
        }

        onMounted(() => {
            isLoging()
            //加载数据
            axios_message_1()
            axios_message_2()
            axios_message_3()
            //如果是登陆成功状态
            // store.commit('loginFightToggle', true)
            // fg2.value = !store.state.loginFight
            // 成功就调用getphoto()在tou里面

        })
        return {
            fg2,
            aboutMsg,
            learnWay_arr,
            comAddress,
        }
    }
}
</script>

<style scoped>
.con {
    width: 100%;
}

.con2 {
    height: 500px;
}

.con1 {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
}

.F_con_box {
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    /* background-color: bisque; */
}

.con_box_title {
    padding-top: 40px;
    font-size: 50px;
    text-align: center;
}

.con_box_title span {
    padding-bottom: 20px;
    color: #c7c4c4;
    border-bottom: 3px solid darksalmon;
}

/* 主要内容 */
/* 第一个 */
.con_box_1 {
    /* 设置行高为字体大小的1.5倍 */
    line-height: 1.8;
    text-indent: 2em;
    margin-top: 50px;
    padding: 20px 20px 80px 20px;
    font-size: 22px;
    color: #c7c4c4;
    word-wrap: break-word;
    /* letter-spacing: 2px; */
}

/* 第二个 */
.con_box_2 {
    margin-top: 50px;
    padding: 20px 20px 80px 20px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(12, 1fr)
}

.con_box_2 div {
    grid-area: auto/auto/auto/span 3;
    /* background-color: bisque; */
    /* height:300px; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.con_box_2_nei {
    margin: 20px 20px 0 20px;
    /* width:80%; */
    /* height:200px; */
    flex: 1;
    display: flex;
    flex-direction: column;
    /* 与顶部对齐，与父级有关 */
    align-self: start;
}

.con_box_2_nei .con_text {
    margin-top: 10px;
    width: 100%;
    color: #c7c4c4;
    display: flex;
    flex-direction: column;
}

.con_text h2 {
    color: rgb(182, 92, 113);
}

/* 第三个 */
.con_box_3 {
    margin-top: 50px;
    padding: 20px 20px 70px 20px;
    text-align: center;
}
.con_box_3 img{
    height:500px;
    /* max-width:100%; */
}

@media (max-width:1000px) {
    .con_box_2 div {
        grid-area: auto/auto/auto/span 6;
    }
}

@media(max-width:600px) {
    .con_box_2 div {
        grid-area: auto/auto/auto/span 12;
    }
}
</style>
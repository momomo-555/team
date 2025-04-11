<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 15:07:54
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-03 21:21:54
 * @FilePath: \renai_two\src\views\Blog\Write.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="main_box">
        <div class="w_header">
            <writeHeader address="/Blog" class_fonts="icon-boke" class_fonts2="icon-zuojiantou1"></writeHeader>
        </div>
        <div class="box">
            <div class="l" style="position:relative;">
                <ul>
                    <!-- <router-link to="/B_Publish">
                        <li class="publish"><a href="">发布</a></li>
                    </router-link> -->
                    <li class="publish" @click="publishArticleButton"><a href="#">发布</a></li>
                    <!-- <li class="publish" @click="openNewTab"><a href="">发布</a></li> -->
                    <!-- <li><a href="">首页</a></li> -->
                    <router-link to="/Write">
                        <li><a href="" @click="home" :class="pitch1">首页</a></li>
                    </router-link>
                    <!-- router.push('/B_Write/Article/check') -->
                    <router-link to="/Write/Article/Check">
                        <li><a href="" @click="Article" :class="pitch2">文章</a></li>
                    </router-link>
                    <router-link to="/Write/Draft">
                        <li><a href="" @click="Draft" :class="pitch3">草稿</a></li>
                    </router-link>
                    <router-link to="/Write/Delete">
                        <div class="recycle" @click="Delete" :class="recycleBg"><span class="iconfont icon-huishouzhan"
                                :class="huishouzhan_style2"></span></div>
                    </router-link>
                </ul>
                <!-- <router-link to="/B_Write/Delete">
                    <div class="recycle" @click="Delete"><span class="iconfont icon-huishouzhan"></span></div>
                </router-link> -->
            </div>
            <div class="r">
                <div class="R_box1 r_box" v-if="fight1">
                    <h2>欢迎来到创作中心 </h2>
                    <p>文章数</p>
                    <p>草稿数</p>
                    <p>收藏量</p>
                </div>
                <div class="R_box2 r_box" v-if="fight2">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapStatus} from '@/utils'
import { userUuidAPI } from '@/api/user'
import { articleAPI } from '@/api/blog'
import { ref, onMounted, onUnmounted } from 'vue'
import '@/assets/fonts/souSuo/iconfont.css'
import router from '@/router'
import writeHeader from '@/components/Blog/writeHeader.vue'
export default {
    name: 'Write',
    components: { writeHeader },
    setup() {
        let huishouzhan_style2 = ref('')
        let recycleBg = ref('')
        let fight1 = ref(true);
        let fight2 = ref(false);
        let pitch1 = ref('Pitch');
        let pitch2 = ref('');
        let pitch3 = ref('');
        let Pitch = ref('Pitch');
        function home() {
            fight1.value = true;
            fight2.value = false;
            pitch1.value = Pitch.value;
            pitch2.value = '';
            pitch3.value = '';
            recycleBg.value = ''
            huishouzhan_style2.value = ''
        }
        function Article() {
            fight1.value = false;
            fight2.value = true;
            pitch1.value = '';
            pitch2.value = Pitch.value;
            pitch3.value = '';
            recycleBg.value = ''
            huishouzhan_style2.value = ''
        }
        function Draft() {
            fight1.value = false;
            fight2.value = true;
            pitch1.value = '';
            pitch2.value = '';
            pitch3.value = Pitch.value;
            recycleBg.value = ''
            huishouzhan_style2.value = ''
        }
        function Delete() {
            fight1.value = false;
            fight2.value = true;
            pitch1.value = '';
            pitch2.value = '';
            pitch3.value = '';
            recycleBg.value = 'recycleBg'
            huishouzhan_style2.value = 'huishouzhan_style2'
        }
        async function publishArticleButton() {
            // console.log('...', 'jinali')
            // let queryString = '#'
            // router.push({ name: 'Publish', query: { queryString } })
            // 获取用户uuid
            const res = await userUuidAPI()
            if (res.code == 0) {
                let data = {
                    article_uuid: '',
                    user_uuid: res.data.uuid,
                    title: '',
                    content: '',
                    label: '',
                    cover: '',
                    abstract: '',
                    reading_volume: 0,
                    visibility: '',
                    article_type: '',
                    process: '',
                    creat_time: '',
                }
                const res2 = await articleAPI(data)
                if (res2.code == 0) {
                    let queryString = res2.data
                    router.push({ name: 'Publish', query: { queryString } })
                } else {
                    ElMessage.error('无法进入发布文章页面')
                }
            } else {
                ElMessage.error('无法进入发布文章页面')
            }
        }
        onMounted(() => {
            //
            router.push('/Write')
        })
        return {
            fight1,
            fight2,
            pitch1,
            pitch2,
            pitch3,
            Pitch,
            home,
            Article,
            Draft,
            Delete,
            publishArticleButton,
            recycleBg,
            huishouzhan_style2,
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

.main_box {
    min-width: 1260px;
    /* background-color: #2e2e2e; */
    background-color: #3b3b3b;
    min-height: 100vh;
    transition: min-height 0.3s ease;
    display: flex;
    flex-direction: column;
    /* overflow-y: auto; */
}

.w_header {
    position: sticky;
    top: 0;
    z-index: 22;
}

.box {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex: 1;
    /* min-height: 100vh;
    transition: min-height 0.3s ease; */
    /* height: 1200px; */
}

.l {
    background: #1d1b1b;
    width: 200px;
}

.r {
    /* background: #2b2929; */
    background: #242323;
    flex-grow: 1;
}

.l ul {
    /* position: fixed; */
    position: sticky;
    top: 70.8px;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 200px;
}

.recycleBg {
    background-color: #CD5C5C !important;
}

.recycle:hover {
    background-color: #e2e2e2 !important;
}

.l .recycle {
    /* position: sticky;
    top: 360px;
    z-index: 1; */
    width: 200px;
    height: 70px;
    line-height: 70px;
    text-align: center;
}

.Pitch {
    color: #000;
    background: #CD5C5C;
}

.l ul :not(:first-child) a {
    display: block;
    height: 50px;
    text-align: center;
    line-height: 50px;
    padding: 10px 0;
    font-size: 18px;
}

.l ul :not(:first-child) a:hover {
    color: #000;
    background: #e2e2e2;
}

.l .publish {
    border: #e2e2e2 1px solid;
    border-radius: 20px;
    background: #e2e2e2;
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 110px;
    margin: 20px auto;
}

.l .publish a {
    color: #000;
}

.r_box {
    width: 100%;
    overflow: auto;
    /* min-height: 100vh;
    overflow:auto; */
    width: 1000px;
}

/* .R_box1 {
    width: 1000px;
} */

.icon-huishouzhan {
    font-size: 25px;
    color: cadetblue;
}

.huishouzhan_style2 {
    color: #0fddd6 !important;
}
</style>
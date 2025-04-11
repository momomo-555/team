<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-02 16:41:49
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-06 21:11:42
 * @FilePath: \renai_two\src\views\Blog\Essay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="main_box">
        <header class="w_header">
            <SpecialHeader></SpecialHeader>
        </header>
        <main class="con_box">
            <aside class="l">
                <div class="l_main">
                    <div class="box_1">
                        <div class="box_title">
                            <img
                                :src="`http://106.14.30.173:8081/api/user/unlisted/get/user/picture/${au.uuid}?time=${Date.now()}`">
                            <h4>{{ au.username }}</h4>
                        </div>
                        <div class="direction">
                            <h4>年级：</h4>
                            {{ au.grade }}
                        </div>
                        <div class="direction">
                            <h4>邮箱：</h4>
                            {{ au.mailbox }}
                        </div>
                        <div class="direction">
                            <h4>方向：</h4>
                            {{ au.direction }}
                        </div>
                        <div class="direction">
                            <h4>座右铭：</h4>
                            {{ au.motto }}
                        </div>
                    </div>
                    <!-- <div class="box_2">作者其他文章</div> -->
                </div>
            </aside>
            <div class="r">
                <article class="con" v-if="arr">
                    <h2>{{ arr.title }}</h2>
                    <div class="con_header">
                        <div class="label">
                            <h4>标签：</h4>
                            <li v-for="(item, index) in label_arr" :key="index">{{ item }}</li>
                        </div>
                        <div class="etwai">
                            <div class="eye"><span class="iconfont icon-yueduliang"></span>&nbsp;{{ arr.reading_volume
                                }}
                            </div>
                            <div class="type">
                                <h4>类型：</h4>
                                {{ arr.article_type }}
                            </div>
                        </div>
                    </div>
                    <div class="content" v-html="article"></div>
                </article>
                <div class="bottom">
                    <EssayBottom :isCollect="isCollect"></EssayBottom>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// import { userUuidAPI } from '@/api/user'
import { mapStatus } from '@/utils'
import { ref, reactive, onMounted, toRefs } from 'vue'
import { EssayContentAPI, getAuthorMessageAPI } from '@/api/blog'
import { useRoute } from 'vue-router'
import EssayBottom from "@/components/Blog/EssayBottom.vue"
import SpecialHeader from '@/components/Blog/SpecialHeader.vue'
export default {
    name: 'Essay',
    components: { SpecialHeader, EssayBottom },
    setup() {
        let label_arr = reactive([])
        let arr = ref()
        // 是否收藏
        let isCollect = ref(1)
        const route = useRoute()
        //显示作者信息
        let au = reactive({
            username: '',
            grade: '',
            motto: '',
            direction: '',
            uuid: '',
            mailbox: ''
        })
        //文章内容
        let article = ref('')
        let uuid = ref('')
        async function essayContent() {
            // isCollect.value = 1
            const res = await EssayContentAPI(route.query.queryString)
            if (res.code == 0) {
                // console.log(res.data,'..')
                if (res.data) {
                    arr.value = res.data
                    uuid.value = res.data.user_uuid
                    //获取页面作者信息
                    getAuthorMessage()
                    article.value = res.data.content
                    let arrbel = res.data.label.split(',')
                    for (let i = 0; i < arrbel.length - 1; i++) {
                        label_arr.push(arrbel[i])
                    }
                    isCollect.value = res.data.is_collect
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }

        async function getAuthorMessage() {
            const res = await getAuthorMessageAPI(uuid.value)
            if (res.code == 0) {
                // console.log(res.data,'...')
                if (res.data) {
                    au.direction = res.data.direction
                    au.username = res.data.username
                    au.grade = res.data.grade
                    au.motto = res.data.motto
                    au.uuid = res.data.uuid
                    au.mailbox = res.data.mailbox
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            essayContent()
            //页面作者信息
            // getAuthorMessage()
            // console.log('')
        })
        return {
            isCollect,
            arr,
            label_arr,
            au,
            article,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    background-color: #2e2e2e;
}

html,
body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* 防止滚动条出现 */
}

.w_header {
    position: sticky;
    top: 0;
    z-index: 22;
}

a {
    text-decoration: none;
    /* color:#CD5C5C; */
}

li {
    list-style: none;
}

.main_box {
    min-width: 1260px;
    min-height: 100vh;
    transition: min-height 0.3s ease;
    display: flex;
    flex-direction: column;
}

.con_box {
    background-color: rgb(30, 29, 29);
    /* max-width: 1050px; */
    flex: 1;
    margin: 0 auto;
    display: flex;
}

.con_box .l {
    width: 200px;
    background-color: rgb(21, 21, 21);
    /* position: relative; */

}

.con_box .l .l_main {
    position: sticky;
    top: 70.8px;
    left: 0;
    z-index: 1;
    width: 200px;
    background-color: rgb(21, 21, 21);
}

.l_main .box_1 {
    background-color: rgb(21, 21, 21);
    /* height: 200px; */
}

.box_1 .box_title {
    background-color: inherit;
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.box_title img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: inherit;
    margin: 0 15px;
}

.box_title h4 {
    margin: 10px 10 10px 0;
    background-color: inherit;
    color: rgb(241, 233, 233);
    /* 换行 */
    overflow-wrap: anywhere;
}

.direction {
    background-color: inherit;
    overflow-wrap: anywhere;
    color: rgb(170, 162, 162);
    margin-bottom: 10px;
    margin: 5px 10px;
}

.direction h4 {
    display: inline;
    width: 60px;
    color: cadetblue;
    background-color: inherit;
}

.l_main .box_2 {
    background-color: rgb(21, 21, 21);
}

.con_box .r {
    /* margin-left:200px; */
    width: 850px;
    /* min-height:800px; */
    background-color: rgb(72, 76, 76);
    position: relative;
    /* min-height: 100vh;
    transition: min-height 0.3s ease; */
    display: flex;
    flex-direction: column;
    /* margin-bottom: 20px; */
}

.r .con {
    flex: 1;
    background-color: rgb(72, 76, 76);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.con h2 {
    margin: 10px;
    background-color: inherit;
    color: #0f0f0f;
    letter-spacing: 1.5px;
    font-family: '微软雅黑';
}

.con .content {
    background-color: inherit;
    color: #000;
}

.con .con_header {
    display: flex;
    justify-content: space-between;
    background-color: inherit;
    width: 100%;
    align-items: center;
    margin: 5px 0 20px;
}

.con_header .label {
    display: flex;
    margin: 0 20px;
    background-color: inherit;
    /* justify-content: center; */
}

.con_header .label li {
    margin-right: 5px;
    background-color: inherit;
    color: rgb(108, 194, 194);
    border: 2px solid rgba(157, 227, 220, 0.3);
    border-radius: 5px;
    padding: 3px 5px;
}

.con_header .label h4 {
    background-color: inherit;
    line-height: 30px;
    color: #131313;
}

.con_header .etwai {
    background-color: inherit;
    display: flex;
}

.etwai .eye {
    position: relative;
    background-color: inherit;
    margin-right: 20px;
    color: rgba(247, 245, 108, 0.8);
}

.etwai .type {
    background-color: inherit;
    display: flex;
    margin-right: 20px;
    color: rgba(216, 138, 138, 0.8);
}

.type h4 {
    background-color: inherit;
    color: #131313;
}

.etwai .icon-yueduliang {
    color: #afaeab;
    background-color: inherit;
    font-size: 21px;
    font-weight: 600;
    position: absolute;
    top: -2px;
    left: -24px;
}

/* .con_header .cover {
    background-color: inherit;
    display: flex;
    align-items:center;
}

.cover h4 {
    background-color: inherit;
    color: #131313;
}

.cover img {
    height: 100px;
    background-color: inherit;
    margin-right:20px;
} */

.r .bottom {
    width: 850px;
    height: 60px;
    /* position: fixed;
    bottom: 0; */
    background-color: rgba(0, 0, 0, 0);
    /* display: flex; */
    /* justify-content: space-between; */
    line-height: 60px;

    position: fixed;
    bottom: 0;
}
</style>
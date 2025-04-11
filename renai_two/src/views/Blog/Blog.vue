<template>
    <div class="main_box">
        <header class="w_header">
            <blogHeader></blogHeader>
        </header>
        <main class="box" ref="box">
            <nav class="box_top">
                <li @click="click_special('前端')"><a href="">前端</a></li>
                <li @click="click_special('后端')"><a href="">后端</a></li>
                <li @click="click_special('人工智能')"><a href="">人工智能</a></li>
                <li @click="click_special('C/C++')"><a href="">C/C++</a></li>
                <li @click="click_special('数据结构')"><a href="">数据结构</a></li>
                <li @click="click_special('学习')"><a href="">学习</a></li>
                <li @click="click_special('其他')"><a href="">其他</a></li>
            </nav>
            <div class="box_content_top">
                <div class="box_content_title ">
                    <span class="iconfont icon-rengongzhineng" style="color:#1296db"></span>
                </div>
                <div class="box_content_title"><span class="iconfont icon-hc-castle"
                        style="font-size:20px;color: #CD5C5C;"></span>
                </div>
                <div class="box_content_title"><span class="iconfont icon-jili" style="color:#eeb174"></span></div>
            </div>
            <div class="box_content">
                <div class="box1">
                    <!-- <router-link to="/B_Essay">
                        <div style="color:azure;cursor:pointer">点击跳转文章页面</div>
                    </router-link> -->
                    <div class="ai_con" v-for="(item, index) in ai_arr" @click="openNewTab(item.article_uuid, item.visibility)"
                        :key="index" :data-custom="item.article_uuid">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.abstract }}</p>
                    </div>
                </div>
                <div class="box1">
                    <div class="ai_con" v-for="(item, index) in c_arr" :key="index"
                        @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.abstract }}</p>
                    </div>
                </div>
                <div class="box2">
                    <!-- 轮播图 -->
                    <Rotate_photo></Rotate_photo>
                </div>
            </div>
            <div class="box_content_bottom">
                <div class="bb_wai" v-for="(item, index) in lower_arr" :key="index"
                    @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
                    <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
                    <div>
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.abstract }}</p>
                        <div class="word_yuedu_wai">
                            <span class="iconfont icon-yueduliang"></span>
                            <span class="word_yuedu">{{ item.reading_volume }}</span>
                        </div>
                    </div>
                </div>
                <div class="bb_wai" v-for="(item, index) in lower_arr_2" :key="index"
                    @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
                    <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
                    <div>
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.abstract }}</p>
                        <div class="word_yuedu_wai">
                            <span class="iconfont icon-yueduliang"></span>
                            <span class="word_yuedu">{{ item.reading_volume }}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="bb_wai">2</div>
                <div class="bb_wai">3</div>
                <div class="bb_wai">4</div> -->
                <!-- <div>5</div>
                <div>6</div> -->
                <!-- <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div> -->
                <!-- <div class="bb_wai">
                    <img src="">
                    <div>
                        <h2>标题</h2>
                        <p>内容</p>
                        <div class="word_yuedu_wai">
                            <span class="iconfont icon-yueduliang"></span>
                            <span class="word_yuedu">1111</span>
                        </div>
                    </div>
                </div> -->
                <div class=" last" v-show="last_show">-----已经到底了-----</div>
            </div>
        </main>

    </div>
</template>

<script>
import { mapStatus, getToken } from '@/utils'
import { firstPageMessage } from '@/api/blog'
import router from '@/router';
import { ref, onMounted, onUnmounted, reactive, toRefs, onUpdated } from 'vue'
import '@/assets/fonts/souSuo/iconfont.css'
import Rotate_photo from '@/components/Blog/Rotate_photo.vue'
import blogHeader from '@/components/Blog/blogHeader.vue'
export default {
    name: 'Blog',
    components: { blogHeader, Rotate_photo },
    setup() {
        const customAttr = ref('')
        let last_show = ref(false)
        let ai_arr = reactive([])
        let c_arr = reactive([])
        let lower_arr = reactive([])
        // let lower_arr=ref([])
        let lower_arr_2 = reactive([])
        // 开新页面
        function openNewTab(uuid, visibility) {
            if (visibility == '全体可见') {
                const queryString = uuid
                const url = router.resolve({ name: 'Essay', query: { queryString } }).href;
                window.open(url, '_blank')
            } else {
                if (getToken('refresh_token') != '') {
                    const queryString = uuid
                    const url = router.resolve({ name: 'Essay', query: { queryString } }).href;
                    window.open(url, '_blank')
                } else {
                    ElMessage('仅成员可见!!!')
                }
            }
        }
        // 打开特定专区
        function click_special(val) {
            let queryString = val
            router.push({ name: 'Special', query: { queryString } })
        }
        let scrollPosition = 0;
        function getHeight() {
            const totalHeight = document.body.scrollHeight
            const viewportHeight = window.innerHeight
            scrollPosition = totalHeight - viewportHeight
        }
        //信息的高度--用来判断窗口高度有没有变化，为要不要重新发请求做判断
        // let axiosHeight = ref(window.innerHeight)
        //发请求的数量
        let messageNum = ref(0)
        //第二次或者第n次加载页面数据
        let requestNum = ref(1);
        //计算要拿多少个数据
        function getData() {
            // 已有信息高度小于视高开始加载，每次都清空不能累加信息高度
            if (150 * messageNum.value >= window.innerHeight || !window.innerHeight >= 610) {
                return
            }
            //发信息的次数（多加两次防止出现bug）
            messageNum.value = parseInt(window.innerHeight / 150) + 2
            //初次加载页面,保存的数据都要删除掉完
            first_message()
            lower_arr.splice(0, lower_arr.length)
            lower_arr_2.splice(0, lower_arr_2.length)
            requestNum.value = 1;
        }
        //二次加载页面
        let fight_scroll = ref(true)
        async function bottom_message() {
            if (window.scrollY >= scrollPosition - 1) {
                fight_scroll.value = false
                requestNum.value++
                let data = {
                    label: ''
                }
                const res = await firstPageMessage(requestNum.value, 4, messageNum.value,data)
                if (res.code == 0) {
                    if (res.data) {
                        let i = 0;
                        res.data.forEach(item => {
                            lower_arr_2.push(item)
                            i++;
                        })
                        if (i < 4) {
                            last_show.value = true;
                            return
                        }
                    } else {
                        last_show.value = true;
                        return
                    }
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
                fight_scroll.value = true;
            }
        }
        async function first_message() {
            let data = {
                label: ''
            }
            const res = await firstPageMessage(1, messageNum.value, messageNum.value, data)
            if (res.code == 0) {
                if (res.data) {
                    let i = 0;
                    res.data.forEach(item => {
                        lower_arr.push(item)
                        i++;
                    })
                    if (i < messageNum.value) {
                        last_show.value = true;
                        return
                    }
                } else {
                    last_show.value = true;
                    return
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            getData()
            window.addEventListener('resize', getData)
            window.addEventListener('scroll', getHeight)
        })
        onUpdated(() => {
            //n次加载数据
            window.addEventListener('scroll', () => {
                if (!last_show.value && lower_arr.length >= messageNum.value && fight_scroll.value) {
                    bottom_message();
                }
            })
        })
        onUnmounted(() => {
            window.removeEventListener('resize', getData)
            window.removeEventListener('scroll', getHeight)
            window.removeEventListener('scroll', bottom_message)
        })
        return {
            openNewTab,
            click_special,
            last_show,
            ai_arr,
            c_arr,
            lower_arr,
            lower_arr_2,
            customAttr,
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

.w_header {
    position: sticky;
    top: 0;
    z-index: 22;
}

.bb_wai .word_yuedu_wai {
    position: relative;
    background-color: rgb(33, 33, 33);
}

.bb_wai .icon-yueduliang {
    width: 18px;
    display: block;
    color: #afaeab;
    position: absolute;
    top: 2px;
    background-color: rgb(33, 33, 33);
}

.bb_wai .word_yuedu {
    margin-left: 18px;
    font-size: 14px;
    color: #afaeab;
    background-color: rgb(33, 33, 33);
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

/* .box_height{
    height:100vh;
} */
.box {
    flex: 1;
}

.box_top {
    max-width: 1200px;
    height: 70px;
    background-color: rgb(33, 33, 33);
    box-shadow: 0 0 2px 0 rgb(119, 117, 117);
    margin: 10px auto;
    border-radius: 4px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box_top li {
    /* padding: 5px; */
    text-align: center;
    width: 171px;
}

.box_top li a {
    border-radius: 4px;
    background-color: rgb(33, 33, 33);
    color: #FFFAF0;
    display: block;
    height: 70px;
    width: 100%;
    line-height: 70px;
}

.box_top li a:hover {
    background: #FFB6C1;
    /* color: #FF7F50; */
    /* color:LightCoral; */
    /* color:#CD5C5C; */
    /* color:#F08080; */
    /* color:#FF4500; */
    /* color:#FA8072; */
    color: #FF6347;
}

/* 内容头的标题 */
.box_content_top {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

}

.box_content_top .box_content_title {
    background: rgb(33, 33, 33);
    box-shadow: 0 0 2px 0 rgb(119, 117, 117);
    height: 40px;
    line-height: 40px;
    border-radius: 4px 4px 0 0;

    width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box_content_title span {
    background: rgb(33, 33, 33);

    font-size: 25px;
}

/* 内容 */
.box_content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

.box_content .box1 {
    background: rgb(33, 33, 33);
    box-shadow: 0 0 2px 0 rgb(119, 117, 117);
    height: 400px;
    border-radius: 0 0 4px 4px;

    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
    width: 390px;
}

/* 轮播图 */
.box_content .box2 {
    background: rgb(33, 33, 33);
    box-shadow: 0 0 2px 0 rgb(119, 117, 117);
    height: 400px;
    border-radius: 0 0 4px 4px;
    width: 390px;
}



.box1 .ai_con {
    height: 80px;
    margin-top: 15px;
    background-color: rgb(21, 20, 20);
    /* color: #e2e2e2; */
    cursor: pointer
}

.box1 .ai_con h3 {
    color: #e2e2e2;
    background-color: rgb(21, 20, 20);
    margin: 11px 10px 0 10px;
    width: 370px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.box1 .ai_con h3:hover {
    text-decoration: underline;
}

.box1 .ai_con p {
    color: #afaeab;
    background-color: rgb(21, 20, 20);
    margin: 8px 10px 0 10px;
    width: 370px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 底部*/
.box_content_bottom {
    max-width: 1200px;
    margin: 15px auto 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.box_content_bottom .bb_wai {
    height: 150px;
    background-color: rgb(33, 33, 33);
    display: flex;
    cursor: pointer;
}

.box_content_bottom .bb_wai img {
    height: 130px;
    width: 200px;
    margin: 10px;
}

.box_content_bottom .bb_wai div {
    width: 965px;
    background-color: rgb(33, 33, 33);
    margin-right: 10px;
    margin-left: 5px;
}

.box_content_bottom .bb_wai div h2 {
    color: #e2e2e2;
    background-color: rgb(33, 33, 33);
    margin-top: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.box_content_bottom .bb_wai div h2:hover {
    text-decoration: underline;
}

.box_content_bottom .bb_wai div p {
    width: 965px;
    color: #afaeab;
    background-color: rgb(33, 33, 33);
    margin-top: 8px;
    height: 65px;
    font-size: 16px;
    word-wrap: break-word;

    /* white-space:normal; */
    overflow: hidden;
    text-overflow: ellipsis;

}

.box_content_bottom .last {
    text-align: center;
    height: 150px;
    line-height: 150px;
    font-size: 20px;
    color: #FFB6C1;
    background-color: rgb(61, 59, 59);
}
</style>
<template>
    <div class="main_box">
        <header class="w_header">
            <SpecialHeader></SpecialHeader>
        </header>
        <main class="box">
            <div>
                <nav class="box_top">
                    <li @click="click_special('前端')"><a href="" :class="special_value == '前端' ? Check_style : ''">前端</a>
                    </li>
                    <li @click="click_special('后端')"><a href="" :class="special_value == '后端' ? Check_style : ''">后端</a>
                    </li>
                    <li @click="click_special('人工智能')"><a href=""
                            :class="special_value == '人工智能' ? Check_style : ''">人工智能</a>
                    </li>
                    <li @click="click_special('C/C++')"><a href=""
                            :class="special_value == 'C/C++' ? Check_style : ''">C/C++</a></li>
                    <li @click="click_special('数据结构')"><a href=""
                            :class="special_value == '数据结构' ? Check_style : ''">数据结构</a>
                    </li>
                    <li @click="click_special('学习')"><a href="" :class="special_value == '学习' ? Check_style : ''">学习</a>
                    </li>
                    <li @click="click_special('其他')"><a href="" :class="special_value == '其他' ? Check_style : ''">其他</a>
                    </li>
                </nav>
                <div class="box_content">
                    <div class="con_wai" v-for="(item, index) in data_arr" :key="index"
                        @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
                        <img
                            :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
                        <div>
                            <h2>{{ item.title }}</h2>
                            <p>{{ item.abstract }}</p>
                            <div class="word_yuedu_wai">
                                <span class="iconfont icon-yueduliang"></span>
                                <span class="word_yuedu">{{ item.reading_volume }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="con_wai" v-for="(item, index) in data_arr_2" :key="index"
                        @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
                        <img
                            :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
                        <div>
                            <h2>{{ item.title }}</h2>
                            <p>{{ item.abstract }}</p>
                            <div class="word_yuedu_wai">
                                <span class="iconfont icon-yueduliang"></span>
                                <span class="word_yuedu">{{ item.reading_volume }}</span>
                            </div>
                        </div>
                    </div>
                    <div class=" last" v-show="last_show">-----已经到底了-----</div>
                </div>
            </div>

        </main>
    </div>
</template>

<script>
import router from '@/router'
import { mapStatus, getToken } from '@/utils'
import { firstPageMessage } from '@/api/blog'
import { ref, onMounted, reactive, onUnmounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import SpecialHeader from '@/components/Blog/SpecialHeader.vue'
export default {
    name: 'Special',
    components: { SpecialHeader },
    setup() {
        let data_arr = reactive([])
        let data_arr_2 = reactive([])
        let last_show = ref(false)
        let li_value = ref(null)
        const route = useRoute();
        let Check_style = ref('')
        Check_style.value = 'Schecked_style'

        let special_value = ref('')
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
        //发请求的数量
        let messageNum = ref(0)
        //第二次或者第n次加载页面数据
        let requestNum = ref(1);
        //计算要拿多少个数据
        function getData() {
            // 已有信息高度小于视高开始加载，每次都清空不能累加信息高度
            if (150 * messageNum.value >= window.innerHeight) {
                return
            }
            //发信息的次数（多加两次防止出现bug）
            messageNum.value = parseInt(window.innerHeight / 150) + 2
            //初次加载页面,保存的数据都要删除掉完
            first_message()
            data_arr.splice(0, data_arr.length)
            data_arr_2.splice(0, data_arr_2.length)
            requestNum.value = 1;
        }
        //二次加载页面
        let fight_scroll = ref(true)
        async function bottom_message() {
            if (window.scrollY >= scrollPosition - 1) {
                fight_scroll.value = false
                requestNum.value++
                let data = {
                    label: route.query.queryString
                }
                const res = await firstPageMessage(requestNum.value, 4, messageNum.value, data)
                if (res.code == 0) {
                    if (res.data) {
                        let i = 0;
                        res.data.forEach(item => {
                            data_arr_2.push(item)
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
                label: route.query.queryString
            }
            const res = await firstPageMessage(1, messageNum.value, messageNum.value, data)
            if (res.code == 0) {
                if (res.data) {
                    let i = 0;
                    res.data.forEach(item => {
                        data_arr.push(item)
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
            special_value.value = route.query.queryString;
            getData()
            window.addEventListener('resize', getData)
            window.addEventListener('scroll', getHeight)
        })
        onUpdated(() => {
            //n次加载数据
            window.addEventListener('scroll', () => {
                if (!last_show.value && data_arr.length >= messageNum.value && fight_scroll.value) {
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
            data_arr,
            data_arr_2,
            last_show,
            Check_style,
            li_value,
            special_value,
            click_special,
            openNewTab,
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

/* html,
body {
    height: 100%;
    width: 100%;
    overflow: hidden;
} */

.Schecked_style {
    background-color: rgb(33, 33, 33) !important;
    /* background-color: #1b1b1b !important; */
}

.word_yuedu_wai {
    position: relative;
}

.icon-yueduliang {
    color: #afaeab;
    position: absolute;
    top: 2px;
    width: 18px;
    background-color: rgb(33, 33, 33);
    /* background-color: #1b1b1b; */
}

.word_yuedu {
    margin-left: 18px;
    font-size: 14px;
    color: #afaeab;
    /* background-color: #1b1b1b; */
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

.w_header {
    position: sticky;
    top: 0;
    z-index: 22;
}

.box {
    /* min-height: 100vh;
    transition: min-height 0.3s ease; */
    flex: 1;
}

.box_top {
    max-width: 1200px;
    height: 60px;
    /* background-color: rgb(33, 33, 33); */
    background-color: #373636;
    box-shadow: 0 0 2px 0 rgb(119, 117, 117);
    margin: 10px auto;
    border-radius: 4px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.box_top li {
    /* padding: 5px; */
    width: 171px;
    text-align: center;

}

.box_top li a {
    border-radius: 4px;
    /* background-color: rgb(33, 33, 33); */
    background-color: #373636;
    color: #FFFAF0;
    display: block;
    height: 60px;
    width: 100%;
    line-height: 60px;
}

.box_top li a:hover {
    /* background: #FFB6C1; */
    color: #FF6347;
}

.box_content {
    max-width: 1200px;
    margin: 15px auto 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.box_content .con_wai {
    height: 150px;
    background-color: rgb(33, 33, 33);
    /* background-color: #1b1b1b; */
    display: flex;
    cursor: pointer;
}

.box_content .con_wai img {
    height: 130px;
    width: 200px;
    margin: 10px;
    /* background-color: #1b1b1b; */
    background-color: rgb(33, 33, 33);
}

.box_content .con_wai div {
    width: 965px;
    background-color: rgb(33, 33, 33);
    /* background-color: #1b1b1b; */
    margin-right: 10px;
    margin-left: 5px;
}

.box_content .con_wai div h2 {
    color: #e2e2e2;
    background-color: rgb(33, 33, 33);
    /* background-color: #1b1b1b; */
    margin-top: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.box_content .con_wai div h2:hover {
    text-decoration: underline;
}

.box_content .con_wai div p {
    width: 965px;
    color: #afaeab;
    background-color: rgb(33, 33, 33);
    /* background-color: #1b1b1b; */
    margin-top: 8px;
    height: 65px;
    font-size: 16px;
    word-wrap: break-word;

    /* white-space:normal; */
    overflow: hidden;
    text-overflow: ellipsis;
}

.box_content .last {
    text-align: center;
    height: 150px;
    line-height: 150px;
    font-size: 20px;
    color: #FFB6C1;
    background-color: rgb(61, 59, 59);
}
</style>
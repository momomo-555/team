<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-28 09:59:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 20:56:10
 * @FilePath: \renai_two\src\components\Blog\writeRequest.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box_content">
        <div class="con_wai" v-for="(item, index) in data_arr" :key="index" :data-custom="item.article_uuid">
            <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`"
                @click="openNewTab(item.article_uuid, item.visibility)" class="img">
            <div>
                <h2 @click="openNewTab(item.article_uuid, item.visibility)">{{ item.title }}</h2>
                <p @click="openNewTab(item.article_uuid, item.visibility)">{{ item.abstract }}</p>
                <div class="Button">
                    <span class="iconfont icon-yueduliang"></span>
                    <span class="word_yuedu">{{ item.reading_volume }}</span>
                    <button v-show="p.remove" class="Button_b" style="margin-top: 1px;" :class="Delete_button"
                        @click="deleteArtile($event, item.article_uuid)" :disabled="art_disable"
                        :data-custom="item.article_uuid">{{ p.remove
                        }}</button>
                    <button v-show="p.edit" class="Button_b" @click="operateArtile($event, item.article_uuid)"
                        :disabled="art_disable_ed" :data-custom="item.article_uuid" :class="Edit_button">{{ p.edit
                        }}</button>
                </div>
            </div>
        </div>
        <div class="con_wai" v-for="(item, index) in data_arr_2" :key="index" :data-custom="item.article_uuid">
            <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`"
                @click="openNewTab(item.article_uuid, item.visibility)" class="img">
            <div>
                <h2 @click="openNewTab(item.article_uuid, item.visibility)">{{ item.title }}</h2>
                <p @click="openNewTab(item.article_uuid, item.visibility)">{{ item.abstract }}</p>
                <div class="Button">
                    <span class="iconfont icon-yueduliang"></span>
                    <span class="word_yuedu">{{ item.reading_volume }}</span>
                    <button v-show="p.remove" class="Button_b" style="background-color:red;margin-top: 1px;"
                        @click="deleteArtile($event, item.article_uuid)" :disabled="art_disable" :class="Delete_button"
                        :data-custom="item.article_uuid">{{
                            p.remove }}</button>
                    <button v-show="p.edit" class="Button_b" @click="operateArtile($event, item.article_uuid)"
                        :disabled="art_disable_ed" :data-custom="item.article_uuid" :class="Edit_button">{{ p.edit
                        }}</button>
                </div>
            </div>
        </div>

        <div class="last" v-show="last_show">-----已经到底了-----</div>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { regainArtileAPI, deleteArtileAPI, completeDeleteArtileAPI, getWriteMessageAPI } from '@/api/blog'
import { ref, reactive, onMounted, onUpdated, onUnmounted } from 'vue'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
export default {
    name: 'writeRequest',
    props: ['message'],
    setup(props) {
        let Delete_button = ref('Delete_button_style1')
        let Edit_button = ref('Edit_button_style1')
        let customAttr = ref('')
        let art_disable_ed = ref(false)
        let art_disable = ref(false)
        let last_show = ref(false)
        let data_arr = reactive([])
        let data_arr_2 = reactive([])
        let p = reactive({
            remove: '',
            edit: '',
        })
        //开新页面
        function openNewTab(uuid, visibility) {
            // const queryString = uuid
            // const url = router.resolve({ name: 'Essay', query: { queryString } }).href
            // window.open(url, '_blank')
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
        let message = props.message;
        let scrollPosition = 0;
        function getHeight() {
            const totalHeight = document.body.scrollHeight
            const viewportHeight = window.innerHeight
            scrollPosition = totalHeight - viewportHeight
        }
        // 编辑文本
        function editArtile(val) {
            // alert('编辑文本')
            let queryString = val
            router.push({ name: 'Publish', query: { queryString } })

        }
        // 复原文章
        async function regainArtile(val) {
            const customAttrValue = val
            if (art_disable_ed.value) {
                return
            }
            Edit_button.value = 'Edit_button_style2'
            art_disable_ed.value = true
            let Auuid = {
                article_uuid: customAttrValue
            }
            const res = await regainArtileAPI(Auuid)
            if (res.code == 0) {
                ElMessage.success('复原成功')
                // 刷新
                // window.location.reload()
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
            Edit_button.value = 'Edit_button_style1'
            art_disable_ed.value = false
        }

        //进行判断修改和复原两种情况
        function operateArtile(event, Art_uuid) {
            const customAttrValue = event.target.getAttribute('data-custom')
            if (props.message === '已经删除') {
                // alert('复原')
                if (customAttrValue == Art_uuid) {
                    regainArtile(customAttrValue)
                } else {
                    return
                }
            } else {
                // alert('编辑')
                if (customAttrValue == Art_uuid) {
                    editArtile(customAttrValue)
                } else {
                    return
                }
            }
        }

        //删除文章请求
        async function deleteArtile_axios(customAttrValue) {
            Delete_button.value = 'Delete_button_style2'
            if (art_disable.value) {
                return
            }
            art_disable.value = true
            let Auuid = {
                article_uuid: customAttrValue
            }
            if (props.message === '已经删除') {
                const res = await completeDeleteArtileAPI(Auuid)
                if (res.code == 0) {
                    ElMessage.success('删除成功')
                    // window.location.reload()
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            } else {
                const res = await deleteArtileAPI(Auuid)
                if (res.code == 0) {
                    ElMessage.success('删除成功')
                    // window.location.reload()
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            }
            Delete_button.value = 'Delete_button_style1'
            art_disable.value = false
        }
        // 删除文章
        function deleteArtile(event, art_uuid) {
            const customAttrValue = event.target.getAttribute('data-custom')
            if (customAttrValue == art_uuid) {
                deleteArtile_axios(art_uuid)
            } else {
                return
            }
        }


        //信息的高度--用来判断窗口高度有没有变化，为要不要重新发请求做判断
        // let axiosHeight = ref(0)
        //发请求的数量
        let messageNum = ref(0)
        //第二次或者第n次加载页面数据
        let requestNum = ref(1);
        //计算要拿多少个数据
        function getData() {
            // 已有信息高度小于视高开始加载，每次都清空不能累加信息高度
            // console.log('...', messageNum.value * 150, lastHeight.value + 150 * messageNum.value, innerHeight)
            if (150 * messageNum.value >= window.innerHeight) {
                return
            }
            // console.log('jinlail')
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
            // console.log('jinali1...')
            if (window.scrollY >= scrollPosition - 1) {
                // console.log('jinali2...')
                fight_scroll.value = false
                requestNum.value++
                let data = {
                    process: props.message
                }
                const res = await getWriteMessageAPI(requestNum.value, 4, messageNum.value, data)
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
        //初次加载页面
        async function first_message() {
            let data = {
                process: props.message
            }
            const res = await getWriteMessageAPI(1, messageNum.value, messageNum.value, data)
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
            if (props.message == '已经删除') {
                p.remove = '删除'
                p.edit = '复原'
            } else {
                p.remove = '删除'
                p.edit = '编辑'
            }
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
            customAttr,
            data_arr,
            data_arr_2,
            last_show,
            art_disable_ed,
            openNewTab,
            deleteArtile,
            art_disable,
            p,
            operateArtile,
            Delete_button,
            Edit_button,
        }
    }
}
</script>

<style scoped>
.Edit_button_style1 {
    background-color: green;
}

.Edit_button_style2 {
    background-color: #afaeab;
}

.Delete_button_style1 {
    background-color: red;
}

.Delete_button_style2 {
    background-color: #afaeab;
}

.box_content {
    width: 1000px;
    margin: 0 auto 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.box_content .con_wai {
    height: 150px;
    background-color: rgb(33, 33, 33);
    display: flex;
    cursor: pointer;
}

.box_content .con_wai .img {
    height: 120px;
    width: 130px;
    margin: 15px;
}

.box_content .con_wai div {
    width: 820px;
    background-color: rgb(33, 33, 33);
    margin-right: 10px;
    margin-left: 5px;
}

.box_content .con_wai div h2 {
    color: #e2e2e2;
    background-color: rgb(33, 33, 33);
    margin-top: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.box_content .con_wai div h2:hover {
    text-decoration: underline;
}

.box_content .con_wai div p {

    color: #afaeab;
    background-color: rgb(33, 33, 33);
    margin-top: 8px;
    height: 50px;
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
    /* background-color: rgb(61, 59, 59);
    border:0.5px solid rgb(33, 33, 33); */
    /* border:2px solid rgb(33, 33, 33); */
}

.con_wai .Button {
    margin-top: 8px;
    height: 30px;
    position: relative;
    /* overflow:hidden; */
}

.Button .icon-yueduliang {
    color: #afaeab;
    position: absolute;
    top: 2px;
}

.Button .word_yuedu {
    margin-left: 18px;
    font-size: 14px;
    color: #afaeab;
}

.con_wai .Button .Button_b {
    cursor: pointer;
    float: right;
    outline: none;
    margin-right: 10px;
    border: 0;
    height: 20px;
    width: 35px;
    line-height: 20px;
    font-size: 15px;
    border-radius: 2px;
    color: #000;
}
</style>
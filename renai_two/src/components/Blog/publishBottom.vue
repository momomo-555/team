<template>
    <div class="wai">
        <div class="l">
            <div @click="returnBottom" v-show="p.fight1">
                <span class="iconfont icon-xiangxia"></span>
                <p>发文设置</p>
            </div>
            <div @click="returnTop" v-show="p.fight2">
                <span class="iconfont icon-xiangshang"></span>
                <p>返回顶部</p>
            </div>
        </div>
        <div class="r">
            <div @click="clickDraft" :disable="keep_button" :class="keep_button_style">保存草稿</div>
            <div style="margin-right: 20px;" @click="clickBlog" :disable="publish_button" :class="publish_button_style">
                发布博客
            </div>
        </div>
    </div>
</template>

<script>
import { userUuidAPI } from '@/api/user'
import { useRoute } from 'vue-router'
import { mapStatus } from '@/utils'
import { articleOptionsAPI, checkArticleAPI } from '@/api/blog'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
import { reactive, ref, onUpdated, onMounted, onUnmounted, computed, toRef } from 'vue'
export default {
    name: 'publishBottom',
    props: ['con', 'a', 'title_format', 'c', 'items', 'cover', 'title_content', 'reading_volume'],
    setup(props, { emit }) {
        const p = reactive({
            fight1: true,
            fight2: false,
        })
        const route = useRoute()
        let publish_button = ref(false)
        let publish_button_style = ref('')
        let keep_button = ref(false)
        let keep_button_style = ref('')
        let PageHeight = ref(0)
        function IsKong() {
            let htmlContent = ref('');
            // 尖括号和空格
            htmlContent = props.con.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
            // console.log(props.con.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, ''), 'replace')
            // 空字符串
            // let Kong = /^[ ]+$/
            // 只包含空白字符
            let Kong = /^\s*$/
            // console.log(Kong.test(htmlContent),'Kong.test(htmlContent)')
            if (Kong.test(htmlContent)) {
                alert('请输入内容')
                return false;
            } else {
                // alert('开始验证')
                return true;
            }
        }
        function Istitle() {
            if (!props.title_format) {
                alert('请输入正确的标题格式')
                return false;
            }
            else {
                // console.log(props.title_format)
                return true;
            }
        }
        //获取用户uuid

        //保存或者/发布博客请求
        async function articleOptions(a, b, process) {
            if (a.value) {
                return
            }
            a.value = true;
            const res2 = await userUuidAPI()
            if (res2.code == 0) {
                if (res2.data) {
                    b.value = 'publish_button_style2'
                    let str = '';
                    for (let i = 0; i < props.items.length; i++) {
                        str += `${props.items[i]},`
                    }
                    let data = {
                        article_uuid: route.query.queryString,
                        user_uuid: res2.data.uuid,
                        title: props.title_content,
                        content: props.con,
                        process: process,
                        label: str,
                        cover: props.cover,
                        abstract: props.c.TextareaContent,
                        visibility: props.a.scope,
                        article_type: props.a.type,
                        reading_volume: props.reading_volume,
                        creat_time: ''
                    }
                    const res = await articleOptionsAPI(data)
                    if (res.code == 0) {
                        ElMessage.success(res.data.message)
                        // 添加成功
                        // 跳转页面
                        emit('child-to-parent', true);
                        if (process == '未审核') {
                            checkArticle()
                            // console.log('...')
                        }
                        router.push('/Write');
                    } else {
                        ElMessage.error(mapStatus.get(res.code))
                    }
                }
                a.value = false;
                b.value = ''
            } else {
                ElMessage.error('失败，请重新操作')
            }
            a.value = false;
            b.value = ''
        }
        //发布--审核文章
        async function checkArticle() {
            let data = {
                article_uuid: route.query.queryString
            }
            const res = await checkArticleAPI(data)
            // if (res.code == 0) {

            // } else {
            //     ElMessage.error(mapStatus.get(res.code))
            // }
        }
        // 草稿
        function clickDraft() {
            publish_button_style.value = '';
            keep_button_style.value = 'publish_button_style1';
            let a = IsKong();
            let b = Istitle();
            if (a && b) {
                // console.log(props.items.length)
                if (!props.items.length) {
                    alert('标签不能为空')
                    return;
                }
                emit('publishChild_to', true)
                articleOptions(keep_button, keep_button_style, '草稿');
            }

        }
        // 博客
        function clickBlog() {
            keep_button_style.value = '';
            // publish_button_style.value = 'publish_button_style1';
            // 文章的标题和摘要
            let a = IsKong();
            // console.log(a,'a')
            let b = Istitle();
            // console.log(b,'b')
            if (a && b) {
                if (!props.items.length) {
                    alert('标签不能为空')
                    return;
                }
                // 触发信息
                emit('publishChild_to', true)
                // console.log(props.title_content, 'title_content')
                articleOptions(publish_button, publish_button_style, '未审核');
                //审核文章，点击发布的时候开始调用
            }
        }
        function returnTop() {
            window.scrollTo({
                top: 0,
                // 平滑滚动
                behavior: 'smooth',
            })
        }
        function returnBottom() {
            // 页面总高度
            const totalHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollPosition = totalHeight - viewportHeight;
            window.scrollTo({
                top: scrollPosition,
                // 平滑滚动
                behavior: 'smooth',
            })
        }
        function getHeight() {
            PageHeight = window.scrollY;
            // console.log(window.scrollY, 'window.scrollY')
            if (PageHeight >= 600) {
                // console.log('1111')
                p.fight1 = false
                p.fight2 = true
            } else {
                p.fight1 = true
                p.fight2 = false
            }
        }
        const handleResize = () => {
            getHeight(); // 当窗口大小变化时，获取并更新页面高度
        };
        onMounted(() => {
            // console.log(route.query.queryString, '...')
            // 不能写成带handleResize()
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', getHeight)
        })
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', getHeight)
        })
        return {
            p,
            PageHeight,
            publish_button,
            publish_button_style,
            keep_button,
            keep_button_style,
            returnTop,
            returnBottom,
            getHeight,
            clickDraft,
            clickBlog,
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

.publish_button_style1 {
    background-color: orangered;
}

.publish_button_style2 {
    background-color: rgb(119, 117, 117);
}

.wai {
    height: 80px;
    min-width: 1200px;
    /* background: #000; */
    background: rgb(21, 20, 20);
    border-top: 1px rgb(119, 117, 117) solid;
    /* border-bottom: 8px #3b3b3b solid; */
    border-radius: 5px 5px 0 0;
    /* box-shadow: 0 0 1px 1px rgb(119, 117, 117); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 2000;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

.r {
    display: flex;
    gap: 30px;
}

.r div {
    width: 100px;
    font-size: 18px;
    border: 1px solid #e2e2e2;
    text-align: center;
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    cursor: pointer;
}

/* .r div:hover{
    background-color:orangered;
} */
.l {
    cursor: pointer;
    position: relative;
    /* overflow:hidden; */
}

.l span {
    position: absolute;
    right: -20px;
    top: 2px;
}

.l p {
    margin-left: 20px;
    font-size: 18px;
}
</style>
<template>
    <div class="bottom_l" :class="bottom2" style="cursor:pointer" @click="returnTop">
        <span class="iconfont icon-xiangshang"></span>
        <span style="margin-left: 5px;">返回顶部</span>
    </div>
    <div class="bottom_r">
        <!-- <div :class="R_style" class="reminder_wai">
            <p class="reminder">{{ R_message }}</p>
        </div> -->
        <span class="iconfont icon-shoucang" :class="C_style" @click="click_Collect"></span>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { collectEssayAPI, removeCollectEssayAPI } from '@/api/blog'
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'EssayBottom',
    props: ['isCollect'],
    setup(props) {
        const route = useRoute();
        let C_style = ref('icon-shoucang1_style1')
        let bottom2 = ref('')
        // 是否出现返回顶部
        function Height() {
            const totalHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollPosition = totalHeight - viewportHeight;
            if (totalHeight <= viewportHeight) {
                bottom2.value = 'bottom_style3';
            }
        }
        function returnTop() {
            window.scrollTo({
                top: 0,
                // 平滑滚动
                behavior: 'smooth',
            })
        }


        // 点击收藏
        async function click_Collect() {
            let data = {
                article_uuid: route.query.queryString
            }
            if (C_style.value === 'icon-shoucang1_style1') {
                //开始收藏
                const res = await collectEssayAPI(data)
                if (res.code == 0) {
                    C_style.value = 'icon-shoucang1_style2'
                    ElMessage.success('收藏成功')
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            }
            if (C_style.value === 'icon-shoucang1_style2') {
                //取消收藏
                const res = await removeCollectEssayAPI(data)
                if (res.code == 0) {
                    C_style.value = 'icon-shoucang1_style1'
                    ElMessage.success('已取消收藏')
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            }
        }
        onMounted(() => {
            Height()
            addEventListener('scroll', Height)
            // 收藏状态
            if (props.isCollect == 1) {
                // 不显示
                C_style.value = 'icon-shoucang1_style3'
            } else if (props.isCollect == 2) {
                // 显示收藏
                C_style.value = 'icon-shoucang1_style2'
            } else if (props.isCollect == 3) {
                // 没有收藏
                C_style.value = 'icon-shoucang1_style1'
            }
        })
        onUpdated(() => {
            // 收藏状态
            if (props.isCollect == 1) {
                // 不显示
                C_style.value = 'icon-shoucang1_style3'
            } else if (props.isCollect == 2) {
                // 显示收藏
                C_style.value = 'icon-shoucang1_style2'
            } else if (props.isCollect == 3) {
                // 没有收藏
                C_style.value = 'icon-shoucang1_style1'
            }
        })
        onUnmounted(() => {
            removeEventListener('scroll', Height)
        })
        return {
            C_style,
            returnTop,
            click_Collect,
            bottom2,
        }
    }
}
</script>

<style scoped>
.bottom_l {
    float: left;
    display: block;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: #e2e2e2;
    font-size: 18px;
}

.bottom_r {
    float: right;
    padding-right: 10px;
    position: relative;
    /* overflow: hidden; */
}

.icon-shoucang {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 2px;
    cursor: pointer;
}

.icon-shoucang1_style1 {
    color: #e2e2e2 !important;
}

.icon-shoucang1_style2 {
    color: rgb(246, 104, 9) !important;
}

.icon-shoucang1_style3 {
    display: none !important;
}

.reminder_wai {
    z-index: 1;
    top: 30%;
    left: 50%;
    position: fixed;
    height: 35px;
    width: 150px;
    background-color: lightpink;
    text-align: center;
    border-radius: 5px;

}

.reminder {
    font-family: 微软雅黑;
    letter-spacing: 2px;
    font-size: 16px;
    /* width: 80px; */
    line-height: 33px;
    color: #fff;
    /* background-color:rgba(86, 82, 82,0.5) */
}

.reminder_style1 {
    display: none;
}

.reminder_style2 {
    display: block;
}


.bottom_style2 {
    position: absolute;
}

.bottom_style3 {
    display: none !important;
}
</style>
<template>
    <div class="In_box_wai">
        <header class="In_header">
            <div v-if="fg2">
                <firstHeader msg="登录/注册" msg_ref="/Login" user="Information"></firstHeader>
            </div>
            <div v-else>
                <firstHeader msg="个人中心" msg_ref="/Center" user="Information"></firstHeader>
            </div>
        </header>
        <main class="In_box_con">
            <div class="con_top">
                <span style="margin-left:20px;" :class="spanSty.span1" @click="click_span('成员信息')">成员信息</span>
                <span :class="spanSty.span2" @click="click_span('主攻方向')">主攻方向</span>
                <span :class="spanSty.span3" @click="click_span('获奖信息')">获奖信息</span>
            </div>
            <div class="con_con">
                <div class="box1 box" v-if="div_fig.fig1">
                    <personInfo></personInfo>
                </div>
                <div class="box2 box" v-if="div_fig.fig2">
                    <!-- 主攻方向 -->
                    <mainDirection></mainDirection>
                </div>
                <div class="box3 box" v-if="div_fig.fig3">
                    <!-- 获奖信息 -->
                    <awardInfo></awardInfo>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import awardInfo from '@/components/Information/awardInfo.vue'
import mainDirection from "@/components/Information/mainDirection.vue"
import personInfo from '@/components/Information/personInfo.vue'
import { ref, reactive, onMounted } from 'vue'
import { userUuidAPI } from '@/api/user'
import { mapStatus } from '@/utils'
export default {
    name: 'Information',
    components: { personInfo, mainDirection, awardInfo },
    setup() {
        let fg2 = ref(true)
        const store = useStore()
        fg2.value = !store.state.loginFight

        let spanSty = reactive({
            span1: 'span_style',
            span2: '',
            span3: '',
        })
        let div_fig = reactive({
            fig1: true,
            fig2: false,
            fig3: false,
        })
        function click_span(val) {
            if (val == '成员信息') {
                spanSty.span1 = 'span_style'
                spanSty.span2 = ''
                spanSty.span3 = ''
                div_fig.fig1 = true
                div_fig.fig2 = false
                div_fig.fig3 = false
            } else if (val == '主攻方向') {
                spanSty.span1 = ''
                spanSty.span2 = 'span_style'
                spanSty.span3 = ''
                div_fig.fig1 = false
                div_fig.fig2 = true
                div_fig.fig3 = false
            } else if (val == '获奖信息') {
                spanSty.span1 = ''
                spanSty.span2 = ''
                spanSty.span3 = 'span_style'
                div_fig.fig1 = false
                div_fig.fig2 = false
                div_fig.fig3 = true
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
        })
        return {
            fg2,
            spanSty,
            click_span,
            div_fig,
        }
    }
}
</script>

<style scoped>
.In_box_wai {
    width: 100%;
    height: 100vh;
    /* position: fixed; */
    overflow-y: auto;
    background-color: #313131;
    display: flex;
    flex-direction: column;
}

.In_header {
    position: sticky;
    top: 0;
    z-index: 2;
}

/* 内容 */
.In_box_con {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.In_box_con .con_top {
    margin: 20px 30px;
    height: 40px;
    line-height: 40px;
    /* background-color: rgb(100, 104, 104); */
    border-bottom: 1px solid #877f7f;
}

.In_box_con .con_con {
    flex: 1;
    margin: 0 25px;
}

.con_con .box {
    width: 100%;
    height: 100%;
    /* background-color:#625c5c; */
}

.con_top span {

    font-size: 18px;
    margin-right: 30px;
    cursor: pointer;
    color: rgb(154, 157, 157);
}

.span_style {
    color: rgb(134, 171, 239) !important;
}
</style>
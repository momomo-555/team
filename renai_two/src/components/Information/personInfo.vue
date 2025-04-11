<template>
    <div class="box_wai">
        <span v-show="More_show" class="iconfont icon-gengduo1" @click="open_cha"></span>
        <aside class="l">
            <div class="l_box">
                <div class="box" :class="Box.style1" @click="l_box_click('box_style', '', '', '', '')">大一成员</div>
                <div class="box" :class="Box.style2" @click="l_box_click('', 'box_style', '', '', '')">大二成员</div>
                <div class="box" :class="Box.style3" @click="l_box_click('', '', 'box_style', '', '')"> 大三成员</div>
                <div class="box" :class="Box.style4" @click="l_box_click('', '', '', 'box_style', '')">大四成员</div>
                <div class="box" :class="Box.style5" @click="l_box_click('', '', '', '', 'box_style')">薪火相传</div>
            </div>
        </aside>
        <div class="r">
            <!-- v-if会真正地销毁和重建组件，而v-show只是切换CSS的display属性 -->
            <div class="r_box" v-if="Box.style1 == 'box_style' ? true : false">
                <Info_oneBox Msg="大一"></Info_oneBox>
            </div>
            <div class="r_box" v-if="Box.style2 == 'box_style' ? true : false">
                <Info_oneBox Msg="大二"></Info_oneBox>
            </div>
            <div class="r_box" v-if="Box.style3 == 'box_style' ? true : false">
                <Info_oneBox Msg="大三"></Info_oneBox>
            </div>
            <div class="r_box" v-if="Box.style4 == 'box_style' ? true : false">
                <Info_oneBox Msg="大四"></Info_oneBox>
            </div>
            <div class="r_box" v-if="Box.style5 == 'box_style' ? true : false">
                <Info_oneBox Msg="薪火相传"></Info_oneBox>
            </div>
        </div>
    </div>
    <div class="hide_box" v-show="show_inf">
        <div class="hbox" style="margin-top: 90px;position:relative"><span class="iconfont icon-chahao"
                @click="close_cha"></span></div>
        <div class="hbox" :class="Box.style1" @click="l_box_click('box_style', '', '', '', '')">大一成员</div>
        <div class="hbox" :class="Box.style2" @click="l_box_click('', 'box_style', '', '', '')">大二成员</div>
        <div class="hbox" :class="Box.style3" @click="l_box_click('', '', 'box_style', '', '')"> 大三成员</div>
        <div class="hbox" :class="Box.style4" @click="l_box_click('', '', '', 'box_style', '')">大四成员</div>
        <div class="hbox" :class="Box.style5" @click="l_box_click('', '', '', '', 'box_style')">薪火相传</div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import '@/assets/fonts/souSuo/iconfont.css'
import Info_oneBox from './Info_oneBox.vue'
export default {
    name: 'personInfo',
    components: { Info_oneBox },
    setup() {
        let show_inf = ref(false)
        let More_show = ref(true)
        let Box = reactive({
            style1: 'box_style',
            style2: '',
            style3: '',
            style4: '',
            style5: '',
        })
        function l_box_click(a, b, c, d, e) {
            Box.style1 = a
            Box.style2 = b
            Box.style3 = c
            Box.style4 = d
            Box.style5 = e
            show_inf.value = false
            More_show.value = true
        }
        // 响应式
        function close_cha() {
            show_inf.value = false
            More_show.value = true
        }
        function open_cha() {
            show_inf.value = true
            More_show.value = false
        }
        return {
            Box,
            l_box_click,
            close_cha,
            show_inf,
            open_cha,
            More_show,
        }
    }
}
</script>

<style scoped>
.box_wai {
    height: 100%;
    display: flex;
    gap: 40px;
    position: relative;
}

.icon-gengduo1 {
    position: absolute;
    font-size: 30px;
    color: #c2bcbc;
    right: 18px;
    top: -60px;
    cursor: pointer;
    display: none;
}

.hide_box {
    position: fixed;
    top: 0px;
    left: 0;
    /* position: absolute; */
    background-color: rgba(10, 10, 10, 0.5);
    height: 100%;
    width: 100%;
    /* z-index: 1; */
}

.hide_box .hbox {
    color: #a7a0a0;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
    width: 100%;
}

.icon-chahao {
    color: #cdc0c0;
    font-size: 25px;
    position: absolute;
    right: 60px;
    top: 0px;
}

.box_wai .l {
    height: 100%;
    width: 180px;
    background-color: rgb(45, 44, 44);
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-radius: 55px; */
    border-top-right-radius: 55px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 55px;
    /* border-top: 10px solid #2e2e2e; */
    /* border-right:5px dashed #242422; */
    /* border-left:0px ridge #4c4849; */
    margin-left: 2%;
    /* #222020 */
    background:
        /* linear-gradient(to right, #5b5353, transparent), */
        linear-gradient(to right, transparent, #222020, transparent);
}

.l .l_box {
    width: 100%;
    /* background-color: rgb(45, 44, 44); */
}

.l .box {
    color: #a7a0a0;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
}

.r_box {
    height: 100%;
}

.box_style {
    color: #e2e2e2 !important;
}

.box_wai .r {
    flex: 1;
    margin: 20px 0;
    min-height: 440px;
}

/* 分页 */
@media (max-width:900px) {
    .r {
        margin-bottom: 0px !important;
    }
}

@media (max-width:620px) {
    .box_wai .l {
        display: none;
    }

    .l_box {
        display: none;
    }

    .box {
        display: none;
    }

    .icon-gengduo1 {
        display: block;
    }
}
</style>
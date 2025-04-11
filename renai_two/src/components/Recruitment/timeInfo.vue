<template>
    <div class="time_main_box">
        <div class="time_box">
            <div style="flex:0.6"></div>
            <div style="flex:1" class="time_box_con">
                <p class="p1">团队招新</p>
            </div>
            <div style="flex:1;margin-top:1.5vw;">
                <div>
                    <p class="p2">仁爱工作室,欢迎你的加入</p>
                </div>
            </div>
            <div style="flex:1.1;" class="time_line_box">
                <!-- <span class="line_con_span">></span> -->
                <div class="line_con_box" v-for="(item, index) in data_arr" :key="index">
                    <!-- 左 -->
                    <img class="line_img_2" src="@/assets/timebc2.gif"
                        :class="{ 'line_img_4': index === line_img_show }" v-if="line_img.show1">
                    <!-- 中 -->
                    <img class="line_img" src="@/assets/timebc2.gif" :class="{ 'line_img_4': index === line_img_show }"
                        v-if="line_img.show2">
                    <!-- 右 -->
                    <img class="line_img_3" src="@/assets/timebc2.gif"
                        :class="{ 'line_img_4': index === line_img_show }" v-if="line_img.show3">
                    <p style="margin-top: 10px;font-size:1.5vw">{{ item.timeStart }}</p>
                    <span style="font-size:1.3vw;">⇣</span>
                    <p style="margin-bottom: 10px;font-size:1.5vw"> {{ item.timeFinish }}</p>
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { timeInfoAPI } from '@/api/pageMessage'
import { mapStatus } from '@/utils'
export default {
    name: 'timeInfo',
    setup() {
        // 控制内容是否显示
        // let axios_fight = ref(false)
        // 显示具体的小图标
        let line_img = reactive({
            show1: true,
            show2: false,
            show3: false,
        })
        // 控制小图标外层div是哪一个
        let line_img_show = ref(0)
        // line_img_4
        // 存储信息的数组
        let data_arr = reactive([])

        async function axios_message() {
            const res = await timeInfoAPI()
            if (res.code == 0) {
                if (res.data.trainingTimeList) {
                    res.data.trainingTimeList.forEach(item => {
                        data_arr.push(item)
                    })
                    // 判断哪个小图标显示
                    if (+res.data.number == 0) {
                        line_img_show.value = 0;
                        line_img.show1 = true
                        line_img.show2 = false
                        line_img.show3 = false
                    } else {
                        // 判断是第几个盒子
                        line_img_show.value = Math.floor((+res.data.number + 1) / 2) - 1
                        // 判断具体在哪个位置
                        if ((line_img_show.value + 1) % 2) {
                            line_img.show1 = false
                            line_img.show2 = true
                            line_img.show3 = false
                        } else {
                            line_img.show1 = false
                            line_img.show2 = false
                            line_img.show3 = true
                        }
                    }
                } else {
                    ElMessage('没有信息')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message();
        })
        return {
            line_img_show,
            data_arr,
            line_img,

        }
    }
}
</script>

<style scoped>
.time_main_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.time_box {
    width: 80%;
    height: 100%;
    /* background-color: azure; */
    text-align: center;
    display: flex;
    flex-direction: column;
}


.p1 {
    font-size: 80px;
    font-family: 微软雅黑;
    /* -webkit-animation是为了兼容WebKit内核的浏览器（如早期的Chrome和Safari） */
    /* -webkit-animation: shining 0.5s alternate infinite; */
    animation: shining 1s alternate infinite;
}

@keyframes shining {
    from {
        text-shadow: 0 0 15px lightcoral, 0 0 25px lightcoral, 0 0 35px lightcoral, 0 0 45px lightpink, 0 0 55px lightpink, 0 0 65px lightpink;
    }

    to {
        text-shadow: 0 0 5px lightcoral, 0 0 10px lightcoral, 0 0 15px lightcoral, 0 0 20px lightpink, 0 0 25px lightpink, 0 0 30px lightpink;
    }
}

.p2 {
    font-family: 微软雅黑;
    height: 1.5em;
    font-size: 3em;
    margin: auto;
    width: 12em;
    word-break: break-all;
    overflow: hidden;
    border-right: 1px solid transparent;
    animation: typing 2s steps(42, end), blink-caret .75s step-end infinite;
}

/* 打印效果 */
@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 12em;
    }
}

/* 光标 */
@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: currentColor;
    }
}

/* 时间线 */
.time_line_box {
    border-top: 1px solid white;
    display: flex;
    justify-content: space-evenly;
    position: relative;
}

/* .line_con_span {
    position: absolute;
    right: -1%;
    top: -21%;
    font-size:35px;
} */

.time_line_box div {
    /* background-color: rgb(64, 62, 60); */
    font-size: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
}

.line_con_box {
    position: relative;
}

.line_img {
    position: absolute;
    top: -38%;
    left: 30%;
    width: 40%;
    height: 40%;
    display: none;
}

.line_img_2 {
    position: absolute;
    top: -38%;
    left: -23%;
    width: 40%;
    height: 40%;
    display: none;
}

.line_img_3 {
    position: absolute;
    top: -38%;
    right: -23%;
    width: 40%;
    height: 40%;
    display: none;
}

.line_img_4 {
    display: block !important;
}

@media(max-width:800px) {
    .p1 {
        font-size: 60px;
    }

    .p2 {
        max-width: 12em;
        font-size: 1.8em;
    }
}

@media(max-width:500px) {
    .p1 {
        font-size: 8vw;
    }

    .p2 {
        font-size: 5vw;
    }
}
</style>
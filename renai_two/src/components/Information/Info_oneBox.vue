<template>
    <div class="box_main">
        <div class="box_con">
            <!-- <div class="r_box_nei">
                <p>姓 &nbsp;&nbsp;名&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;莫</p>
                <p>姓 &nbsp;&nbsp;别&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;nv</p>
                <p>Q &nbsp;&nbsp;&nbsp;Q&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;2215925800</p>
                <p>年 &nbsp;&nbsp;级&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;22ji</p>
                <p>方 &nbsp;&nbsp;向&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p>座右铭&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;11111111111111111111</p>
            </div> -->
            <div v-if="showDataFight" class="r_box_nei" :class="numbet_data > 3 ? '' : 'r_box_ne_height'"
                v-for="(item, index) in showData" :key="index">
                <p>姓 &nbsp;&nbsp;名&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
                <p>姓 &nbsp;&nbsp;别&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.sex }}</p>
                <p>Q &nbsp;&nbsp;&nbsp;Q&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.qq }}</p>
                <p>年 &nbsp;&nbsp;级&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.grade }}</p>
                <p>方 &nbsp;&nbsp;向&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.direction }}</p>
                <p>座右铭&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.mottom }}</p>
            </div>
            <div v-else class="r_box_nei" :class="numbet_data > 3 ? '' : 'r_box_ne_height'"
                v-for="(item, index1) in data_info" :key="index1">
                <p>姓 &nbsp;&nbsp;名&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
                <p>姓 &nbsp;&nbsp;别&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.sex }}</p>
                <p>Q &nbsp;&nbsp;&nbsp;Q&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.qq }}</p>
                <p>年 &nbsp;&nbsp;级&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.grade }}</p>
                <p>方 &nbsp;&nbsp;向&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.direction }}</p>
                <p>座右铭&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.mottom }}</p>
            </div>
            <!-- <div class="r_box_nei">
                3
            </div>
            <div class="r_box_nei">
                <p>姓 &nbsp;&nbsp;名&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;莫</p>
                <p>姓 &nbsp; &nbsp;别&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;nv</p>
                <p>Q &nbsp;&nbsp;&nbsp;Q&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;2215925800</p>
                <p>年 &nbsp;&nbsp;级&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;22ji</p>
                <p>方 &nbsp;&nbsp;向&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p>座右铭&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;1111111111111111111111111111111</p>
            </div>
            <div class="r_box_nei">
                5
            </div> -->
        </div>
        <div class="box_bottom">
            <!-- <Page_break></Page_break> -->
            <div class="page_box">
                <p>{{ currentPage + 1 }}/{{ pageNum }}&nbsp;</p>
                <div @click="lastPage" :class="page_stop_style.style1"> <span class="iconfont icon-xiangzuo1"></span>
                </div>
                <div :class="currentPage + 1 == item ? 'page_number' : ''" v-for="(item, index) in page_number_five"
                    :key="index" @click="page_click(item)">
                    {{ item }}
                </div>
                <div @click="nextPage" :class="page_stop_style.style_2"> <span class="iconfont icon-xiangyou1"></span>
                </div>
            </div>
        </div>
        <div class="box_bottom_2" @click="small_width_click">
            <span>{{ small_width_click_word }}</span>
        </div>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { perInfoAPI } from '@/api/pageMessage'
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, reactive, onUpdated, onMounted } from 'vue'
export default {
    name: 'Info_oneBox',
    props: ['Msg'],
    setup(props) {
        // <900时候的文字
        let small_width_click_word = ref('⤓ 显示更多')
        // 禁止样式
        let page_stop_style = reactive({
            style1: 'page_stop',
            style_2: 'page_stop',
        })
        // 最终显示数据,判断页面宽度是否>900
        let showDataFight = ref(true)
        // 所有数据
        let data_info = reactive([])
        // 页数
        let currentPage = ref(0)
        // 控制每次循环5个页码
        let page_number_five = reactive([])
        // 每页放的数量
        let pageSize = ref(6)
        // 当前页的数据
        let showData = reactive([])
        // 存储六个一组的数据得数组
        let pageData = reactive([])
        let pageNum = ref(0)
        // 获取高度,判断数据是否大于三个，如果大于三个，height占比不一样
        let numbet_data = ref(0)
        //初始化数据
        function init() {
            // 如果只有一页或者都没有，两边都没有点击
            if (pageNum.value == 1) {
                page_stop_style.style_2 = 'page_stop'
            }
            // 初始化页面共5个页码
            if (pageNum.value <= 5) {
                // page_number_five.value = pageNum.value
                for (let i = 1; i <= pageNum.value; i++) {
                    page_number_five.push(i)
                }
            } else {
                for (let i = 1; i <= 5; i++) {
                    page_number_five.push(i)
                }
            }
            showData.splice(0, showData.length)
            showData.push(pageData[currentPage.value])
            for (let i = 0; i < showData.length; i++) {
                numbet_data.value++
            }
        }
        //点击页数
        function page_click(val) {
            currentPage.value = val - 1
            //  发请求或取数据
            axios_second()
        }
        // 上一页
        function lastPage() {
            if (page_stop_style.style1 =='page_stop'){
                return;
            }
                // 页面页码变化
                if (page_number_five.length >= 5) {
                    if (currentPage.value + 1 == page_number_five[0]) {
                        page_number_five.splice(0, showData.length)
                        for (let i = currentPage.value; i <= currentPage.value + 4; i++) {
                            page_number_five.push(i)
                        }
                    }
                }
            if (currentPage.value == 0) {
                // alert('没有上一页了')
                return
            } else {
                page_stop_style.value = ''
                currentPage.value--
                //  发请求或取数据
                axios_second()

            }
        }
        // 下一页
        function nextPage() {
            if (page_stop_style.style_2 == 'page_stop') {
                return;
            }
            // 页数变化
            if (page_number_five.length >= 5) {
                if (currentPage.value + 1 == page_number_five[4]) {
                    page_number_five.splice(0, showData.length)
                    for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
                        page_number_five.push(i)
                    }
                }
            }
            if (currentPage.value == pageNum.value - 1) {
                // alert('没有下一页了')
                return
            } else {
                page_stop_style.value = ''
                currentPage.value++
                // 发请求或取数据
                axios_second()
            }
        }
        function chechWindowSize() {
            // showDataFinlly
            if (window.innerWidth > 900) {
                // console.log('111')
                showDataFight.value = true
            } else {
                // console.log('222')
                showDataFight.value = false
            }
        }
        // 宽度<900,显示更多
        function small_width_click() {
            let word_fight = 0;
            let page_num = 0;
            // 进行遍历
            for (var i = 0; i < pageNum.value; i++) {
                if (pageData[i] == undefined) {
                    // 记录i
                    // console.log(i,'1')
                    word_fight = 1;
                    page_num = i
                    break
                }
                // console.log(i,'2')
            }
            if (word_fight) {
                // 调用第二次函数，并把页数更新(currentPage.value==pageNum)
                currentPage.value = page_num
                axios_second()
            } else {
                // 遍历完成如果都有数据
                small_width_click_word.value = '已经到底了'
            }
        }
        // 第n次获取数据的axios
        async function axios_second_nei() {
            let message2 = {
                type: props.Msg
            }
            const res = await perInfoAPI(currentPage.value + 1, message2)
            if (res.code == 0) {
                if (pageData[currentPage.value] != undefined) {
                    // 不存，已经有数据
                    // 清空
                    showData.splice(0, showData.length)
                    // console.log(pageData[currentPage.value])
                    showData.push(...(pageData[currentPage.value]))
                    // 控制高度
                    numbet_data.value = 0
                    for (let i = 0; i < showData.length; i++) {
                        numbet_data.value++
                    }
                } else {
                    if (res.data) {
                        pageData[currentPage.value] = res.data.numbers
                    }
                    // 清空
                    showData.splice(0, showData.length)
                    // console.log(pageData[currentPage.value])
                    showData.push(...(pageData[currentPage.value]))
                    // 控制高度
                    numbet_data.value = 0
                    for (let i = 0; i < showData.length; i++) {
                        numbet_data.value++
                    }
                    // 为宽度<900 做准备
                    let arr_1 = []
                    arr_1.push(pageData[currentPage.value])

                    for (var j = 0; j < arr_1.length; j++) {
                        data_info.push(...arr_1[j])
                    }
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //后期获取数据，上下页，点击某一页 
        function axios_second() {
            // 发送请求，获取数据
            axios_second_nei()

        }
        //// 第一次请求数据
        async function axios_first() {
            let message1 = {
                type: props.Msg
            }
            const res = await perInfoAPI(1, message1)
            if (res.code == 0) {
                if (res.code.data) {
                    // 获取总页数，强制类型转换+res.data.data.Number或parseInt(str, 10)，10表示十进制
                    pageNum.value = Math.ceil(+res.data.number / pageSize.value) || 1
                    pageData[0] = res.data.numbers

                    init();
                    // 为宽度<900 做准备
                    let arr_1 = []
                    arr_1.push(pageData[0])

                    for (var j = 0; j < arr_1.length; j++) {
                        data_info.push(...arr_1[j])
                    }
                } else {
                    small_width_click_word.value = '已经到底了'
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            // if (!pageNum.value) {
            //     page_stop_style.style1 = 'page_stop'
            //     page_stop_style.style_2 = 'page_stop'
            // }
            // init();
            chechWindowSize()
            window.addEventListener('resize', chechWindowSize)
            // 发送第一次数据
            axios_first()

        })
        onUpdated(() => {
            if (pageNum.value == 1) {
                // page_stop_style.style_2 = 'page_stop'
                if (currentPage.value == 0) {
                    page_stop_style.style1 = 'page_stop'
                    page_stop_style.style_2 = 'page_stop'
                } else {
                    page_stop_style.style1 = ''
                    page_stop_style.style_2 = ''
                }
            }
            else {
                // 是否禁止点击
                if (currentPage.value == 0) {
                    page_stop_style.style1 = 'page_stop'
                    page_stop_style.style_2 = ''
                } else if (currentPage.value == pageNum.value - 1) {
                    page_stop_style.style_2 = 'page_stop'
                    page_stop_style.style1 = ''
                } else {
                    page_stop_style.style1 = ''
                    page_stop_style.style_2 = ''
                }
            }
        })
        return {
            data_info,
            pageSize,
            pageNum,
            showData,
            currentPage,
            numbet_data,
            page_click,
            lastPage,
            nextPage,
            page_stop_style,
            showDataFight,
            page_number_five,
            small_width_click,
            small_width_click_word,
        }
    }
}
</script>

<style scoped>
.box_main {
    /* overflow-y: auto; */
    height: 100%;
    display: flex;
    flex-direction: column;
}

.box_con {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    row-gap: 3%;
    column-gap: 2%;
    /* height: 100%; */
    flex: 1;
}

.r_box_ne_height {
    height: 45% !important;
}

.r_box_nei {
    grid-area: auto/auto/auto/ span 4;
    /* 大于三个*/
    height: 90%;
    /* 小于三个 */
    /* height:40%; */
    background-color: rgb(39, 37, 37);
    border: 8px solid rgba(103, 99, 99, 0.6);
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0px 10px;
    border-radius: 5px;
}

.r_box_nei p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.box_bottom {
    height: 80px;
    position: relative;
    /* background-color:blue; */
}

/*  */
.page_box {
    width: auto;
    position: absolute;
    height: 40px;
    /* background-color: aquamarine; */
    right: 10px;
    top: 20px;
    display: flex;
    gap: 10px;
}

.page_stop {
    background-color: #9c9191 !important;
    cursor: not-allowed !important;
}

.page_box div {
    height: 35px;
    width: 35px;
    border-radius: 3px;
    background-color: #666060;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.page_box p {
    font-size: 16px;
    height: 35px;
    line-height: 35px;
    color: rgba(246, 241, 226, 0.729);
}

.page_number {
    color: rgb(76, 172, 246) !important;
}

.iconfont {
    font-size: 25px;
    color: #9c9191;
    /* margin-right:20px; */
}

.box_bottom_2 {
    display: none;
}

@media (max-width:900px) {
    .box_con {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 350px;
        gap: 15px;
    }

    .r_box_nei {
        margin: 0 auto;
        width: 300px;
        height: 200px;
    }

    .r_box_ne_height {
        height: 200px !important;
    }

    .box_bottom {
        display: none;
    }

    .box_bottom_2 {
        display: block;
        text-align: center;
        cursor: pointer;
        margin: 20px auto 0;
        height: 40px;
        line-height: 40px;
        width: 330px;
        background-color: #474343;
        border-radius: 5px;
        color: rgb(236, 144, 193);
    }
}
</style>
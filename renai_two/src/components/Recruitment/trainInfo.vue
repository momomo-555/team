<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-21 20:43:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 16:58:41
 * @FilePath: \renai_two\src\components\Recruitment\trainInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="train_main_box">
        <div class="train_box">
            <div class="box box1" v-show="data_arr[0]">
                <div class="box_nei">
                    <div class="box_nei_con" style="flex: 0.5;text-align:center">
                        <h2>迎新群</h2>
                        <p class="con_p">{{ data_arr[0].value }}</p>
                    </div>
                    <div v-show="data_arr[0].id" class="box_nei_con"
                        style="flex: 1;text-align:center;font-size:14px;color:crimson;">
                        <img v-show="data_arr[0].id"
                            :src="`http://106.14.30.173:8081/api/reception/get/picture/${data_arr[0].id}`"
                            style="cursor:pointer" @click="img_look">
                        点击图片可查看原图
                    </div>
                </div>
            </div>
            <div class="box box2" v-show="data_arr[1]">
                <div class="box_nei">
                    <div class="box_nei_con box_nei_con_2" style="flex: 2;text-align:center">
                        <h2>培训时间</h2>
                        <!-- 解析字符串中的html表签 -->
                        <div v-html="html_con" class="con_p">
                        </div>
                    </div>
                    <div class="box_nei_con" style="flex: 3;">
                        <img v-show="data_arr[1].id"
                            :src="`http://106.14.30.173:8081/api/reception/get/picture/${data_arr[1].id}`">
                    </div>
                </div>
            </div>
            <div class="box box3" v-show="data_arr[2]">
                <div class="box_nei">
                    <div class="box_nei_con box_nei_con_3" style="flex: 0.6;text-align:center">
                        <h2>培训地点</h2>
                        <p class="con_p">{{ data_arr[2].value }}</p>
                    </div>
                    <div class="box_nei_con" style="flex: 1;">
                        <img v-show="data_arr[2].id"
                            :src="`http://106.14.30.173:8081/api/reception/get/picture/${data_arr[2].id}`">
                    </div>
                </div>
            </div>
            <div class="box box4" v-show="data_arr[3]">
                <div class="box_nei">
                    <div class="box_nei_con" style="flex: 1;">
                        <h2 style="text-align:center">注意事项</h2>
                        <textarea class="con_p con_texarea" style="text-align:start;">{{ data_arr[3].value }}</textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="img_wai" v-show="img_fight">
        <span class="iconfont icon-chahao" @click="img_cloce"></span>
        <img :src="`http://106.14.30.173:8081/api/reception/get/picture/${data_arr[0].id}`">
    </div>
</template>

<script>
import '@/assets/fonts/souSuo/iconfont.css'
import { trainInfoAPI } from '@/api/pageMessage'
import { mapStatus } from '@/utils'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'trainInfo',
    setup() {
        // 接收培训时间的字符串用v-html将其转化为html格式
        let html_con = ref(null)
        // 存储所有数据
        let data_arr = reactive([{ value: '', id: '' }, { value: '', id: '' }, { value: '', id: '' }, { value: '', id: '' }])
        // let data_arr_2 = []
        // let data_arr_3 = reactive([])
        // 图片是否显示
        let img_fight = ref(false)
        //查看图片 
        function img_look() {
            img_fight.value = true;
        }
        function img_cloce() {
            img_fight.value = false;
        }
        async function axios_message() {
            const res = await trainInfoAPI()
            if (res.code == 0) {
                if (res.data) {
                    // console.log(res.data['迎新群'])
                    // res.data.forEach(item => {
                    //     data_arr_3.push(item)
                    // })
                    data_arr[0] = res.data['迎新群']
                    data_arr[1] = res.data['培训时间']
                    data_arr[2] = res.data['培训地点']
                    data_arr[3] = res.data['注意事项']
                } else {
                    ElMessage('没有数据')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message()
        })
        return {
            html_con,
            img_look,
            img_fight,
            img_cloce,
            data_arr,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.img_wai {
    position: fixed;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.9);
    top: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.img_wai img {
    width: 500px;
    height: 500px;
}

.icon-chahao {
    font-size: 50px;
    font-weight: 500;
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 5px;
    color: white;
}

.train_main_box {
    width: 80%;
    /* 6vh */
    margin: 40px auto 0;
    /* background-color: aqua; */
}

.train_box {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}

.box {
    /* border-radius:30px; */
    background-color: #2e2b2b;
    height: 32vh;
    grid-area: auto/auto/auto/span 6;
    /* text-align: center; */
    /* border:1px solid #797575; */
    /* 子盒子居中 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.box1 {
    border-top: 1px solid #797575;
    border-left: 1px solid #797575;
    /* border-bottom:1px solid #797575;
    border-right:1px solid #797575; */
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
    /* border-right: 1px dashed #889643;
    border-bottom: 1px dashed #a2a760; */
}

.box2 {
    border-top: 1px solid #797575;
    border-right: 1px solid #797575;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;

}

.box3 {
    border-left: 1px solid #797575;
    border-bottom: 1px solid #797575;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%
}

.box4 {
    border-right: 1px solid #797575;
    border-bottom: 1px solid #797575;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
}

.box_nei {
    display: flex;
    /* gap: 15px; */
    height: 20vh;
    width: 70%;
    margin: auto;
}

.box_nei_con {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box_nei_con h2 {
    color: rgb(163, 87, 102);
}

.con_texarea {
    outline: none;
    resize: none;
    text-align: left;
    /* overflow: hidden; */
    padding: 10px;
    /* #636060 */
    /* #467a62 */
    border: 2px dashed #467a62;
    background-color: #2e2b2b;
    color: #e2e2e2;
    font-size: 16px;
    margin-bottom: 8px;
}

.con_p {
    width: 100%;
    margin-top: 2vh;
    flex: 1;
}

.box_nei img {

    max-width: 100%;
    max-height: 100%;
}

@media (max-width: 1000px) {
    .box {
        grid-area: auto/auto/auto/span 12;
        border-radius: 5px;
        border: 1px solid #797575;
        height: 280px;
        margin-bottom: 30px;
    }

    .box_nei {
        width: 80%;
        height: 75%;
        /* display: grid;
        grid-template-columns: repeat(12, 1fr); */
    }

    .box_nei_con_2 {
        margin-right: 10px;
    }

    .box_nei_con_3 {
        margin-right: 20px;
    }

    .con_p {
        margin-top: 40px;
        font-size: 14px;
    }

    .img_wai img {
        width: 300px;
        height: 300px;
    }

    .icon-chahao {
        font-size: 60px;
    }
}
</style>
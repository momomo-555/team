<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-24 09:56:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 13:24:11
 * @FilePath: \renai_two\src\components\Information\mainDirection.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="direction_main_box">
        <div style="position:relative;flex:1;">
            <div class="direction_box" :class="showDiv == index ? 'direction_box_2' : ''"
                v-for="(item, index) in arr_data" :key="index">
                <div class="margin_box" style="display:flex;margin:0 auto;width:85%;">
                    <div class="box_con_l"><img v-show="item.id" :src="`http://106.14.30.173:8081/api/reception/get/picture/${item.id}`"></div>
                    <div class="box_con_r">
                        <h2 style="color:cadetblue">{{ item.name }}</h2>
                        <p>{{ item.introduce }}</p>
                    </div>
                </div>
            </div>
            <span class="iconfont l icon-xiangzuo1" @click="LastFun()"></span>
            <span class="iconfont r icon-xiangyou1" @click="NextFun()"></span>
        </div>
        <div class="direction_bottom">{{ showDiv + 1 }} / {{ arr_data.length }}</div>
    </div>
</template>

<script>
import { mainDirectionAPI } from '@/api/pageMessage'
import { mapStatus } from '@/utils'
import { ref, reactive, onMounted } from 'vue'
import '@/assets/fonts/souSuo/iconfont.css'
export default {
    name: 'mainDirection',
    setup() {
        // 当前显示的盒子
        let showDiv = ref(0)
        // 总数据
        let arr_data = reactive([])
        // 下一页
        function NextFun() {
            if (showDiv.value == arr_data.length - 1) {
                showDiv.value = 0
            } else {
                showDiv.value++
            }
        }
        // 上一页
        function LastFun() {
            if (showDiv.value == 0) {
                showDiv.value = arr_data.length - 1
            } else {
                showDiv.value--
            }
        }
        //发请求
        async function axios_message() {
            const res = await mainDirectionAPI()
            if (res.code == 0) {
                if (res.data) {
                    res.data.forEach(item => {
                        arr_data.push(item)
                    })
                } else {
                    ElMessage('没有数据')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            // 获取信息
            axios_message()
        })
        return {
            showDiv,
            arr_data,
            LastFun,
            NextFun,
        }
    }
}
</script>

<style scoped>
.iconfont {
    color: rgba(180, 174, 174, 0.6);
    /* font-size: 88px; */
    font-size: 7vw;
    cursor: pointer;
}

.r {
    position: absolute;
    top: 30%;
    right: 1px;
    /* right:0.001vw; */
}

.l {
    position: absolute;
    top: 30%;
    left: 1px;
    /* left:0.001vw; */
}

.direction_box {
    height: 100%;
    width: 100%;
    /* z-index: 0; */
    display: none;
}

.direction_box_2 {
    /* z-index:1 !important; */
    display: flex !important;
}

.box_con_l {
    flex: 1;
    /* width:50%; */
    margin-right: 10px;
}

.box_con_r {
    flex: 1;
    /* width:50%; */
    font-size: 1.6vw;
    /* background-color:darksalmon; */
}

.direction_box img {
    width: 100%;
    height: 100%;
}

.direction_box p {
    color: rgba(208, 52, 83, 0.672);
}

.direction_main_box {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.direction_bottom {
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: rgba(195, 189, 189, 0.8);
    /* font-size:25px; */
    font-size: 2.3vw;
    margin-bottom: 5px;
}
</style>
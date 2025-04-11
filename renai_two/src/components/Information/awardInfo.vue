<template>
    <div class="award_box">
        <!-- 首次加载 -->
        <!-- width<970 -->
        <div v-if="widthFight" class="award_conBox" v-for="(item, index) in arr_data" :key="index">
            <p class="span2">名字：{{ item.name }}</p>
            <p class="span2">年份：{{ item.time }}</p>
            <p class="span2">奖项：{{ item.awards }}</p>
        </div>
        <!-- width>970 -->
        <div v-else class="award_conBox" v-for="(item, index1) in arr_data" :key="index1">
            <span class="span1" style="width: 20%; display: inline-block">名字：{{ item.name }}</span>
            <span class="span1" style="width: 16%; display: inline-block">年份：{{ item.time }}</span>
            <span class="span1" style="width: 60%; display: inline-block">奖项：{{ item.awards }}</span>
        </div>
        <!-- 二次加载 -->
        <!-- width<970 -->
        <div v-if="widthFight" class="award_conBox" v-for="(item, index) in arr_data_2" :key="index">
            <p class="span2">名字：{{ item.name }}</p>
            <p class="span2">年份：{{ item.time }}</p>
            <p class="span2">奖项：{{ item.awards }}</p>
        </div>
        <!-- width>970 -->
        <div v-else class="award_conBox" v-for="(item, index1) in arr_data_2" :key="index1">
            <span class="span1" style="width: 20%; display: inline-block">名字：{{ item.name }}</span>
            <span class="span1" style="width: 16%; display: inline-block">年份：{{ item.time }}</span>
            <span class="span1" style="width: 60%; display: inline-block">奖项：{{ item.awards }}</span>
        </div>
        <div class="award_bottom" v-show="bottom_show">
            --- 已经到底了---
        </div>
        <div class="award_bottom_2" v-show="!bottom_show" @click="second_click">
            ⤓ 加载更多
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { awardInfoAPI } from '@/api/pageMessage'
import { mapStatus } from '@/utils'
export default {
    name: 'awardInfo',
    setup() {
        // 存储第二次加载的数据
        let arr_data_2 = reactive([])
        // 存储第一次加载的数据
        let arr_data = reactive([])
        // 底部显示
        let bottom_show = ref(false)
        // 发情求判断加载次数
        let loading_num = ref(0)
        // 判断宽度小于970
        let widthFight = ref(true)
        function chechWindowSize() {
            widthFight.value = window.innerWidth <= 970
        }
        // 二次加载触发事件
        function second_click() {
            scendLoading()
        }
        // 二次加载请求
        async function scendLoading(){
            loading_num.value++
            let i = 0;
            const res = await awardInfoAPI(loading_num.value)
            if(res.code==0){
                if (res.data) {
                    res.data.PrizeList.forEach(item => {
                        arr_data_2.push(item)
                        i++;
                    })
                    if (i < 6) {
                        bottom_show.value = true
                        return
                    }
                } else {
                    ElMessage('没有数据')
                    bottom_show.value = true
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //初次加载请求
        async function firstLoading() {
            let i = 0;
            loading_num.value++
            const res = await awardInfoAPI(1)
            if (res.code == 0) {
                if(res.data){
                    res.data.PrizeList.forEach(item=>{
                        arr_data.push(item)
                        i++;
                    })
                    if(i<6){
                        bottom_show.value = true
                        return
                    }
                }else{
                    ElMessage('没有数据')
                    bottom_show.value = true
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            chechWindowSize()
            window.addEventListener('resize', chechWindowSize)
            firstLoading()
        })
        return {
            widthFight,
            bottom_show,
            arr_data,
            arr_data_2,
            second_click,
        }
    }
}
</script>

<style scoped>
.award_box {
    /* overflow-y: auto; */
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.award_conBox {
    padding: 15px 0px;
    width: 100%;
    background-color: rgba(83, 78, 78, 0.321);
    border-radius: 2px;
    font-size: 20px;
    border: 5px solid rgba(103, 100, 100, 0.8);
}

.award_conBox .span1 {
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.award_conBox .span2 {
    margin: 0 10px;
    overflow-wrap: break-word;
}

.award_bottom {
    text-align: center;
    font-size: 20px;
    color: rgb(245, 124, 185);
    margin-bottom: 15px;
}

.award_bottom_2 {
    text-align: center;
    font-size: 20px;
    color: rgb(245, 124, 185);
    /* margin-bottom: 15px; */
    cursor: pointer;
    padding: 15px 0px;
    width: 100%;
    background-color: rgba(70, 65, 65, 0.321);
    border-radius: 2px;
}
</style>
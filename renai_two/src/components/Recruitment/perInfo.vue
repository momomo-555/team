<template>
    <div class="container ">
        <div class="row gap15">
            <div class="col-xl-3 col-lg-4 col-md-6 box" v-for="(item, index) in arr_data" :key="index">
                <p>姓名&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
                <p>姓别&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.sex }}</p>
                <p>Q&nbsp;Q&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.qq }}</p>
                <p>年级&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.grade }}</p>
            </div>
            <!-- <div class="col-xl-3 col-lg-4 col-md-6 box">2</div>
                <div class="col-xl-3 col-lg-4 col-md-6 box">3</div>
                <div class="col-xl-3 col-lg-4 col-md-6 box">4</div>
                <div class="col-xl-3 col-lg-4 col-md-6 box">5</div>
                <div class="col-xl-3 col-lg-4 col-md-6 box">6</div> -->
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { perInfoAPI } from '@/api/pageMessage'
import { mapStatus } from '@/utils'
export default {
    name: 'perInfo',
    setup() {
        // 存储所有的数据
        let arr_data = reactive([])
        async function axios_message() {
            let data = {
                type: '大二'
            }
            const res = await perInfoAPI(1,data)
            if (res.code == 0) {
                if (res.data) {
                    res.data.numbers.forEach(item => {
                        arr_data.push(item)
                    })
                } else {
                    ElMessage('没有信息')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message()
        })
        return {
           //axios_fight,
            arr_data,
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1300px;
    margin: 30px auto 0;
}

.row {
    display: grid;
    grid-template-columns: repeat(12, 1fr)
}

.gap15 {
    gap: 15px;
}

.box {
    background: #2e2e2e;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px 25px;
    border-radius: 10px;
    border: 10px solid rgba(150, 144, 144, 0.6);
    font-size: 18px;
}

.col-xl-3 {
    grid-area: auto/auto/auto/span 3;
}

@media (max-width:1408px) {
    .container {
        max-width: 950px;
    }

    .col-lg-4 {
        grid-area: auto/auto/auto/ span 4;
    }
}

@media(max-width:1080px) {
    .container {
        max-width: 700px;
    }

    .col-md-6 {
        grid-area: auto/auto/auto/ span 6;
    }
}

@media (max-width: 870px) {
    .row {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 350px;
    }
}
</style>

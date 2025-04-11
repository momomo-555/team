<template>
    <div class="Art_box">
        <router-link to="/Write/Article/Check">
            <div class="Art_state" @click="click_check" :class="state_style1">已审核</div>
        </router-link>
        <router-link to="/Write/Article/unCheck">
            <div class="Art_state" @click="click_uncheck" :class="state_style2">未审核</div>
        </router-link>
    </div>
    <div class="Art_center">
        <!-- <div class="Art_box1" v-show="check_fight1">
            <router-view name="check"></router-view>
        </div>
        <div class="Art_box1" v-show="check_fight2">
            <router-view name="unCheck"></router-view>
        </div> -->
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
export default {
    name: 'Article',
    setup() {

        let state_style1 = ref('state_style')
        let state_style2 = ref('')
        let check_fight1 = ref(true)
        let check_fight2 = ref(false)
        function click_check() {
            check_fight1.value = true;
            check_fight2.value = false;
            state_style1.value = 'state_style'
            state_style2.value = ''
        }
        function click_uncheck() {
            check_fight1.value = false;
            check_fight2.value = true;
            state_style1.value = ''
            state_style2.value = 'state_style'
        }
        onMounted(() => {
            // 进来跳转已审核界面
            // router.push('/B_Write/Article/check')
        })
        return {
            check_fight1,
            check_fight2,
            state_style1,
            state_style2,
            click_check,
            click_uncheck,
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #e2e2e2;
}

.Art_box {
    height: 50px;
    display: flex;
    line-height: 50px;
    /* margin: 5px; */
    cursor: pointer;

}

.state_style {
    color: aqua;
}

.Art_box .Art_state {
    font-size: 20px;
    margin-left: 15px;
}

.Art_center {
    width: 100%;
    /* min-height:100vh */
}
</style>
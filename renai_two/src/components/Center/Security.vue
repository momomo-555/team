<template>
    <div class="Con_box">
        <span>邮箱</span>
        <div @click="click_edit1">
            <span class="iconfont icon-bianji"></span>
            <span style="margin-left:5px; color:#92c6f7;">修改</span>
        </div>
    </div>
    <Model :Msg="emailMsg" @child-parent="handle_child"></Model>

    <div class="Con_box">
        <span>密码</span>
        <div @click="click_password">
            <span class="iconfont icon-bianji"></span>
            <span style="margin-left:5px; color:#92c6f7;">修改</span>
        </div>
    </div>
    <Model_password :Msgpass="passwordMsg" @child-parent-pa="handle_child_pa"></Model_password>

    <div class="Con_box">
        <span>注销账户</span>
        <div @click="click_cancel">
            <span class="iconfont icon-zhuxiao"></span>
            <span style="margin-left:5px; color:rgb(251, 70, 70);">注销</span>
        </div>
    </div>
    <Model_cancel :Msgcel="cancelMsg" @child-parent-cel="handle_child_cel"></Model_cancel>
</template>

<script>
import '@/assets/fonts/souSuo/iconfont.css'
import Model from './Model.vue'
import Model_password from './Model_password.vue'
import Model_cancel from './Model_cancel.vue'
import { ref } from 'vue'
export default {
    name: 'Security',
    components: { Model, Model_password, Model_cancel },
    setup() {
        let emailMsg = ref(false)
        function click_edit1() {
            emailMsg.value = true
        }
        function handle_child(val) {
            emailMsg.value = val
        }
        let passwordMsg = ref(false)
        function click_password() {
            passwordMsg.value = true
        }
        function handle_child_pa(val) {
            passwordMsg.value = val
        }
        let cancelMsg = ref(false)
        function click_cancel() {
            cancelMsg.value = true
        }
        function handle_child_cel(val) {
            cancelMsg.value = val
        }
        return {
            emailMsg,
            click_edit1,
            handle_child,
            passwordMsg,
            click_password,
            handle_child_pa,
            cancelMsg,
            click_cancel,
            handle_child_cel,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.Con_box {
    cursor: pointer;
    height: 90px;
    color: #d5c9c9;
    line-height: 90px;
    font-size: 20px;
    margin: 0 20px;
    display: flex;
    border-bottom: 1px solid #827b7b;
    justify-content: space-between;
}

.icon-bianji {
    font-size: 20px;
    /* color: #56a9f6; */
    color: #92c6f7;
}

.icon-zhuxiao {
    font-size: 20px;
    color: rgb(251, 70, 70);
}

.model_wai {
    z-index: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.model_1 {
    z-index: 2;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-45%, -50%);
    background-color: #ffffffd8;
    height: 300px;
    width: 600px;
    border-radius: 4px;
}

.model_header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #aaa1a1;
}
</style>
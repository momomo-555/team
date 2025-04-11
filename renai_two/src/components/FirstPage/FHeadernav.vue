<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-03-03 12:55:24
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-11-14 15:45:46
 * @FilePath: \renai_3\src\components\FHeadernav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <router-link :to='page' active-class="active">
        <a @mouseover="fight = true" @mouseout="fight = false" @click="fight = false">{{ name }}
            <div class="div_style" v-show="fight && Ename">{{ Ename }}</div>
        </a>
    </router-link>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'FHeadernav',
    props: ['name', 'Ename', 'msg', 'Emsg', 'page'],
    setup(props) {
        let fight = ref(false)
        // function navClick(){
        //     fight = false;
        // }
        return {
            fight,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    color: #cdcdcd;
}

a:hover {
    color: #fff;
}

a {
    text-decoration: none;
    /* line-height:40px; */
    position: relative;
}

.div_style {
    position: absolute;
    top: 33px;
    left: -15px;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    padding: 5px 0;
    line-height: 20px;
    color: #333;
    background-color: #fff;
    border-radius: 3px;
}

.div_style::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -16px;
    left: 43%;
    border: 8px solid #000;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
}

@media screen and (max-width:800px) {
    a {
        font-size: 15px;
    }
}
</style>
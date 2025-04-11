<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-17 18:46:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-17 18:47:16
 * @FilePath: \renai_two\src\views\error\404.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <h1>404 NOT FOUND</h1>
</template>

<script>
import {onMounted} from 'vue'
export default {
    name: '404',
    setup(){
        onMounted(()=>{
            ElMessage.error('路径不存在......')
        })
        return{

        }
    }
}
</script>

<style></style>
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-17 13:32:16
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 10:14:45
 * @FilePath: \renai_two\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-link to="/"></router-link>
  <router-view></router-view>
</template>

<script>
import { mapStatus } from '@/utils'
import { onMounted } from 'vue'
export default {
  name: 'App',
  components: {
  },
  setup() {
    onMounted(() => {
      // console.log(mapStatus.has(0))
    })
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}


</style>

<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 15:44:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 18:12:23
 * @FilePath: \renai_admin_two\src\views\Home\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container class="home-content">
        <!-- 侧边 -->
        <Aside></Aside>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <Header></Header>
            </el-header>
            <!-- 主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <!-- 标签页，setup中也是为了标签页做准备的 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import  Aside from '@/components/Home/Aside.vue'
import Header from '@/components/Home/Header.vue'
export default {
    name: 'Home',
    components: { Header, Aside }
}
</script>

<style scoped>
.home-content {
    height: 100%;
    min-width: 1200px;
}

.el-header {
    /* background: #fff; */
    background-color: rgb(48, 65, 86)
}

.el-main {
    background: rgb(242, 243, 245);
}
</style>

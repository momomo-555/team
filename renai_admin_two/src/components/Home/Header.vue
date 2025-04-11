<template>
    <div class="header_main">
        <div class="toggle-button">
            <span class="iconfont icon-caidanzhedie" @click="toggleMenu"></span>
            <div style="margin-left: 20px;">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item :to="item.path" v-for="item in pathList" :key="item.id">{{ item.meta.title
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div style="position:relative" @mouseover="fight = true" @mouseout="fight = false" @click="fight = false">
            <img style="cursor:pointer;height:50px;width:50px;margin-top:5px;margin-right:20px;"
                src="../../assets/imgs/logo.png" alt="">
            <div class="out_login" v-show="fight" @click="login_out">退出登录</div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
import { outLoginAPI } from '@/api/user'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
export default {
    name:'Header',
    setup(){
        // 创建路由示例
        const route = useRoute()
        // 创建渲染数组
        const pathList = ref()
        // vuex
        const store = useStore();

        let fight = ref(false)
        // 退出登录
        async function login_out() {
            const res = await outLoginAPI()
            if(res.cdoe==0){
                ElMessage.success('退出成功')
                router.push('/Login')
            }else{
                ElMessage.error('退出失败')
            }
            // router.push('/Login')
        }
        // 切换菜单的展开与折叠
        function toggleMenu() {
            // 通过触发一个mutation来改变fight的状态
            store.commit('toggleFight');
        }
        // 路由--面包屑
        //该函数被调用以获取匹配的路由信息，并相应地更新pathList.value变量。
        const getCurrentPath = () => {
            //route.matched包含了当前匹配的嵌套路径片段的路由记录（route records）
            // console.log(route.matched);
            pathList.value = route.matched.filter(item => item.meta && item.meta.title);
        }
        onMounted(() => {
            getCurrentPath();
        })
        watch(route, (to, from) => {
            pathList.value = to.matched.filter(item => item.meta && item.meta.title);
        }, { immediate: true });

        return{
            fight,
            login_out,
            toggleMenu,
            pathList,
        }
    }
}
</script>

<style scoped>
.el-breadcrumb {
    font-size: 20px;
    color: #fff !important;
}

.el-breadcrumb_item span {
    color: #fff !important;
}

.header_main {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}

.out_login {
    position: absolute;
    top: 62px;
    left: -12px;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    padding: 8px 1px;
    line-height: 20px;
    color: #333;
    background-color: #fff;
    border-radius: 3px;
    font-size: 16px !important;
    text-align: center;
    cursor: pointer;
}

.out_login::before {
    content: '';
    width: 0;
    height: 0;
    /* font-size:13px !important; */
    position: absolute;
    top: -16px;
    left: 43%;
    border: 8px solid #000;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
}

.toggle-button {
    display: flex;
    align-items: center;
}

.icon-caidanzhedie {
    color: #fff;
    font-size: 30px;
    cursor: pointer;
}
</style>
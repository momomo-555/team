<template>
  <el-aside :width="isFighting ? '64px' : '200px'">
    <div style="text-align: center;height:60px">
      <h2 style="color:#fff;line-height:70px;">仁爱工作室</h2>
    </div>
    <!-- 侧边栏菜单区 -->
    <el-menu active-text-color="#409fff" background-color="rgb(48, 65, 86)" text-color="#fff" style="text-align:center"
      :unique-opened="true" :collapse="isFighting" :collapse-transition="false" :router="true"
      :default-active="navState">
      <!-- 首页 -->
      <el-menu-item :index="'Welcome'">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <!-- <span class="iconfont icon-shouyebeifen" style="margin-right:5px;"></span> -->
        <span>首页</span>
      </el-menu-item>
      <!--2.用户管理  -->
      <el-sub-menu index="2">
        <template #title>
          <!-- <span class="iconfont icon-yonghuguanli" style="margin-right:5px;"></span> -->
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="normalUsers">
          <span class="iconfont icon-zhuanzhengshenqing" style="margin-right:3px;font-size:18px"></span>
          <span>正常用户</span>
        </el-menu-item>
        <el-menu-item index="registerUsers">
          <span class="iconfont icon-zhuceyonghu" style="margin-right:3px; font-size:15px"></span>
          <span>正在注册</span>
        </el-menu-item>
        <!-- <el-menu-item index="logoutUsers">
          <span class="iconfont icon-zhuxiaoyonghu" style="margin-right:3px; font-size:20px"></span>
          <span>注销用户</span>
        </el-menu-item> -->
        <el-menu-item index="blockUsers">
          <span class="iconfont icon-a-zhuxiaoyonghu1" style="margin-right:3px;font-size:18px"></span>
          <span>黑名单</span>
        </el-menu-item>
      </el-sub-menu>
      <!-- 3.信息管理 -->
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <Comment />
          </el-icon>
          <!-- <span class="iconfont icon-xinxi" style="margin-right:5px;"></span> -->
          <span>信息管理</span>
        </template>
        <el-sub-menu index="1-1">
          <template #title>
            <span class="iconfont icon-shouyexinxi" style="margin-right:5px;"></span>
            <span>首页信息</span>
          </template>
          <el-menu-item index="About">
            <span class="iconfont icon-guanyuwomen" style="margin-right:0px;font-size:20px;"></span>
            <span>关于我们</span>
          </el-menu-item>
          <el-menu-item index="learnStyle">
            <span class="iconfont icon-xuexifangshisheding" style="margin-right:5px;font-size:12px;"></span>
            学习方式</el-menu-item>
          <el-menu-item index="Location">
            <span class="iconfont icon-weizhi-xianxing" style="margin-right:5px;"></span>
            社团位置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-2">
          <template #title>
            <span class="iconfont icon-zhaoshangjiameng" style="margin-right:5px;"></span>
            <span>社团招新</span>
          </template>
          <el-menu-item index="recruitmentTime">
            <span class="iconfont icon-shijian" style="margin-right:5px;"></span>
            培训时间</el-menu-item>
          <el-menu-item index="recruitmentInfo">
            <span class="iconfont icon-peixunxinxichaxun" style="margin-right:5px;"></span>
            培训信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-3">
          <template #title>
            <span class="iconfont icon-jieshaoxinxi_o" style="margin-right:5px;"></span>
            <span>社团信息</span>
          </template>
          <el-menu-item index="mainDirection">
            <span class="iconfont icon-088" style="margin-right:5px;"></span>
            主攻方向</el-menu-item>
          <el-menu-item index="awardInfo">
            <span class="iconfont icon-huojiang" style="margin-right:5px;"></span>
            获奖信息</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <!-- 4.博客管理 -->
      <el-sub-menu index="4">
        <template #title>
          <!-- <span class="iconfont icon-boke" style="margin-right:5px;"></span> -->
          <el-icon>
            <Document />
          </el-icon>
          <span>博客管理</span>
        </template>
        <el-menu-item index="alreadyCheck">
          <span class="iconfont icon-yishenhe1" style="margin-right:3px;font-size:18px"></span>
          <span>已审核</span>
        </el-menu-item>
        <el-menu-item index="withoutCheck">
          <span class="iconfont icon-weishenhe1" style="margin-right:3px; font-size:15px"></span>
          <span>未审核</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
export default {
  name: 'Aside',
  setup() {
    // 创建路由实例
    const route = useRoute();
    // 菜单状态是否高亮
    const navState = ref('')
    const store = useStore();
    const isFighting=computed(()=>{
      return store.state.aside_fight
    })
    onMounted(() => {
      //从内存中获取
      if (sessionStorage.getItem('navState')) {
        navState.value = sessionStorage.getItem('navState')
      } else {
        navState.value = 'Welcome'
      }
    })
    onUnmounted(() => {
      // console.log('调用了')
      sessionStorage.setItem('navState', 'Welcome')
    })
    // 菜单状态是否高亮
    watch(route, (to, from) => {
      // console.log(to.path)
      // 带/会出现问题
      sessionStorage.setItem('navState', to.path.replace("/", ""))
      navState.value = sessionStorage.getItem('navState')

    })
    return {
      isFighting,
      navState,
    }
    return {

    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: rgb(48, 65, 86);
}

.el-menu {
  border-right: none;
}
</style>
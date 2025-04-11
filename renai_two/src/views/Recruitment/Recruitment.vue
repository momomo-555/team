<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-18 18:32:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-24 15:13:07
 * @FilePath: \renai_two\src\views\Recruitment\Recruitment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="R_box_wai">
    <header class="R_header">
      <!-- <firstHeader :msg="msg" :msg_ref="msg_ref" home_msg="首页">
        </firstHeader> -->
      <div v-if="fg2">
        <firstHeader msg="登录/注册" msg_ref="/Login" user="Recruit"></firstHeader>
      </div>
      <div v-else>
        <firstHeader msg="个人中心" msg_ref="/Center" user="Recruit"></firstHeader>
      </div>
    </header>
    <div class="R_box_con">
      <div style="width:100%;height:100%;position:relative">
        <div class="box1 box" v-if="show.fig1">
          <timeInfo></timeInfo>
        </div>
        <!-- 下 -->
        <span class="iconfont r icon-xiangyou1" v-show="show.fig1" @click="bottom_switch('信息')"></span>
        <div class="box2 box" v-if="show.fig2">
          <trainInfo></trainInfo>
        </div>
        <!-- 上下 -->
        <span class="iconfont l icon-xiangzuo1" v-show="show.fig2" @click="bottom_switch('时间')"></span>
        <span class="iconfont r icon-xiangyou1" v-show="show.fig2" @click="bottom_switch('人员')"></span>
        <div class="box3 box" v-if="show.fig3">
          <perInfo></perInfo>
        </div>
        <!-- 下 -->
        <span class="iconfont l icon-xiangzuo1" v-show="show.fig3" @click="bottom_switch('信息')"></span>
      </div>
    </div>
    <div class="R_box_bottom">
      <div class="bottom_box" :class="bot.time" @click="bottom_switch('时间')">培训时间</div>
      <div class="bottom_box" :class="bot.inf" @click="bottom_switch('信息')">培训信息</div>
      <div class="bottom_box" :class="bot.per" @click="bottom_switch('人员')">培训人员</div>
    </div>
  </div>
</template>

<script>
import { userUuidAPI } from '@/api/user'
import { mapStatus } from '@/utils'
import { useStore } from 'vuex'
import timeInfo from '@/components/Recruitment/timeInfo.vue'
import trainInfo from '@/components/Recruitment/trainInfo.vue'
import perInfo from '@/components/Recruitment/perInfo.vue'
import { ref, reactive, onMounted, onUnmounted, onUpdated } from 'vue'
import firstHeader from '@/components/FirstPage/firstHeader.vue'
export default {
  name: 'Recruitment',
  components: { firstHeader, timeInfo, trainInfo, perInfo },
  setup() {
    let fg2 = ref(true)
    const store = useStore()
    fg2.value = !store.state.loginFight

    let bot = reactive({
      time: 'bottom_box_style',
      inf: '',
      per: ''
    })
    let show = reactive({
      fig1: true,
      fig2: false,
      fig3: false,
    })
    function bottom_switch(val) {
      if (val == '时间') {
        bot.time = 'bottom_box_style'
        bot.inf = ''
        bot.per = ''
        show.fig1 = true
        show.fig2 = false
        show.fig3 = false
      } else if (val == '信息') {
        bot.time = ''
        bot.inf = 'bottom_box_style'
        bot.per = ''
        show.fig1 = false
        show.fig2 = true
        show.fig3 = false
      } else if (val == '人员') {
        bot.time = ''
        bot.inf = ''
        bot.per = 'bottom_box_style'
        show.fig1 = false
        show.fig2 = false
        show.fig3 = true
      }
    }
    //判断是否登录
    async function isLoging() {
      const res = await userUuidAPI()
      if (res.code == 2002 || res.code == 2003) {
        store.commit('loginFightToggle', false)
        fg2.value = !store.state.loginFight
        ElMessage('还没有登录呢')
      } else if (res.code == 0) {
        store.commit('loginFightToggle', true)
        fg2.value = !store.state.loginFight
      } else {
        store.commit('loginFightToggle', true)
        fg2.value = !store.state.loginFight
        ElMessage.error(mapStatus.get(res.code))
      }
    }
    onMounted(() => {
      isLoging()
    })
    return {
      fg2,
      bot,
      bottom_switch,
      show,
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* 防止滚动条出现 */
}

.R_box_wai {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #232222;
  /* background-color: #313131; */
  overflow: auto;
  display: flex;
  flex-direction: column;
}

/* 头 */
.R_header {
  position: sticky;
  top: 0;
  z-index: 2;
}

/* 内容 */
.R_box_con {
  flex: 1;
  background-color: #232222;
  margin-bottom: 30px;
}

.R_box_con .box {
  width: 100%;
  height: 100%;
  color: #e2e2e2;
}

.R_box_con .l {
  position: absolute;
  top: 40%;
  left: 1px;
}

.R_box_con .r {
  position: absolute;
  top: 40%;
  right: 1px;
}

.R_box_con .iconfont {
  color: rgba(180, 174, 174, 0.6);
  font-size: 60px;
  cursor: pointer;
}

/* 底部 */
.R_box_bottom {
  /* z-index:1; */
  position: sticky;
  bottom: 0;
  border-top: 2px solid #6e6767;
  width: 100%;
  display: flex;
  font-size: 23px;
  color: rgb(197, 189, 189);
  justify-content: space-around;
  background-color: #313131;
}

.R_box_bottom .bottom_box {
  padding: 17px 0;
  cursor: pointer;
}

.bottom_box_style {
  border-radius: 2px;
  border-top: 3px solid #e2e2e2;
}
</style>
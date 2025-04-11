<template>
  <div class="main_box">
    <header class="header_box">
      <firstHeader :msg="H_Msg.msg" :msg_ref="H_Msg.ref" user="Center">
      </firstHeader>
      <!-- <Suspense>
        <template #default>
          <firstHeader :msg="H_Msg.msg" :msg_ref="H_Msg.ref" user="Center">
          </firstHeader>
        </template>
</Suspense> -->
    </header>
    <main class="center_box">
      <nav class="l">
        <ul>
          <li style="color:azure;height:80px;line-height:80px; font-size:20px;font-weight:500">个人中心</li>
          <li @click="fig1_box(true, false, false, false)" :class="fig1 ? 'li_click_style' : ''">账户信息</li>
          <li @click="fig1_box(false, true, false, false)" :class="fig2 ? 'li_click_style' : ''">消息中心</li>
          <li @click="fig1_box(false, false, true, false)" :class="fig3 ? 'li_click_style' : ''">我的收藏</li>
          <li @click="fig1_box(false, false, false, true)" :class="fig4 ? 'li_click_style' : ''">安全中心</li>
        </ul>
      </nav>
      <div class="r">
        <div v-if="fig1">
          <Account></Account>
        </div>
        <div v-if="fig2">
          消息中心
        </div>
        <div v-if="fig3">
          <Collect></Collect>
        </div>
        <div v-if="fig4">
          <Security></Security>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Collect from '@/components/Center/Collect.vue'
import Account from '@/components/Center/Account.vue'
import Security from '@/components/Center/Security.vue'
import { ref, reactive } from 'vue'
export default {
  name: 'Center',
  components: { Account, Collect, Security },
  setup() {
    let H_Msg = reactive({
      msg: '个人中心',
      ref: '/Center'
    })
    let fig1 = ref(true)
    let fig2 = ref(false)
    let fig3 = ref(false)
    let fig4 = ref(false)
    function fig1_box(a, b, c, d) {
      fig1.value = a;
      fig2.value = b;
      fig3.value = c;
      fig4.value = d;
    }
    return {
      H_Msg,
      fig1,
      fig2,
      fig3,
      fig4,
      fig1_box,
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.main_box {
  /* #3f3d3d */
  background-color: #2e2e2e;
  min-width: 1260px;
  min-height: 100vh;
  transition: min-height 0.3s ease;
  display: flex;
  flex-direction: column;

}

.header_box {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
}

.center_box {

  /* max-width: 1100px; */
  flex: 1;
  /* background-color:#1d1d1d; */
  margin: 0 auto;

  display: flex;
  /* gap:20px; */
}

.center_box .l {
  background-color: #1d1d1d;
  width: 180px;

}

.l ul {
  position: sticky;
  top: 72px;
  left: 0;
}

.l ul li {
  text-align: center;
  /* color:#2e2e2e; */
}

.l ul li:not(first-child) {
  color: #403f3f;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  cursor: pointer;
}

.l ul li:not(first-child):hover {
  color: #e2e2e2;
  /* color: coral */
}

.li_click_style {
  color: coral !important;
}

.center_box .r {
  background-color: #474747;
  width: 920px;
}
</style>
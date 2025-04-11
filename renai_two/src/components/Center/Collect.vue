<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-18 19:42:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-03 16:36:36
 * @FilePath: \renai_two\src\components\Center\Collect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box_con" @click="openNewTab(item.article_uuid, item.visibility)" v-for="(item, index) in data_arr"
    :key="index" :data-custom="item.articleUuid">
    <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.Cover}`" class="img">
    <div>
      <h2>{{ item.title }}</h2>
      <p>{{ item.abstract }}</p>
      <div class="read_box">
        <span class="iconfont icon-yueduliang"></span>
        <span class="word_yuedu">1111</span>
      </div>
    </div>
  </div>
  <div class="box_con" @click="openNewTab(item.article_uuid, item.visibility)" v-for="(item, index) in data_arr_2"
    :key="index" :data-custom="item.articleUuid">
    <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.Cover}`" class="img">
    <div>
      <h2>{{ item.title }}</h2>
      <p>{{ item.abstract }}</p>
      <div class="read_box">
        <span class="iconfont icon-yueduliang"></span>
        <span class="word_yuedu">1111</span>
      </div>
    </div>
  </div>
  <div class="last" v-show="last_show">-----已经到底了-----</div>
</template>

<script>
import { collectArticlesAPI } from '@/api/blog'
import {mapStatus} from '@/utils'
import { ref, reactive, onMounted, onUpdated, onUnmounted } from 'vue'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
export default {
  name: 'Collect',
  setup() {
    let last_show = ref(false)
    let data_arr = reactive([])
    let data_arr_2 = reactive([])
    // 开新页面
    function openNewTab(uuid, visibility) {
      if (visibility == '全体可见') {
        const queryString = uuid
        const url = router.resolve({ name: 'Essay', query: { queryString } }).href;
        window.open(url, '_blank')
      } else {
        if (getToken('refresh_token') != '') {
          const queryString = uuid
          const url = router.resolve({ name: 'Essay', query: { queryString } }).href;
          window.open(url, '_blank')
        } else {
          ElMessage('仅成员可见!!!')
        }
      }
    }
    let scrollPosition = 0;
    function getHeight() {
      const totalHeight = document.body.scrollHeight
      const viewportHeight = window.innerHeight
      scrollPosition = totalHeight - viewportHeight
    }
    //发请求的数量
    let messageNum = ref(0)
    //第二次或者第n次加载页面数据
    let requestNum = ref(1);
    //计算要拿多少个数据
    function getData() {
      // 已有信息高度小于视高开始加载，每次都清空不能累加信息高度
      if (150 * messageNum.value >= window.innerHeight) {
        return
      }
      //发信息的次数（多加两次防止出现bug）
      messageNum.value = parseInt(window.innerHeight / 150) + 2
      //初次加载页面,保存的数据都要删除掉完
      first_message()
      data_arr.splice(0, data_arr.length)
      data_arr_2.splice(0, data_arr_2.length)
      requestNum.value = 1;
    }
    //二次加载页面
    let fight_scroll = ref(true)
    async function bottom_message() {
      if (window.scrollY >= scrollPosition - 1) {
        fight_scroll.value = false
        requestNum.value++
        const res = await collectArticlesAPI(requestNum.value, 4, messageNum.value)
        if (res.code == 0) {
          if (res.data) {
            let i = 0;
            res.data.forEach(item => {
              data_arr_2.push(item)
              i++;
            })
            if (i < 4) {
              last_show.value = true;
              return
            }
          } else {
            last_show.value = true;
            return
          }
        } else {
          ElMessage.error(mapStatus.get(res.code))
        }
        fight_scroll.value = true;
      }
    }
    async function first_message() {
      const res = await collectArticlesAPI(1, messageNum.value,messageNum.value)
      if (res.code == 0) {
        if (res.data) {
          let i = 0;
          res.data.forEach(item => {
            data_arr.push(item)
            i++;
          })
          if (i < messageNum.value) {
            last_show.value = true;
            return
          }
        } else {
          last_show.value = true;
          return
        }
      } else {
        ElMessage.error(mapStatus.get(res.code))
      }
    }
    onMounted(() => {
      getData()
      window.addEventListener('resize', getData)
      window.addEventListener('scroll', getHeight)
    })
    onUpdated(() => {
      //n次加载数据
      window.addEventListener('scroll', () => {
        if (!last_show.value && data_arr.length >= messageNum && fight_scroll.value) {
          bottom_message();
        }
      })
    })
    onUnmounted(() => {
      window.removeEventListener('resize', getData)
      window.removeEventListener('scroll', getHeight)
      window.removeEventListener('scroll', bottom_message)
    })
    return {
      last_show,
      openNewTab,
      data_arr,
      data_arr_2,
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.box_con {
  height: 150px;
  background-color: rgb(33, 33, 33);
  display: flex;
  cursor: pointer;
}

.box_con .img {
  height: 120px;
  width: 130px;
  margin: 15px;
}

.box_con div {
  width: 745px;
  background-color: rgb(33, 33, 33);
  margin-right: 10px;
  margin-left: 5px;

  margin-bottom: 15px;
}

.box_con div h2 {
  color: #e2e2e2;
  background-color: rgb(33, 33, 33);
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box_con div h2:hover {
  text-decoration: underline;
}

.box_con div p {
  color: #afaeab;
  background-color: rgb(33, 33, 33);
  margin-top: 8px;
  height: 50px;
  font-size: 16px;
  word-wrap: break-word;

  /* white-space:normal; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.read_box {
  margin-top: 8px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  height: 30px;
  position: relative;
  /* overflow:hidden; */
}

.read_box .icon-yueduliang {
  color: #afaeab;
  position: absolute;
  top: 2px;
}

.read_box .word_yuedu {
  margin-left: 18px;
  font-size: 14px;
  color: #afaeab;
}

.last {
  text-align: center;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
  color: #FFB6C1;

}
</style>
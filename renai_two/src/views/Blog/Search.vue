<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-19 15:04:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-04 13:26:49
 * @FilePath: \renai_two\src\views\Blog\Search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mainbox">
    <header class="w_header">
      <SpecialHeader></SpecialHeader>
    </header>
    <main class="box">
      <div class="box_content">
        <div class="con_wai" v-for="(item, index) in data_arr" :key="index"
          @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
          <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.abstract }}</p>
            <div class="word_yuedu_wai">
              <span class="iconfont icon-yueduliang"></span>
              <span class="word_yuedu">{{ item.reading_volume }}</span>
            </div>
          </div>
        </div>
        <div class="con_wai" v-for="(item, index) in data_arr_2" :key="index"
          @click="openNewTab(item.article_uuid, item.visibility)" :data-custom="item.article_uuid">
          <img :src="`http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${item.article_uuid}/${item.cover}`">
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.abstract }}</p>
            <div class="word_yuedu_wai">
              <span class="iconfont icon-yueduliang"></span>
              <span class="word_yuedu">{{ item.reading_volume }}</span>
            </div>
          </div>
        </div>
        <div class=" last" v-show="last_show">-----已经到底了-----</div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapStatus, getToken } from '@/utils'
import { searchArticleAPI } from '@/api/blog'
import  SpecialHeader  from '@/components/Blog/SpecialHeader.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, reactive, onUpdated } from 'vue'
import router from '@/router';
export default {
  name: 'Search',
  components: { SpecialHeader },
  setup() {
    const route = useRoute();
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
        let data = {
          search: route.query.queryString
        }
        const res = await searchArticleAPI(requestNum.value, 4, messageNum.value, data)
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
      let data = {
        search: route.query.queryString
      }
      const res = await searchArticleAPI(1, messageNum.value, messageNum.value, data)
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
        if (!last_show.value && data_arr.length >= messageNum.value && fight_scroll.value) {
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
      data_arr,
      data_arr_2,
      last_show,
      openNewTab,
    }
  }
}
</script>

<style scoped>
.w_header {
  position: sticky;
  top: 0;
  z-index: 22;
}

.word_yuedu_wai {
  position: relative;
}

.icon-yueduliang {
  color: #afaeab;
  position: absolute;
  top: 2px;
}

.word_yuedu {
  margin-left: 18px;
  font-size: 14px;
  color: #afaeab;
}

.mainbox {
  background: #2e2e2e;
  min-width: 1260px;
  min-height: 100vh;
  transition: min-height 0.3s ease;
  display: flex;
  flex-direction: column;
}

.box {
  margin: 0 auto;
  flex: 1;
  background: #333232;
}

.box_content {
  max-width: 1200px;
  /* margin: 0 auto; */
  margin: 15px auto 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.box_content .con_wai {
  width: 1200px;
  height: 150px;
  background-color: rgb(33, 33, 33);
  display: flex;
  cursor: pointer;
}

.box_content .con_wai img {
  height: 130px;
  width: 200px;
  margin: 10px;
}

.box_content .con_wai div {
  width: 965px;
  background-color: rgb(33, 33, 33);
  margin-right: 10px;
  margin-left: 5px;
}

.box_content .con_wai div h2 {
  color: #e2e2e2;
  background-color: rgb(33, 33, 33);
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box_content .con_wai div h2:hover {
  text-decoration: underline;
}

.box_content .con_wai div p {
  width: 965px;
  color: #afaeab;
  background-color: rgb(33, 33, 33);
  margin-top: 8px;
  height: 65px;
  font-size: 16px;
  word-wrap: break-word;

  /* white-space:normal; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.box_content .last {
  text-align: center;
  height: 150px;
  line-height: 150px;
  width: 1200px;
  font-size: 20px;
  color: #FFB6C1;
  background-color: rgb(61, 59, 59);
}
</style>
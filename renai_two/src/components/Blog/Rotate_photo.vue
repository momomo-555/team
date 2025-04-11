<template>
    <div class="rotate_box" @mouseenter="mouse_stop_time('进入')" @mouseleave="mouse_stop_time('离开')">
        <img class="img" :class="Showimg == index ? 'show_img' : ''" :src="item.imgUrl" alt=""
            v-for="(item, index) in imgList" :key="index">
        <div class="left" @click="throttle(LastFun)">
            <span class="iconfont icon-xiangzuo"></span>
        </div>
        <div class="right" @click="throttle(NextFun)">
            <span class="iconfont icon-xiangyou"></span>
        </div>
        <!-- 小圆点 -->
        <div class="bottom">
            <span class="iconfont icon-point-copy-9-copy" :class="Showimg == index ? 'circle_style' : ''"
                v-for="(item, index) in imgList.length" :key="index" @click="Showimg = index"></span>
        </div>
    </div>
</template>

<script>
import '@/assets/fonts/souSuo/iconfont.css'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
export default {
    name: 'Rotate_photo',
    setup() {
        let imgList = reactive([
            { imgUrl: 'http://106.14.30.173:8089//Homeinformation/get/blog/picture:1.png' },
            { imgUrl: 'http://106.14.30.173:8089//Homeinformation/get/blog/picture:2.png' },
            { imgUrl: 'http://106.14.30.173:8089//Homeinformation/get/blog/picture:3.png' },
        ])
        // 当前图片
        let Showimg = ref(0)
        let fight = ref(true)
        let timer;
        function mouse_stop_time(val) {
            val == '进入' ? clearInterval(timer) : Timer_rotate()
        }
        // 定时器
        function Timer_rotate() {
            timer = setInterval(() => {
                NextFun();
            }, 1500)
        }
        // 节流
        function throttle(fun) {
            if (fight.value) {
                fight.value = false
                fun()
                setTimeout(() => {
                    fight.value = true
                }, 1000)
            } else {
                ElMessage({
                    message: '请一秒钟后再点击！',
                    type: 'warning',
                })
            }
        }
        // 上一张
        function LastFun(){
            if(Showimg.value==0){
                Showimg.value=imgList.length-1
            }else{
                Showimg.value--
            }
        }
        // 下一张
        function NextFun(){
            if (Showimg.value == imgList.length - 1) {
                Showimg.value = 0;
            } else {
                Showimg.value++;
            }
        }
        onMounted(() => {
            // 开启定时器
            Timer_rotate()
            // 发请求

        })
        onUnmounted(() => {
            // 清除定时器
            clearInterval(timer)
        })
        return {
            throttle,
            mouse_stop_time,
            LastFun,
            NextFun,
            imgList,
            Showimg,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.rotate_box {
    width: 100%;
    height: 400px;
    /* box-shadow: 0 0 2px 0 rgb(119, 117, 117); */
    background: rgb(33, 33, 33);
    position: relative;

}

.rotate_box .left {
    position: absolute;
    top: 40%;
    left: 2px;
    cursor: pointer;
}

.rotate_box .right {
    position: absolute;
    top: 40%;
    right: 2px;
    cursor: pointer;
}

.iconfont {
    font-size: 23px;
    color: rgba(137, 134, 134, 0.5);
}

.rotate_box .bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}

.circle_style {
    color: cornflowerblue;
}

.img {
    width: 100%;
    height: 100%;
    opacity: 0;
    /* z-index:0; */
    transition: 0.8s;
    position: absolute;
    left: 0px;
    top: 0px;
}

.show_img {
    /* 透明度 */
    opacity: 1 !important;
    /* z-index:1 !important; */
}
</style>
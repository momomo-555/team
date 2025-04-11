<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-05 15:49:45
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-06 21:24:54
 * @FilePath: \renai\src\components\FTopclock.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="container" ref="container">
            <div class="dateTimeBox yearBox isActive">{{ nowYear }}年</div>
            <div id="monthArea" ref="monthArea">
                <div class="dateTimeBox" ref="monthBox" v-for="(item, index) in monthList" :key="index"
                    :class="{ 'isActive': item.isActive }">{{ item.value }}
                </div>
            </div>
            <div id="dateArea" ref="dateArea">
                <div class="dateTimeBox" ref="dateBox" v-for="(item, index) in dateList" :key="index"
                    :class="{ 'isActive': item.isActive }">{{ item.value }}</div>
            </div>
            <div id="hourArea" ref="hourArea">
                <div class="dateTimeBox" ref="hourBox" v-for="(item, index) in hourList" :key="index"
                    :class="{ 'isActive': item.isActive }">{{ item.value }}</div>
            </div>
            <div id="minuteArea" ref="minuteArea">
                <div class="dateTimeBox" ref="minuteBox" v-for="(item, index) in minuteList" :key="index"
                    :class="{ 'isActive': item.isActive }">{{ item.value }}
                </div>
            </div>
            <div id="secondArea" ref="secondArea">
                <div class="dateTimeBox" ref="secondBox" v-for="(item, index) in secondList" :key="index"
                    :class="{ 'isActive': item.isActive }">{{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let monthList2 = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
        let dayText = ["一日", "二日", "三日", "四日", "五日", "六日", "七日", "八日", "九日", "十日", "十一日", "十二日", "十三日", "十四日", "十五日", "十六日"
            , "十七日", "十八日", "十九日", "二十日", "二十一日", "二十二日", "二十三日", "二十四日", "二十五日", "二十六日", "二十七日", "二十八日", "二十九日", "三十日", "三十一日"];
        let hourText = ["零时", "一时", "二时", "三时", "四时", "五时", "六时", "七时", "八时",
            "九时", "十时", "十一时", "十二时", "十三时", "十四时", "十五时", "十六时", "十七时", "十八时", "十九时", "二十时", "二十一时", "二十二时", "二十三时"];
        let minuteText = ["零分", "一分", "二分", "三分", "四分", "五分", "六分", "七分", "八分", "九分", "十分", "十一分", "十二分", "十三分", "十四分", "十五分", "十六分", "十七分", "十八分",
            "十九分", "二十分", "二十一分", "二十二分", "二十三分", "二十四分", "二十五分", "二十六分", "二十七分", "二十八分", "二十九分", "三十分", "三十一分", "三十二分", "三十三分",
            "三十四分", "三十五分", "三十六分", "三十七分", "三十八分", "三十九分", "四十分", "四十一分", "四十二分", "四十三分", "四十四分", "四十五分", "四十六分", "四十七分",
            "四十八分", "四十九分", "五十分", "五十一分", "五十二分", "五十三分", "五十四分", "五十五分", "五十六分", "五十七分", "五十八分", "五十九分"];
        let secondsText = ["零秒", "一秒", "二秒", "三秒", "四秒", "五秒", "六秒", "七秒", "八秒", "九秒", "十秒", "十一秒", "十二秒", "十三秒", "十四秒", "十五秒", "十六秒",
            "十七秒", "十八秒", "十九秒", "二十秒", "二十一秒", "二十二秒", "二十三秒", "二十四秒", "二十五秒", "二十六秒", "二十七秒", "二十八秒", "二十九秒", "三十秒", "三十一秒",
            "三十二秒", "三十三秒", "三十四秒", "三十五秒", "三十六秒", "三十七秒", "三十八秒", "三十九秒", "四十秒", "四十一秒", "四十二秒", "四十三秒", "四十四秒", "四十五秒",
            "四十六秒", "四十七秒", "四十八秒", "四十九秒", "五十秒", "五十一秒", "五十二秒", "五十三秒", "五十四秒", "五十五秒", "五十六秒", "五十七秒", "五十八秒", "五十九秒"];
        return {
            nowYear: '',//当前年份
            monthList: [],//月份数组
            monthList2,
            dateList: [],//日期数组
            dayText,
            hourList: [],//小时数组
            hourText,
            minuteList: [],//分钟数组
            minuteText,
            secondList: [],//秒钟数组
            secondsText,
        }
    },
    mounted() {
        var that = this;
        that.initTimeList();
    },

    methods: {
        //设置刻度
        initTimeList() {

            var that = this;
            for (var i = 1; i < 13; i++) {
                that.monthList.push({
                    value: that.monthList2[i - 1] + "月",
                    isActive: false
                });
            }
            for (var i = 1; i < 32; i++) {
                that.dateList.push({
                    value: that.dayText[i - 1],
                    isActive: false
                });
            }
            for (var i = 0; i < 24; i++) {
                that.hourList.push({
                    value: that.hourText[i],
                    isActive: false
                });
            }
            for (var i = 0; i < 60; i++) {
                that.minuteList.push({
                    value: that.minuteText[i],
                    isActive: false
                });
            }
            for (var i = 0; i < 60; i++) {
                that.secondList.push({
                    value: that.secondsText[i],
                    isActive: false
                });
            }
            that.$nextTick(function () {
                that.initData();
            });
        },
        //初始化样式
        initData() {
            var that = this;
            // const containerWidth = this.$refs.container.clientWidth;
            // console.log(containerWidth)
            // const radius1 = containerWidth / 2;
            // const radius2 = containerWidth / 4;
            // const radius3 = containerWidth / 6;
            // const radius4 = containerWidth / 8;
            // const radius5 = containerWidth / 10;
            //初始化月份样式
            that.setRoundStyle(that.$refs.monthBox, 65, 360 / 12);
            //初始化日期样式
            that.setRoundStyle(that.$refs.dateBox, 130, 360 / 31);
            //初始化小时样式
            that.setRoundStyle(that.$refs.hourBox, 200, 360 / 24);
            //初始化分钟样式
            that.setRoundStyle(that.$refs.minuteBox, 270, 6);
            //初始化秒钟样式
            that.setRoundStyle(that.$refs.secondBox, 360, 6);
            // //初始化月份样式
            // that.setRoundStyle(that.$refs.monthBox, radius5, 360 / 12);
            // //初始化日期样式
            // that.setRoundStyle(that.$refs.dateBox, radius4, 360 / 31);
            // //初始化小时样式
            // that.setRoundStyle(that.$refs.hourBox, radius3, 360 / 24);
            // //初始化分钟样式
            // that.setRoundStyle(that.$refs.minuteBox, radius2, 6);
            // //初始化秒钟样式
            // that.setRoundStyle(that.$refs.secondBox, radius1, 6);
            that.setNowDate();
            that.run();
        },
        /**
         * 设置圆圈样式
         * dataList:刻度数组, radius:半径, eachDeg:每个刻度间的度数
         */
        setRoundStyle(dataList, radius, eachDeg) {
            for (var i = 0; i < dataList.length; i++) {
                var translateX = Math.round(Math.cos(i * eachDeg * (Math.PI / 180)) * 1000000) / 1000000 * radius;
                var translateY = Math.round(Math.sin(i * eachDeg * (Math.PI / 180)) * 1000000) / 1000000 * radius;
                var rotateDeg = i * eachDeg;
                dataList[i].style.transform = "translate(" + translateX + "px, " + translateY + "px) rotate(" + rotateDeg + "deg)";
            }

        },
        //设置当前时间
        setNowDate() {
            // var i = 0;
            // console.log(i++, 'setNowDate()')
            var that = this;
            var nowDate = new Date();
            // 设置所有时间项的 isActive 为 false
            // 初始化状态
            that.monthList.forEach(item => item.isActive = false);
            that.dateList.forEach(item => item.isActive = false);
            that.hourList.forEach(item => item.isActive = false);
            that.minuteList.forEach(item => item.isActive = false);
            that.secondList.forEach(item => item.isActive = false);

            //当前年份
            that.nowYear = nowDate.getFullYear();
            //当前月份
            that.rotateBox(that.$refs.monthArea, nowDate.getMonth() * (-360 / 12), that.monthList[nowDate.getMonth()], nowDate.getMonth() - 1 < 0 ? that.monthList[that.monthList.length - 1] : that.monthList[nowDate.getMonth() - 1]);
            //当前日期
            that.rotateBox(that.$refs.dateArea, (nowDate.getDate() - 1) * (-360 / 31), that.dateList[nowDate.getDate() - 1], nowDate.getDate() - 2 < 0 ? that.dateList[that.dateList.length - 1] : that.dateList[nowDate.getDate() - 2]);
            //当前小时
            that.rotateBox(that.$refs.hourArea, nowDate.getHours() * (-360 / 24), that.hourList[nowDate.getHours()], nowDate.getHours() - 1 < 0 ? that.hourList[that.hourList.length - 1] : that.hourList[nowDate.getHours() - 1]);
            //当前分钟
            that.rotateBox(that.$refs.minuteArea, nowDate.getMinutes() * (-360 / 60), that.minuteList[nowDate.getMinutes()], nowDate.getMinutes() - 1 < 0 ? that.minuteList[that.minuteList.length - 1] : that.minuteList[nowDate.getMinutes() - 1]);
            //当前秒钟
            that.rotateBox(that.$refs.secondArea, nowDate.getSeconds() * (-360 / 60), that.secondList[nowDate.getSeconds()], nowDate.getSeconds() - 1 < 0 ? that.secondList[that.secondList.length - 1] : that.secondList[nowDate.getSeconds() - 1]);
        },
        /**
         * 旋转刻度
         * dateTimeArea:要旋转的区域，rotateDeg：转到当前时间所需要旋转的度数，dateTimeBox：当前时间刻度，lastdateTimeBox：前一个高亮的刻度
         */
        rotateBox(dateTimeArea, rotateDeg, dateTimeBox, lastdateTimeBox) {
            var that = this;
            // dateTimeArea.style.transform = "rotate(" + rotateDeg + "deg)";
            if (dateTimeArea) {
                dateTimeArea.style.transform = "rotate(" + rotateDeg + "deg)";
            } else {
                // console.error("dateTimeArea is null or undefined!");
                return; // 如果dateTimeArea无效，则提前返回
            }
            // that.initTimeList(),
            dateTimeBox.isActive = true;
            lastdateTimeBox.isActive = false;
        },
        //动起来
        run() {
            var that = this;
            var timer;
            clearInterval(timer);
            timer = setInterval(function () {
                that.setNowDate();
            }, 1000);
        }
    },

}
</script>

<style scoped>
.container {
    width: 700px;
    height: 700px;
    /* width:36%;
    height:64%; */
    position: relative;
    background-color: #1b1b1b;
    color: #666;
}

.dateTimeBox {
    position: absolute;
    width: 80px;
    height: 20px;
    text-align: center;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -40px;
}

#monthArea,
#dateArea,
#hourArea,
#minuteArea,
#secondArea {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 1s;
}

.isActive {
    color: #fff;
}
</style>

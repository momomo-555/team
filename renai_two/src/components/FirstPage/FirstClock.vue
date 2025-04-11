<template>
    <div class="top">
        <div class="top_view">
            <div class="say">
                <p>找一群志同道合的人<br>&nbsp;&nbsp;&nbsp;&nbsp;做一件有意义的事</p>
            </div>
            <div class="clock">
                <Clock></Clock>
            </div>
        </div>
    </div>
</template>

<script>
import Clock from './Clock.vue'
export default {
    name: 'FirstClock',
    components: { Clock },
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.top {
    background-color: #1b1b1b;
    /* background-color: red; */
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: absolute;
}

.top_view {
    background-color: #1b1b1b;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}

p {
    text-align: center;
    color: white;
    float: left;
    font-size: 40px;
    line-height: 80px;
    margin-top: 130px;
    margin-left: 50px;
}

.say {
    position: relative;
    z-index: 1;
    /* width:30%; */
}

.clock {
    position: absolute;
    top: 60px;
    /* right:99px; */
    left: 400px;
}

@media screen and (max-width:900px) {
    .clock {
        left: 300px;
    }
}

@media screen and (max-width:850px) {
    .clock {
        left: 250px;
    }
}

@media screen and (max-width:780px) {
    .clock {
        left: 200px;
    }
}

@media screen and (max-width:640px) {
    .clock {
        left: 150px;
    }
}

@media screen and (max-width:540px) {
    .clock {
        left: 99px;
    }
}
</style>
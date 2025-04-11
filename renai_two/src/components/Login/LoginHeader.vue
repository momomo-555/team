<template>
    <div class="header">
        <ul>
            <div class="h_con">
                <img src="@/assets/logo.png" alt="logo">
                <p title="Renai Studio">仁爱工作室</p>
            </div>
            <li>
                <router-link to="/" active-class="active">
                    <a @click="Fanhui">返回首页</a>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LoginHeader',
    setup(props,{emit}){
        function Fanhui(){
            emit('cfanhui',true)
        }
        return {
            Fanhui
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 微软雅黑;
}

a {
    text-decoration: none;
    color: #fff;
}

.header {
    width: 100%;
    height: 50px;
    background-color: #1b1b1b;
    padding: 0;
    margin: 0;
    /* 粘性定位要有 ？？？*/
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px solid #9e9e9e;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    z-index: 99;

}

ul {
    list-style: none;
    width: 100%;
    /* height:70px; */

}

img {
    float: left;
    height: 40px;
    width: 40px;
    margin-top: 6px;
    margin-left: 10px;
}

p {
    float: left;
    font-size: 23px;
    /* color:#cdcdcd; */
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    margin-left: 10px;
}

li {
    float: right;
    color: #cdcdcd;
    width: 140px;

    /* width: 160px; */
    /* 改 */
    /* width: 15%; */
    text-align: center;
    margin-top: 13px;
    position: relative;
    font-size: 18px;
}

@media screen and (min-width:1400px) {
    .header {
        height: 70px;
    }

    img {
        height: 50px;
        width: 50px;
        margin-top: 10px;
        margin-left: 10px;
    }

    p {
        font-size: 25px;
        /* color:#cdcdcd; */
        line-height: 64px;
        margin-left: 15px;
    }

    li {
        margin-top: 20px;
        font-size: 20px;
    }
}
</style>
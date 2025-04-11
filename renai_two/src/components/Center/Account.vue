<template>
    <div  v-if="fight">
        <div v-show="img_fight">
            <label for="upload">
                <img :src="img_src">
                <!-- 上传头像 -->
                </img>
            </label>
        </div>
        <div v-show="!img_fight">
            <!-- <img :src="img_src"> -->
            <input id="upload" type="file" @change="uploadFile" ref="fileInputRef">
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_name)" @mouseout="box_mouseout(edit_fight_name)">
        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
        <div v-if="input_fight.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.name.value }}</span>
            <div v-show="edit_fight_name.value" style="display:inline;cursor:pointer" @click="click_edit(input_fight)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <input class="con_box_input" v-model="p_edit.name_edit.value">
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.name, p_edit.name_edit, input_fight, 'name')">完成</button>
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_nichen)" @mouseout="box_mouseout(edit_fight_nichen)">
        <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span>
        <div v-if="input_fight_incheng.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.nicheng.value }}</span>
            <div v-show="edit_fight_nichen.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_incheng)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <input class="con_box_input" v-model="p_edit.nicheng_edit.value">
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_incheng)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.nicheng, p_edit.nicheng_edit, input_fight_incheng, 'username')">完成</button>
        </div>
    </div>
    <div class="con_box">
        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
        <span style="margin-left:40px;">{{ p.email.value }}</span>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_sex)" @mouseout="box_mouseout(edit_fight_sex)">
        <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
        <div v-if="input_fight_sex.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.sex.value }}</span>
            <div v-show="edit_fight_sex.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_sex)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <!-- <input class="con_box_input" v-model="p_edit.sex_edit.value"> -->
            <label for="male" style="margin-left:40px;">男</label>
            <input style="margin-left:5px;" type="radio" id="male" name="sex" value="男" v-model="p_edit.sex_edit.value">
            <label for="female" style="margin-left:30px;">女</label>
            <input style="margin-left:5px;" type="radio" id="female" name="sex" value="女"
                v-model="p_edit.sex_edit.value">

            <button class="input_button" style="top:2px;left:180px;background-color:crimson"
                @click="cancel_edit(input_fight_sex)">取消</button>
            <button class="input_button" style="top:2px;left:240px; background-color:darkgreen"
                @click="finish_edit(p.sex, p_edit.sex_edit, input_fight_sex, 'sex')">完成</button>
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_grade)" @mouseout="box_mouseout(edit_fight_grade)">
        <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</span>
        <div v-if="input_fight_grade.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.grade.value }}</span>
            <div v-show="edit_fight_grade.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_grade)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <input class="con_box_input" v-model="p_edit.grade_edit.value">
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_grade)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.grade, p_edit.grade_edit, input_fight_grade)">完成</button>
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_direction)"
        @mouseout="box_mouseout(edit_fight_direction)">
        <span>方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
        <div v-if="input_fight_direction.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.direction.value }}</span>
            <div v-show="edit_fight_direction.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_direction)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <!-- <input class="con_box_input" v-model="p_edit.direction_edit.value"> -->
            <select value="其他" class="con_box_select" v-model="p_edit.direction_edit.value">
                <option value="人工智能">人工智能</option>
                <option value="前端">前端</option>
                <option value="后端">后端</option>
                <option value="其他">其他</option>
            </select>
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_direction)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.direction, p_edit.direction_edit, input_fight_direction, 'direction')">完成</button>
        </div>
    </div>
    <div class="con_box">
        <span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</span>
        <span style="margin-left:40px;">{{ p.occupation.value }}</span>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_Qq)" @mouseout="box_mouseout(edit_fight_Qq)">
        <span>Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q</span>
        <div v-if="input_fight_Qq.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.Qq.value }}</span>
            <div v-show="edit_fight_Qq.value" style="display:inline;cursor:pointer" @click="click_edit(input_fight_Qq)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <input class="con_box_input" v-model="p_edit.Qq_edit.value">
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_Qq)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.Qq, p_edit.Qq_edit, input_fight_Qq, 'qq')">完成</button>
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(edit_fight_chat)" @mouseout="box_mouseout(edit_fight_chat)">
        <span>微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信</span>
        <div v-if="input_fight_chat.value" style="display:inline;">
            <span style="margin-left:40px;">{{ p.chat.value }}</span>
            <div v-show="edit_fight_chat.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_chat)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <input class="con_box_input" v-model="p_edit.chat_edit.value">
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_chat)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.chat, p_edit.chat_edit, input_fight_chat, 'wechat')">完成</button>
        </div>
    </div>
    <div class="con_box" @mouseover="box_mouseover(adress_fight)" @mouseout="box_mouseout(adress_fight)">
        <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>
        <div v-if="input_address.value" style="display:inline;">
            <span style="margin-left:40px;">{{ area }}</span>
            <div v-show="adress_fight.value" style="display:inline;cursor:pointer" @click="click_edit(input_address)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative">
            <select :value="Aadress.province" class="select_style" @change="pro_change(Aadress.province)"
                v-model="Aadress.province" style="margin-left:40px;" placeholder="请选择省">
                <option v-for="item in Arr_pro" :key="item.code" :value="item.name">{{ item.name }}</option>
            </select>
            <select class="select_style" @change="city_change(Aadress.city)" v-model="Aadress.city" placeholder="请选择市">
                <option v-for="item in Arr_city" :key="item.code" :value="item.name">{{ item.name }}</option>
            </select>
            <select class="select_style" v-model="Aadress.district" :value="Aadress.district" placeholder="请选择区">
                <option v-for="item in Arr_dis" :key="item.code" :value="item.name">{{ item.name }}</option>
            </select>
            <button @click="address_cancle" class="input_button"
                style="top:2px;left:590px;background-color:crimson">取消</button>
            <button @click="address_finish" class="input_button"
                style="top:2px;left:645px; background-color:darkgreen">完成</button>
        </div>
    </div>
    <div class="con_box con_box_two" style="position:relative" @mouseover="box_mouseover(edit_fight_motto)"
        @mouseout="box_mouseout(edit_fight_motto)">
        <span style="position:absolute;">座&nbsp;&nbsp;右&nbsp;&nbsp;铭</span>
        <div v-if="input_fight_motto.value" style="display:inline; margin-left:65px">
            <span style="margin-left:40px;">{{ p.motto.value }}</span>
            <div v-show="edit_fight_motto.value" style="display:inline;cursor:pointer"
                @click="click_edit(input_fight_motto)">
                <span class="iconfont icon-bianji"></span>
                <span style="color:cadetblue;">编辑</span>
            </div>
        </div>
        <div v-else style="display:inline;position:relative;margin-left:65px;">
            <!-- <input class=" con_box_input" v-model="p_edit.motto_edit.value"> -->
            <textarea class="con_box_textarea" v-model="p_edit.motto_edit.value">

            </textarea>
            <button class="input_button" style="top:2px;left:370px;background-color:crimson"
                @click="cancel_edit(input_fight_motto)">取消</button>
            <button class="input_button" style="top:2px;left:425px; background-color:darkgreen"
                @click="finish_edit(p.motto, p_edit.motto_edit, input_fight_motto, 'motto')">完成</button>
        </div>
    </div>
    <div class="con_box">
        <span>创建时间</span>
        <span style="margin-left:40px;">{{ p.creatTime.value }}</span>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, reactive, onMounted, onUpdated } from 'vue'
// import axios from 'axios'
import { getUserMessageAPI, alterMessageAPI, alterHeadPhotoAPI, userUuidAPI } from '@/api/user'
import { mapStatus, getToken } from '@/utils'
import router from '@/router'
import '@/assets/fonts/souSuo/iconfont.css'
import Address from './address.json'
export default {
    name: 'Account',
    setup() {
        const store = useStore()
        let Aadress = reactive({
            province: '',
            city: '',
            district: '',
        })
        let area = ref('')
        let Arr_pro = reactive([])
        let Arr_city = reactive([])
        let Arr_dis = reactive([])
        let fileInputRef = ref(null)
        let img_fight = ref(true)
        let img_src = ref('')
        let input_fight = reactive({
            value: true
        })
        let input_fight_incheng = reactive({
            value: true
        })
        let input_fight_sex = reactive({
            value: true
        })
        let input_fight_grade = reactive({
            value: true
        })
        let input_fight_direction = reactive({
            value: true
        })
        let input_fight_Qq = reactive({
            value: true
        })
        let input_fight_chat = reactive({
            value: true
        })
        let input_fight_motto = reactive({
            value: true
        })
        // 地址
        let input_address = reactive({
            value: true
        })
        // 鼠标经过和离开效果
        let edit_fight_name = reactive({
            value: false
        })
        let edit_fight_nichen = reactive({
            value: false
        })
        let edit_fight_sex = reactive({
            value: false
        })
        let edit_fight_grade = reactive({
            value: false
        })
        let edit_fight_direction = reactive({
            value: false
        })
        let edit_fight_Qq = reactive({
            value: false
        })
        let edit_fight_chat = reactive({
            value: false
        })
        let edit_fight_motto = reactive({
            value: false
        })
        // dizhi
        let adress_fight = reactive({
            value: false
        })
        // 
        let p = reactive({
            name: { value: '' },
            nicheng: { value: '' },
            sex: { value: '' },
            grade: { value: '' },
            direction: { value: '' },
            Qq: { value: '' },
            chat: { value: '' },
            motto: { value: '' },
            email: { value: '' },
            occupation: { value: '' },
            creatTime: { value: '' },
        })
        let p_edit = reactive({
            name_edit: { value: p.name.value },
            nicheng_edit: { value: p.nicheng.value },
            sex_edit: { value: p.sex.value },
            grade_edit: { value: p.grade.value },
            direction_edit: { value: p.direction.value },
            Qq_edit: { value: p.Qq.value },
            chat_edit: { value: p.chat.value },
            motto_edit: { value: p.motto.value },
        })
        // 获取头像
        // function get_photo() {
        //     //
        //     img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/:${getToken('uuid')}`
        // }
        async function get_photo() {
            // console.log('图片调用')
            const res = await userUuidAPI()
            // console.log('图片调用2')
            // let uuid=''
            if (res.code == 0) {
                // uuid=res.data.uuid
                if (res.data.uuid) {
                    img_src.value = `http://106.14.30.173:8081/api/user/unlisted/get/user/picture/${res.data.uuid}?time=${Date.now()}`
                    // console.log(img_src.value,'图片')
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 上传头像
        async function uploadFile() {
            // store.commit('isEditPhoto', true)
            const fd = new FormData();
            fd.append('file', fileInputRef.value.files[0]);

            const res = await alterHeadPhotoAPI(fd)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                
                // 头像修改成功
                store.commit('isEditPhoto', true)
                get_photo()
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击编辑按钮
        function click_edit(fight) {
            // console.log(fight)
            fight.value = false;
        }
        // 点击取消按钮
        function cancel_edit(fight) {
            fight.value = true;
        }

        // 修改完成发请求
        async function axios_message(oldval, newval, Att_name) {
            let change_user = {
                [Att_name]: newval
            }
            // const map = new Map()
            // map.set(Att_name, newval)
            // console.log(map,'map')
            const res = await alterMessageAPI(change_user)
            if (res.code == 0) {
                ElMessage.success('更改成功')
                // 更改数据
                oldval.value = newval
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击完成按钮
        function finish_edit(oldval, newval, fight, att_name) {
            // 修改成功
            // oldval.value = newval.value
            fight.value = true;
            // 发请求
            axios_message(oldval, newval.value, att_name)
        }
        // 鼠标离开
        function box_mouseout(fight) {
            fight.value = false
        }
        // 鼠标经过
        function box_mouseover(fight) {
            fight.value = true
        }
        //地址
        let addressData = Address;
        if (!Aadress.province) {
            //初始化省份
            Arr_pro.push(...addressData)
            Aadress.province = Arr_pro[0].name
            //市
            Arr_city.push(...addressData.filter(item => item.name == Aadress.province)[0].children)
            Aadress.city = Arr_city[0].name
            //区
            Arr_dis.push(...Arr_city.filter(item => item.name == Aadress.city)[0].children)
            Aadress.district = Arr_dis[0].name
        } else {
            // 市
            Arr_city.push(...addressData.filter(item => item.name == Aadress.province)[0].children)
            Aadress.city = Arr_city[0].name
            // 区
            Arr_dis.push(...Arr_city.filter(item => item.name == Aadress.city)[0].children)
            Aadress.district = Arr_dis[0].name
        }
        // 省改
        function pro_change(e) {
            // 清除所有数据
            Arr_city.splice(0, Arr_city.length)
            Arr_city.push(...addressData.filter((item) => { return item.name == e })[0].children)
            // 省变市变
            Aadress.city = Arr_city[0].name
            Aadress.district = ''
            // 市变区变
            Arr_dis.splice(0, Arr_dis.length)
            Arr_dis.push(...Arr_city[0].children)
            Aadress.district = Arr_dis[0].name
        }
        // 市改
        function city_change(e) {
            Arr_dis.splice(0, Arr_dis.length)
            Arr_dis.push(...Arr_city.filter(item => item.name == e)[0].children)
            Aadress.district = Arr_dis[0].name
        }
        // 地址---取消
        function address_cancle() {
            input_address.value = true;
        }
        // 地址更改请求数据
        // 地址---完成(请求)
        function address_finish() {
            input_address.value = true;
            let diZhi = Aadress.province + '/' + Aadress.city + '/' + Aadress.district
            // console.log(diZhi,'...')
            axios_message(area, diZhi, 'address')
        }
        async function get_message() {
            // console.log('message')
            const res = await getUserMessageAPI()
            // console.log('message11')
            if (res.code == 0) {
                p.name.value = res.data.name
                p.nicheng.value = res.data.username
                p.email.value = res.data.mailbox
                p.occupation.value = res.data.position
                p.creatTime.value = res.data.creat_time

                //
                area.value = res.data.address
                p.sex.value = res.data.sex
                p.grade.value = res.data.grade
                p.direction.value = res.data.direction
                p.Qq.value = res.data.qq
                p.chat.value = res.data.wechat
                p.motto.value = res.data.motto
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        let fight = ref(false)
        onMounted(async () => {
            // window.location.reload(1)
            // console.log(store.state.loginFight,'store')
            
            setTimeout(() => {
                fight.value=true
                // 获取头像
                get_photo();
                get_message();
            }, 1000)
            // 获取基本信息
            // await get_message();
            // 获取头像
            // get_photo();
        })
        // 获取基本信息
        return {
            fight,
            fileInputRef,
            img_fight,
            img_src,
            p,
            p_edit,
            input_fight,
            input_fight_incheng,
            input_fight_sex,
            input_fight_grade,
            input_fight_direction,
            input_fight_Qq,
            input_fight_chat,
            input_fight_motto,

            edit_fight_name,
            edit_fight_nichen,
            edit_fight_sex,
            edit_fight_grade,
            edit_fight_direction,
            edit_fight_Qq,
            edit_fight_chat,
            edit_fight_motto,
            uploadFile,
            click_edit,
            cancel_edit,
            finish_edit,
            box_mouseout,
            box_mouseover,
            Aadress,
            Arr_pro,
            Arr_city,
            Arr_dis,
            pro_change,
            city_change,
            address_cancle,
            address_finish,
            adress_fight,
            input_address,
            area,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.select_style {
    margin: 0 40px 0 0;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    color: #1d1d1d;
}

.select_style option {
    font-size: 15px;
    text-align: center;
    padding: 2px !important;
}

img {
    margin: 10px 40px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.img_box {
    margin: 10px 40px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    /* background-color:dimgrey; */
    text-align: center;
    line-height: 100px;
    color: rgb(177, 181, 181);
    border: 1px dashed dimgrey;
    cursor: pointer;
}

.con_box {
    margin: 0 40px 10px 40px;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    color: #c2bdbd;
}

.con_box_two {
    height: auto !important;
}

.con_box .con_box_input {
    margin-left: 40px;
    height: 25px;
    border-radius: 5px;
    outline: none;
    width: 300px;
    padding: 5px;
    border: 0;
    background-color: #d5d2d2;
}

.icon-bianji {
    color: cadetblue;
    margin-left: 20px;
    font-size: 18px;
}

.input_button {
    /* display:inline-block; */
    font-size: 14px;
    color: #1d1d1d;
    cursor: pointer;
    padding: 3px;
    border-radius: 3px;
    outline: 0;
    border: 0;
    position: absolute;
    width: 40px;
}

.con_box .con_box_select {
    margin-left: 40px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    width: 300px;
    padding: 5px;
    border: 0;
    background-color: #d5d2d2;
}

.con_box .con_box_select option {
    font-size: 15px;
    text-align: center;
}

.con_box_textarea {
    margin-left: 40px;
    outline: none;
    /* height: auto; */
    width: 300px;
    resize: vertical;
    overflow-y: auto;
    padding: 5px;
    background-color: #d5d2d2;
    border-radius: 4px;
    font-size: 15px;
    color: #171515;
    /* position:absolute;
    top:3px; */
    /* margin-top:10px; */
}
</style>
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 19:07:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-10 18:30:06
 * @FilePath: \renai_admin_two\src\views\Organization\mainDirection.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">主攻方向</span>
            </div>
        </template>
        <div>
            <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick" addable closable
                @tab-remove="removeClick" @tab-add="addClick">
                <el-tab-pane :label="item.name" :name="item.name" v-for="(item, index) in divMsg" :key="index">
                    <el-row :gutter="60">
                        <el-col :span="14">
                            <el-input v-model="item.introduce" style="width:100%;" :rows="4" type="textarea"
                                :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
                        </el-col>
                        <el-col :span="9">
                            <div class="photo_box">
                                <div class="word" v-if="!(item.id)">
                                    <label for="upload" style="cursor:pointer">
                                        <div>+</div>
                                        <div>更改图片</div>
                                    </label>
                                </div>
                                <div class="b_photo" v-else>
                                    <img :src="item.imgSrc">
                                    <input id="upload" type="file" class="upload" ref="fileInputRef"
                                        @change="uploadFile(item, index)">
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-button type="primary" style="margin-top: 20px;" @click="clickUpdata(item)">
                        <el-icon style="margin-right: 3px;">
                            <RefreshRight />
                        </el-icon>
                        更新</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
    <!-- 增加模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible" width="500" title="请输入内容">
            <div style="margin-top:20px;">
                <el-input v-model="model_input" placeholder="请输入专攻的名称"></el-input>
                <el-input v-model="model_textarea_value" style="width:100%;margin-top: 20px;" :rows="4" type="textarea"
                    :show-word-limit="true" maxlength="800" placeholder="请输入专业介绍" />
                <div class="photo_box" style="margin-top: 20px;">
                    <div class="word" v-show="fight.word">
                        <label for="upload_2" style="cursor:pointer">
                            <div>+</div>
                            <div>图片</div>
                        </label>
                    </div>
                    <div class="b_photo" v-show="fight.photo">
                        <img :src="img_src">
                        <input id="upload_2" type="file" class="upload" ref="fileRef" @change="modeluploadFile()">
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="firm_click">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mainDirectionAPI, uploadPhotoAPI, mainDirectionEditorAPI, mainDirectionDeleteAPI, mainDirectionAddAPI } from '@/api/message'
import { mapStatus } from '@/utils'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'mainDirection',
    setup() {
        // 模态介绍
        const model_textarea_value = ref('')
        // 模态输入框
        const model_input = ref('')
        // 模态图片上传ref
        let fileRef = ref('')
        // 模态图片src
        const img_src = ref('')
        // 模态图片显示控制
        const fight = reactive({
            word: true,
            photo: false,
        })
        // 增加模态fight
        const dialogFormVisible = ref(false)
        // 创建图片input框的ref
        let fileInputRef = ref('')
        // 存储所有盒子的内容
        const divMsg = reactive([])
        const activeName = ref('')
        // 页面数据
        const dire_arr = reactive([])
        // 点击显示内容
        function handleClick(val) {
            // 重新赋值
            activeName.value = val.props.name
        }
        //上传图片
        async function uploadFile(item, val) {
            const fd = new FormData();
            // if (fileInputRef.value[val] && fileInputRef.value[val].files.length > 0){
            //     fd.append('file', fileInputRef.value[val].files[0]);
            // }
            fd.append('file', fileInputRef.value[val].files[0]);
            const res = await uploadPhotoAPI( item.id,fd)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                item.imgSrc = `http://106.14.30.173:8008/api/reception/get/picture/${item.id}?time=${Date.now()}`
                // setTimeout(() => {
                //     window.location.reload();
                // }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击触发修改
        // 更新--发送aixos
        async function clickUpdata(val) {
            if (!confirm("你确定要更新吗？")) {
                return
            }
            let axiosMsg = {
                id: val.id,
                key: val.name,
                value: val.introduce
            }
            const res = await mainDirectionEditorAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //删除-- 点击删除的时候触发
        async function removeClick(val) {
            if (!confirm("你确定要删除吗？")) {
                return
            }
            let id = 0
            for (let i = 0; i < divMsg.length; i++) {
                if (divMsg[i].name == val) {
                    id = divMsg[i].id
                }
            }
            let data = { id: id }
            const res = await mainDirectionDeleteAPI(data)
            if (res.code == 0) {
                ElMessage.success('删除成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //增加--上传图片b64s
        async function modeluploadFile() {
            if (fileRef.value && fileRef.value.files.length > 0) {
                const file = fileRef.value.files[0]
                if (file.type.startsWith('image/')) {

                    const reader_2 = new FileReader();
                    reader_2.onload = (e) => {
                        img_src.value = e.target.result;
                        fight.word = false
                        fight.photo = true
                    }
                    reader_2.readAsDataURL(file)
                } else {
                    ELMessage.warning('请选择图片')
                }
            }
        }
        // 增加--确认发请求
        async function firm_click() {
            dialogFormVisible.value = false
            // 发图片
            const fd = new FormData();
            fd.append('file', fileRef.value.files[0]);

            if (!model_input.value) {
                ElMessage.warning('请输入专业名')
                return
            }
            if (!model_textarea_value.value) {
                ElMessage.warning('请输入专业介绍')
                return
            }
            let axiosMsg = {
                key: model_input.value,
                value1: model_textarea_value.value,
                // value2: img_src.value,
            }
            const res = await mainDirectionAddAPI(axiosMsg)
            if (res.code == 0) {
                // ElMessage.success('增加成功')  
                const res2 = await uploadPhotoAPI(res.data,fd)
                if (res2.coed == 0) {
                    ElMessage.success('增加成功')
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击增加的时候触发
        function addClick() {
            dialogFormVisible.value = true
        }
        //加载首页信息
        async function axios_message() {
            const res = await mainDirectionAPI()
            if (res.code == 0) {
                if (res.data) {
                    // 获取图片
                    // const res2 = await getPhotoAPI(res.data.id)
                    res.data.forEach(item => {
                        const newItem = {
                            ...item, imgSrc: `http://106.14.30.173:8008/api/reception/get/picture/${item.id}?time=${Date.now()}`
                        }; // 扩展原对象并添加属性
                        divMsg.push(newItem)
                    })
                    if (divMsg[0]) {
                        activeName.value = divMsg[0].name
                    }
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message()
        })
        return {
            dire_arr,
            handleClick,
            removeClick,
            addClick,
            activeName,
            divMsg,
            clickUpdata,
            fileInputRef,
            uploadFile,
            dialogFormVisible,
            firm_click,
            fight,
            img_src,
            modeluploadFile,
            fileRef,
            model_input,
            model_textarea_value,
        }
    }
}
</script>

<style scoped>
.upload {
    width: 100%;
    height: 500px;
    cursor: pointer;
}

.photo_box {
    width: 100%;
    height: 200px;
    border: 1.5px dashed #c9c6c6;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.b_photo {
    width: 100%;
    height: 100%;
}

.b_photo img {
    max-width: 100%;
    max-height: 100%;
}
</style>
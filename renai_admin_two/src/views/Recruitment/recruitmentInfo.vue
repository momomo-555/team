<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 19:02:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 13:36:55
 * @FilePath: \renai_admin_two\src\views\Recruitment\recruitmentInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card style="background-color: azure;">
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">培训信息</span>
            </div>
        </template>
        <div>
            <el-card style="margin-bottom: 20px;" v-for="(item, index) in divMsg" :key="index">
                <template #header>
                    <div class="card-header">
                        <div style="margin-bottom:10px;color:coral;font-size:20px;">{{ item.key }}</div>
                    </div>
                </template>
                <div>
                    <el-row :gutter="60">
                        <el-col :span="index == 3 ? 24 : 14">
                            <el-input v-model="item.value" style="width:100%;" :rows="4" type="textarea"
                                :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
                        </el-col>
                        <el-col :span="10" v-show="index == '3' ? false : true">
                            <div class="photo_box">
                                <div class="word" v-if="!item.id">
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
                </div>
                <el-button type="primary" style="margin-top: 20px;" @click="click_updata(item)">
                    <el-icon style="margin-right: 3px;">
                        <RefreshRight />
                    </el-icon>
                    更新</el-button>
            </el-card>

        </div>
    </el-card>
</template>

<script>
import { mapStatus } from '@/utils'
import { uploadPhotoAPI, recruitmentInfoAPI, recruitmentInfoEditorAPI } from '@/api/message'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'recruitmentInfo',
    setup() {
        // 创建图片input框的ref
        const fileInputRef = ref('')
        // 存储所有盒子的内容
        const divMsg = reactive([])
        // 控制图片
        // let fight = reactive({
        //     word: true,
        //     photo: false,
        // })
        // 图片触发
        async function uploadFile(item, val) {
            const fd = new FormData();
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
        // 点击更新 
        async function click_updata(val) {
            if (!confirm("你确定要更新吗？")) {
                return
            }
            let axiosMsg = {
                id: val.id,
                key: val.key,
                value: val.value
            }
            console.log(axiosMsg,'...',val)
            const res = await recruitmentInfoEditorAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 发请求加载内容
        async function axios_message() {
            const res = await recruitmentInfoAPI()
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
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message()
        })
        return {

            uploadFile,
            divMsg,
            fileInputRef,
            click_updata,
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
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 18:57:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 13:36:14
 * @FilePath: \renai_admin_two\src\views\firstPage\learnStyle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card style="background-color: azure;">
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">学习方式</span>
            </div>
        </template>
        <el-card style="margin-bottom: 20px;" v-for="(item, index) in divMsg" :key="index">
            <template #header>
                <div class="card-header">
                    <div style="margin-bottom:10px;color:coral;font-size:20px;">{{ item.name }}</div>
                </div>
            </template>
            <div>
                <el-row :gutter="60">
                    <el-col :span="14">
                        <el-input v-model="item.value" style="width:100%;" :rows="4" type="textarea"
                            :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
                    </el-col>
                    <el-col :span="10">
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

                <el-button type="primary" style="margin-top: 20px;" @click="click_updata(item)">
                    <el-icon style="margin-right: 3px;">
                        <RefreshRight />
                    </el-icon>
                    更新</el-button>
            </div>
        </el-card>
    </el-card>
</template>

<script>
import { mapStatus } from '@/utils'
import { learnStyleAPI, uploadPhotoAPI, learnStyleEditorAPI } from '@/api/message'
import { ref, reactive, onMounted, resolveDirective } from 'vue'
export default {
    name: 'learnStyle',
    setup() {
        // 图片src
        // const img_src = ref('')
        // 创建图片input框的ref
        const fileInputRef = ref('')
        // 存储所有盒子的内容
        const divMsg = reactive([])
        // 图片触发
        async function uploadFile(item, val) {
            const fd = new FormData();
            fd.append('file', fileInputRef.value[val].files[0]);
            // console.log(fileInputRef.value[val].files[0])
            // console.log(fileInputRef.value[val].files[0].type)
            const res = await uploadPhotoAPI(item.id, fd)
            // console.log(res,'...')
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
                key: val.name,
                value: val.value
            }
            const res = await learnStyleEditorAPI(axiosMsg)
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
            const res = await learnStyleAPI()
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
            // img_src,
            click_updata
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
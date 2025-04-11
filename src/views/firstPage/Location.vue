<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 18:58:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-14 13:31:31
 * @FilePath: \renai_admin_two\src\views\firstPage\Location.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">社团位置</span>
            </div>
        </template>
        <div>
            <div class="photo_box" style="margin-bottom: 40px;">
                <div class="word" v-show="fight.word">
                    <label for="upload_lo" style="cursor:pointer">
                        <div>+</div>
                        <div>更改图片</div>
                    </label>
                </div>
                <div class="b_photo" v-show="fight.photo">
                    <img :src="img_src">
                    <input id="upload_lo" type="file" class="upload" ref="fileInputRef" @change="uploadFile">
                </div>
            </div>
            <el-input v-model="textarea_value" style="width:100%;" :rows="4" type="textarea" :show-word-limit="true"
                maxlength="800" placeholder="请输入内容" />
            <el-button type="primary" style="margin-top: 20px;" @click="click_updata">
                <el-icon style="margin-right: 3px;">
                    <RefreshRight />
                </el-icon>
                更新</el-button>
        </div>
    </el-card>
    <!-- 更新提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible" title="警告" width="500">
            <span style="color:red">确认要更新吗!</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="clickUpdata()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { uploadPhotoAPI, LocationAPI, LocationAPIEditorAPI } from '@/api/message'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'Location',
    setup() {
        const centerDialogVisible = ref(false)
        // 输入框内容
        const textarea_value = ref('')
        // 创建图片input框的ref
        const fileInputRef = ref('')
        // 控制图片生成 
        let fight = reactive({
            word: true,
            photo: false
        })
        let id = ref(0)
        // 图片的src 
        const img_src = ref('')
        // 图片上传
        async function uploadFile() {
            const fd = new FormData();
            fd.append('file', fileInputRef.value.files[0]);
            const res = await uploadPhotoAPI(id.value,fd)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                fight.word = false
                fight.photo = true
                img_src.value = `http://106.14.30.173:8008/api/reception/get/picture/${id.value}?time=${Date.now()}`
                // setTimeout(() => {
                //     window.location.reload();
                // }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击更新 
        function click_updata() {
            centerDialogVisible.value = true
        }
        // 点击更新 
        async function clickUpdata() {
            centerDialogVisible.value = false
            let data = {
                id: id.value,
                value: textarea_value.value
            }
            const res = await LocationAPIEditorAPI(data)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 获取页面内容
        async function axios_message() {
            const res = await LocationAPI()
            if (res.code == 0) {
                if (res.data) {
                    textarea_value.value = res.data.value
                    img_src.value = `http://106.14.30.173:8008/api/reception/get/picture/${res.data.id}?time=${Date.now()}`
                    if (img_src.value) {
                        fight.photo = true
                        fight.word = false
                    }
                    id.value = res.data.id
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message();
        })

        return {
            fight,
            img_src,
            clickUpdata,
            uploadFile,
            fileInputRef,
            textarea_value,
            centerDialogVisible,
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
    height: 300px;
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
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 18:55:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-13 13:38:02
 * @FilePath: \renai_admin_two\src\views\firstPage\About.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">关于我们</span>
            </div>
        </template>
        <div>
            <el-input v-model="textarea_value.value" style="width:100%" :rows="8" type="textarea"
                :show-word-limit="true" maxlength="800" :disabled="true" />
        </div>
        <div style="margin-top:20px;">
            <el-button type="primary" @click="click_edit">
                <el-icon style="margin-right: 3px;">
                    <Edit />
                </el-icon>
                编辑</el-button>
            <el-button type="warning" @click="clear_click">
                <el-icon style="margin-right: 3px;">
                    <DocumentDelete />
                </el-icon>
                清空
            </el-button>
        </div>
    </el-card>
    <!-- 模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible" width="500">
            <el-input v-model="textarea_value.value" style="width:100%" :rows="18" type="textarea" placeholder="请输入内容"
                :show-word-limit="true" maxlength="800" />
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
    <!-- 清空提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible" title="警告" width="500">
            <span style="color:red">确认要清空社团简介吗!</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="firm_clear">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { AboutAPI, AboutEditorAPI } from '@/api/message'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'About',
    setup() {
        // 是否显示清空提示框
        const centerDialogVisible = ref(false)
        // 是否显示弹框
        const dialogFormVisible = ref(false)
        // 输入框的值
        const textarea_value = ref('')
        // 点击编辑
        function click_edit() {
            dialogFormVisible.value = true
        }
        // 编辑--点击确认，发送请求
        function firm_click() {
            // dialogFormVisible.value = false
            firm_axios(textarea_value)
        }
        // 确认--发送请求
        async function firm_axios(val) {
            // 修改弹窗
            dialogFormVisible.value = false
            // 清空弹窗
            centerDialogVisible.value = false
            let data = {
                id: val.value.id,
                value: val.value.value
            }
            const res = await AboutEditorAPI(data)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //是否清空 
        function clear_click() {
            // alert('请确认是否清空')
            // textarea_value.value=''
            centerDialogVisible.value = true
        }
        // 清空--发请求，确认清空,清空内容
        function firm_clear() {
            textarea_value.value.value = ''
            firm_axios(textarea_value)
        }
        // 第一次加载内容
        async function axios_msg() {
            const res = await AboutAPI()
            if (res.code == 0) {
                textarea_value.value = res.data
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_msg()
        })
        return {
            textarea_value,
            dialogFormVisible,
            click_edit,
            firm_click,
            clear_click,
            centerDialogVisible,
            firm_clear,
        }
    }
}
</script>

<style scoped>
.el-card {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-05 19:02:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-10 18:38:26
 * @FilePath: \renai_admin_two\src\views\Recruitment\recruitmentTime.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">培训时间</span>
            </div>
        </template>
        <div>
            <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick" addable closable
                @tab-remove="removeClick" @tab-add="addClick">
                <el-tab-pane :label="'第' + (index + 1) + '段'" :name="'第' + (index + 1) + '段'"
                    v-for="(item, index) in page_arr" :key="index">{{ '第' + (index + 1) + '段' }}
                    <div style="margin:20px 0;">
                        <el-input style="margin-bottom: 20px;" v-model="item.name" placeholder="请输这段时间的名称"></el-input>
                        <div class="demo-date-picker">
                            <div class="block">
                                <!-- <span class="demonstration">Default</span> -->
                                <el-date-picker :editable="false" type="daterange" range-separator="To"
                                    v-model="edit_time_value"
                                    :start-placeholder="item.timeStart ? item.timeStart : '请输入开始时间'"
                                    :end-placeholder="item.timeFinish ? item.timeFinish : '请输入结束时间'" size="default" />
                            </div>
                        </div>
                    </div>
                    <el-button type="primary" style="margin-top: 20px;" @click="click_updata(index, item)">
                        <el-icon style="margin-right: 3px;">
                            <RefreshRight />
                        </el-icon>
                        更新</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
    <!-- 模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible" width="500" title="请选择时间段">
            <div style="margin:20px 0;">
                <el-input style="margin-bottom: 20px;" v-model="timeName" placeholder="请输这段时间的名称"></el-input>
                <div class="demo-date-picker">
                    <div class="block">
                        <!-- <span class="demonstration">Default</span> -->
                        <el-date-picker :editable="false" v-model="value_time_model" type="daterange"
                            range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" size="default" />
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
    <!-- 更新提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible" title="警告" width="500">
            <span style="color:red">确认要更新吗!</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="clickUpdata">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { recruitmentTimeAPI, recruitmentTimeEditorAPI, recruitmentTimeDeleteAPI, recruitmentTimeAddAPI } from '@/api/message'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'recruitmentTime',
    setup() {
        // 时间的名称
        let timeName = ref('')
        // 更新提示框
        const centerDialogVisible = ref(false)
        const Time = reactive({
            time1: '',
            time2: '',
        })
        // 修改时间绑定
        const edit_time_value = ref('')
        // 时间表输入
        const value_time_model = ref([])
        const dialogFormVisible = ref(false)
        // 页面数据
        let page_arr = reactive([])
        // 绑定的卡片
        const activeName = ref('第1段')
        //时间
        const timeEdit = reactive({ value1: '', value2: '', id: 0 })
        // 更新--点击更新
        function click_updata(val, item) {
            if (!edit_time_value.value) {
                ElMessage.warning('请选择时间')
                return
            }
            let match = activeName.value.match(/\d+/);
            if (!page_arr[match[0] - 1].name) {
                ElMessage.warning('请输入这段时间的名称')
                return
            }
            centerDialogVisible.value = true
            // console.log(item, 'item', edit_time_value.value)
            timeEdit.value1 = time_change(edit_time_value.value[0])
            timeEdit.value2 = time_change(edit_time_value.value[1])
            timeEdit.id = item.id
        }
        function time_change(val) {
            const date = new Date(val)
            if (isNaN(date.getTime())) {
                throw new Error('这个不是正确的日期')
            }
            // 提取年月日，并格式化
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const day = date.getDate().toString().padStart(2, '0')
            // 拼接成目标格式
            return `${year}-${month}-${day}`;
        }
        // 更新--发请求
        async function clickUpdata() {
            centerDialogVisible.value = false
            // 把key截取出来
            let match = activeName.value.match(/\d+/);
            let data = {
                key: page_arr[match[0] - 1].name,
                value1: timeEdit.value1,
                value2: timeEdit.value2,
                id: timeEdit.id
            }
            // console.log(data, 'data', timeEdit)
            const res = await recruitmentTimeEditorAPI(data)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击的时候触发
        function handleClick(val) {
            edit_time_value.value = ''
            activeName.value = val.props.name
        }
        // 删除的时候触发
        async function removeClick(val) {
            if (page_arr.length <= 3) {
                ElMessage.warning('时间段不能小于三')
                return
            }
            if (!confirm("你确定要删除吗？")) {
                return
            }
            // 删除成功发生
            let match = val.match(/\d+/);
            let data = { id: page_arr[match[0] - 1].id }
            const res = recruitmentTimeDeleteAPI(data)
            if (res.code == 0) {
                ElMessage.success('删除成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 增加--确认框 
        async function firm_click() {
            if (!value_time_model.value.length > 0) {
                ElMessage.warning('请选择时间！')
                return
            }
            if (!timeName.value) {
                ElMessage.warning('请输入这段时间的名称！')
                return
            }
            dialogFormVisible.value = false
            if (value_time_model.value[0]) {
                Time.time1 = time_change(value_time_model.value[0])
            }
            if (value_time_model.value[1]) {
                Time.time2 = time_change(value_time_model.value[1])
            }
            let axiosMsg = {
                key: timeName.value,
                value_time_model: Time.time1,
                value2: Time.time2
            }
            const res = await recruitmentTimeAddAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('增加成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 增加的时候触发
        function addClick() {
            dialogFormVisible.value = true
            if (page_arr.length > 5) {
                ElMessage.warning('时间段不能超过5')
                return
            }
            timeName.value = ''
        }
        // 获取页面内容
        async function axios_message() {
            const res = await recruitmentTimeAPI()
            if (res.code == 0) {
                if (res.data) {
                    res.data.forEach(item => {
                        page_arr.push(item)
                    })
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 获取所有内容
        onMounted(() => {
            axios_message()
        })
        return {
            activeName,
            handleClick,
            removeClick,
            addClick,
            page_arr,
            dialogFormVisible,
            firm_click,
            value_time_model,
            Time,
            timeEdit,
            edit_time_value,
            click_updata,
            clickUpdata,
            centerDialogVisible,
            timeName,
        }
    }
}
</script>

<style scoped></style>
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">正在注册</span>
            </div>
        </template>
        <!-- 内容区 -->
        <div style="width:100%;margin-top: 20px;text-align: center;font-size:18px;color: #636161;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <p>邮箱</p>
                </el-col>
                <el-col :span="4">
                    <p>姓名</p>
                </el-col>
                <el-col :span="4">
                    <p>年份</p>
                </el-col>
                <el-col :span="5">
                </el-col>
                <el-col :span="5">
                    <p>操作</p>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top: 10px;">
            <el-collapse>
                <el-collapse-item :name="index" v-for="(item, index) in user_arr" :key="index">
                    <template #title>
                        <el-row :gutter="20" style="font-size:15px; color: #868383;">
                            <el-col :span="4">
                                <p>{{ item.mailbox }}</p>
                            </el-col>
                            <el-col :span="4">
                                <p>{{ item.name }}</p>
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker v-model="select_grade" style="width:100%" type="year"
                                    placeholder="请选择年级" />
                            </el-col>
                            <el-col :span="5">

                            </el-col>
                            <el-col :span="5" style="display:flex;align-items: center;justify-content: center;">
                                <!-- 去除默认点击事件 -->
                                <!-- <span class="iconfont icon-a-xingzhuangjiehebeifen5"></span> -->
                                <div @click.stop="stopCollapse"
                                    style="display:flex;align-items: center;justify-content: center;">
                                    <el-dropdown split-button type="primary">
                                        {{ select.value }}
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="click_agree('同意', item)">同意</el-dropdown-item>
                                                <el-dropdown-item
                                                    @click="click_reject('拒绝', item)">拒绝</el-dropdown-item>
                                                <el-dropdown-item @click="click_block('拉黑', item)">拉黑</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <div class="message_list">
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- 分页 -->
        <div style="margin-top: 10px;">
            <el-pagination background layout="prev, pager, next,total" :total="total_page" v-model:page-size="pageSize"
                v-model:current-page="currentPage" @current-change="handleCurrentChange" @prev-click="click_last"
                @next-click="click_next" />
        </div>
    </el-card>
    <!-- 同意提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible.agree" title="确定要同意这个注册！" width="500">
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible.agree = false">取消</el-button>
                    <el-button type="primary" @click="firm_agree">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 拒绝提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible.reject" title="确定要拒绝这个注册！" width="500">
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible.reject = false">取消</el-button>
                    <el-button type="primary" @click="firm_reject">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 拉黑弹框 -->
    <div>
        <el-dialog v-model="centerDialogVisible.block" title="确定要拉黑这个用户？" width="500">
            <!-- <div> -->
            <!-- <el-input v-model="block.input1" placeholder="请输入邮箱"> </el-input> -->
            <!-- <el-input v-model="block.input2" style="width:100%;margin-top: 20px;" :rows="4" type="textarea"
                    :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
            </div> -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible.block = false">取消</el-button>
                    <el-button type="primary" @click="firm_block">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import router from '@/router'
import { ref, reactive, onMounted } from 'vue'
import { mapStatus } from '@/utils'
import { agreeRegisterAPI, rejectRegisterAPI, userGetMessageAPI, registerAddBlockAPI } from '@/api/user'
export default {
    name: 'registerUsers',
    setup() {
        // 拉黑信息的获取
        const block = reactive({
            input1: '',
            input2: '',
        })
        let uuid = ref('')
        // 邮箱获取
        const agree_mailbox = ref('')
        // 选择年级
        const select_grade = ref('')
        // 模态框的fight
        const centerDialogVisible = reactive({
            agree: false,
            reject: false,
            block: false,
        })
        // 选择的操作
        const select = reactive({
            value: '请选择操作',
        })
        // 存储当前页面的人员信息
        const user_arr = reactive([])
        // 当前页数
        const currentPage = ref(1)
        // 一页渲染多少条数据
        const pageSize = ref(5)
        // 总条数
        const total_page = ref(0)
        //正常渲染---第n次发请求
        async function axios_message_next(val) {
            let data = {
                status: 3
            }
            const res = await userGetMessageAPI(val.value, pageSize.value, data)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.list.forEach(item => {
                        user_arr.push(item)
                    })
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // // 页数改变的时候触发
        function handleCurrentChange(val) {
            currentPage.value = val
            user_arr.splice(0, user_arr.length)
            // 发请求获取第二次数据
            axios_message_next(currentPage)
        }
        //  // 点击上一页
        function click_last(val) {
            currentPage.value = val - 1
            user_arr.splice(0, user_arr.length)
            // 不需要加载因为点击上一页也会同时触发页数变化的函数
        }
        // 点击下一页
        function click_next(val) {
            currentPage.value = val + 1
            user_arr.splice(0, user_arr.length)
        }
        // 年--时间转换
        function time_change(val) {
            const date = new Date(val)
            //检查date是否有效
            if (isNaN(date.getTime())) {
                throw new Error('这个不是正确的日期');
            }
            //提取年月日，并格式化
            const year = date.getFullYear()
            return year
        }
        function click_agree(val, item) {
            if (!select_grade.value) {
                ElMessage.warning('请选择时间')
                return
            }
            uuid.value = item.uuid
            centerDialogVisible.agree = true
        }
        // 同意--发请求
        async function firm_agree() {
            centerDialogVisible.agree = false
            let axiosMsg = {
                grade: String(time_change(select_grade.value)),
                user_uuid: uuid.value,
            }
            const res = await agreeRegisterAPI(axiosMsg)
            if (res.code == 0) {
                uuid.value = ''
                ElMessage.success('操作成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击拒绝 
        function click_reject(val, item) {
            uuid.value = item.uuid
            centerDialogVisible.reject = true
        }
        async function firm_reject() {
            centerDialogVisible.reject = false
            let axiosMsg = {
                user_uuid: uuid.value,
            }
            const res = await rejectRegisterAPI(axiosMsg)
            if (res.code == 0) {
                uuid.value = ''
                ElMessage.success('操作成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击拉黑
        function click_block(val, item) {
            centerDialogVisible.block = true
            agree_mailbox.value = item.mailbox
            uuid.value = item.uuid
        }
        // 
        async function firm_block() {
            // agree_mailbox
            centerDialogVisible.block = false
            let axiosMsg = {
                mailbox: agree_mailbox.value,
                user_uuid: uuid.value
            }
            const res = await registerAddBlockAPI(axiosMsg)
            if (res.code == 0) {
                agree_mailbox.value = ''
                // 成功
                ElMessage.success('操作成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 加载页面内容
        async function axios_message() {
            let data = {
                status: 3
            }
            const res = await userGetMessageAPI(1, pageSize.value, data)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.list.forEach(item => {
                        user_arr.push(item)
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
            total_page,
            pageSize,
            currentPage,
            handleCurrentChange,
            click_last,
            click_next,
            user_arr,
            centerDialogVisible,
            select,
            select_grade,
            click_agree,
            click_reject,
            click_block,
            firm_agree,
            agree_mailbox,
            firm_reject,
            firm_block,
            block,
        }
    }
}
</script>

<style scoped>
.edit_con span {
    color: #959090;
}

.block {
    display: inline-block;
}

.el-row {
    width: 100%;
    /* color: #636161; */
}

.message_list {
    font-size: 15px;
    width: 90%;
    margin: 0 auto;
}

.message_list div {
    display: flex;
    justify-content: space-between;
}

.message_list p span {
    color: #868383;
}
</style>
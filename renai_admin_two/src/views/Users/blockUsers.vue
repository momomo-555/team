<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">黑名单</span>
            </div>
        </template>
        <!-- 增加 -->
        <el-button type="warning" @click="click_add()">
            <el-icon style="margin-right: 3px;">
                <Plus />
            </el-icon>
            增加</el-button>
        <!-- 内容区 -->
        <div style="width:100%;margin-top: 20px;text-align: center;font-size:18px;color: #636161;">
            <el-row :gutter="60">
                <el-col :span="4">
                    <p>邮箱</p>
                </el-col>
                <el-col :span="14">

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
                            <el-col :span="14">

                            </el-col>
                            <el-col :span="5">
                                <!-- 去除默认点击事件 -->
                                <div @click.stop="stopCollapse" style="width:100%;height:100%;">
                                    <el-button type="danger" @click="click_remove(item)">删除</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <div class="message_list">
                        <p style="margin-top: 20px;word-break: break-all;"><span>原因 :
                            </span>{{ item.password }}
                        </p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="margin-top: 10px;">
            <el-pagination background layout="prev, pager, next,total" :total="total_page" v-model:page-size="pageSize"
                v-model:current-page="currentPage" @current-change="handleCurrentChange" @prev-click="click_last"
                @next-click="click_next" />
        </div>
    </el-card>
    <!-- 删除提示框 -->
    <div>
        <el-dialog v-model="centerDialogVisible" title="警告" width="500">
            <span style="color:red">确认要删除这个黑名单用户？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="firm_remove">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 增加弹框 -->
    <div>
        <el-dialog v-model="centerDialogVisible_add" title="请输入信息" width="500">
            <!-- <div>
                <el-input v-model="add.input1" placeholder="请输入邮箱"> </el-input>
                <el-input v-model="add.input2" style="width:100%;margin-top: 20px;" :rows="4" type="textarea"
                    :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
            </div>  -->
            <el-input v-model="add.input1" placeholder="请输入邮箱"> </el-input>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible_add = false">取消</el-button>
                    <el-button type="primary" @click="firm_add">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { userGetMessageAPI, deleteBlockAPI, addBlockAPI } from '@/api/user'
import router from '@/router'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'blockUsers',
    setup() {
        // 增加输入信息
        const add = reactive({
            input1: '',
            input2: '',
        })
        const centerDialogVisible_add = ref(false)
        // 删除提示框
        const centerDialogVisible = ref(false)
        //获取邮箱 数据准备
        const data_remove = reactive({
            mailbox: '',
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
                status: 4
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
        // 点击删除
        function click_remove(val) {
            // 赋值邮箱
            data_remove.mailbox = val.mailbox
            centerDialogVisible.value = true
        }
        async function firm_remove() {
            centerDialogVisible.value = false
            let axiosMsg = {
                mailbox: data_remove.mailbox
            }
            const res = await deleteBlockAPI(axiosMsg)
            if (res.code == 0) {
                data_remove.mailbox = ''
                ElMessage.success('操作成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击增加 
        function click_add() {

            centerDialogVisible_add.value = true
        }
        async function firm_add() {
            if (!add.input1) {
                ElMessage.warning('请输入邮箱')
                return
            }
            centerDialogVisible_add.value = false
            let axiosMsg = {
                mailbox: add.input1,
            }
            const res = await addBlockAPI(axiosMsg)
            if (res.code == 0) {
                add.input1 = ''
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
                status: 4
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
            click_remove,
            data_remove,
            firm_remove,
            centerDialogVisible,
            click_add,
            centerDialogVisible_add,
            firm_add,
            add,
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
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">
                    获奖信息</span>
            </div>
        </template>
        <el-button type="warning" style="margin-bottom: 15px;" @click="add_click">
            <el-icon style="margin-right: 3px;">
                <Plus />
            </el-icon>
            增加</el-button>
        <div class="box_con" v-for="(item, index) in award_arr" :key="index">
            <el-row :gutter="20">
                <el-col :span="5">
                    <p>姓名：{{ item.name }}</p>
                </el-col>
                <el-col :span="5">
                    <p>年份：{{ item.time }}</p>
                </el-col>
                <el-col :span="9">
                    <p>奖项：{{ item.awards }}</p>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="edit_click(item)">
                        <el-icon style="margin-right: 3px;">
                            <RefreshRight />
                        </el-icon>修改</el-button>
                    <el-button type="danger" @click="click_remove(item)">
                        <el-icon style="margin-right: 3px;">
                            <Delete />
                        </el-icon>
                        删除</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-pagination background layout="prev, pager, next,total" :total="total_page" v-model:page-size="pageSize"
                v-model:current-page="currentPage" @current-change="handleCurrentChange" @prev-click="click_last"
                @next-click="click_next" />
        </div>
    </el-card>
    <!-- 修改模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible.edit" width="500" title="请输入内容" class="modal-class" :show-close="false">
            <div style="margin-top:20px;">
                <div>
                    <el-input v-model="model_edit.input1" placeholder="请输名称"></el-input>
                    <el-input style="margin-top: 20px;" v-model="model_edit.input2" placeholder="请输入年份"></el-input>
                    <el-input v-model="model_edit.input3" style="width:100%;margin-top: 20px;" :rows="4" type="textarea"
                        :show-word-limit="true" maxlength="800" placeholder="请输入奖项名称" />
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible.edit = false">取消</el-button>
                    <el-button type="primary" @click="clickUpdata">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 增加模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible.add" width="500" title="请输入内容" class="modal-class" :show-close="false">
            <div style="margin-top:20px;">
                <div>
                    <el-input v-model="model_add.input1" placeholder="请输名称"></el-input>
                    <el-input style="margin-top: 20px;" v-model="model_add.input2" placeholder="请输入年份"></el-input>
                    <el-input v-model="model_add.input3" style="width:100%;margin-top: 20px;" :rows="4" type="textarea"
                        :show-word-limit="true" maxlength="800" placeholder="请输入奖项名称" />
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible.add = false">取消</el-button>
                    <el-button type="primary" @click="clickAdddata">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { awardInfoAPI, awardInfoEditorAPI, awardInfoDeleteAPI, awardInfoAddAPI } from '@/api/message.js'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'awardInfo',
    setup() {
        // 修改框
        let model_edit = reactive({
            input1: '',
            input2: '',
            input3: '',
            uuid: '',
        })
        //增加
        let model_add = reactive({
            input1: '',
            input2: '',
            input3: '',
            uuid: '',
        })
        // 修改模态框
        const dialogFormVisible = reactive({
            edit: false,
            add: false,
        })
        // 存储当前页面数据
        let award_arr = reactive([])
        // 加载中...
        const axios_fight = ref(false)
        // 总条数
        const total_page = ref(0)
        // 当前页数
        const currentPage = ref(1)
        // 每页显示数目
        const pageSize = ref(5)
        //正常渲染---第n次发请求
        async function axios_message_next(val) {
            const res = await awardInfoAPI(val.value, pageSize.value)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.prizeList.forEach(item => {
                        award_arr.push(item)
                    })
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 页数改变的时候触发
        function handleCurrentChange(val) {
            // val---当前页数
            // console.log(val)
            currentPage.value = val
            award_arr.splice(0, award_arr.length)
            axios_message_next(currentPage.value)
        }
        // 点击上一页
        function click_last(val) {
            // 点击前的当前页码
            // console.log(val)
            currentPage.value = val - 1
            award_arr.splice(0, award_arr.length)
            // 不需要加载因为点击上一页也会同时触发页数变化的函数
            // axios_message_next(currentPage.value)
        }
        // 点击的下一页
        function click_next(val) {
            // 页数变化
            currentPage.value = val + 1
            award_arr.splice(0, award_arr.length)
            // 不需要加载因为点击上一页也会同时触发页数变化的函数
            // axios_message_next(currentPage.value)
        }
        // 修改确认--请求
        async function clickUpdata() {
            dialogFormVisible.edit = false
            let axiosMsg = {
                uuid: model_edit.uuid,
                name: model_edit.input1,
                time: model_edit.input2,
                awards: model_edit.input3,
            }
            const res = await awardInfoEditorAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('修改成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 修改函数
        function edit_click(val) {
            // console.log(val)
            dialogFormVisible.edit = true
            // 赋值方便修改
            model_edit.input1 = val.name
            model_edit.input2 = val.time
            model_edit.input3 = val.awards
            model_edit.uuid = val.uuid
        }
        // 删除--发请求
        async function click_remove(val) {
            if (!confirm("你确定要删除这条信息吗？")) {
                return
            }
            let axiosMsg = {
                uuid: val.uuid
            }
            const res = await awardInfoDeleteAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('删除成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 增加--发请求
        async function clickAdddata() {
            dialogFormVisible.add = false
            let axiosMsg = {
                name: model_add.input1,
                time: model_add.input2,
                awards: model_add.input3,
            }
            const res = await awardInfoAddAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('增加成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 触发增加时间
        function add_click() {
            dialogFormVisible.add = true
        }

        //初次加载
        async function axios_message() {
            const res = await awardInfoAPI(1, pageSize.value)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.prizeList.forEach(item => {
                        award_arr.push(item)
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
            currentPage,
            pageSize,
            handleCurrentChange,
            click_last,
            click_next,
            total_page,
            award_arr,
            edit_click,
            dialogFormVisible,
            clickUpdata,
            model_edit,
            click_remove,
            add_click,
            model_add,
            clickAdddata,
        }
    }

}
</script>

<style scoped>
.box_con {
    border-top: 1px solid rgb(167, 174, 174);
    border-bottom: 1px solid rgb(167, 174, 174);
    margin-bottom: 20px;
    padding: 10px;
    color: #6a6767;

}

.el-col {
    display: flex;
    align-items: center;
}
</style>
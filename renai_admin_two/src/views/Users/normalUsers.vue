<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">正常用户</span>
            </div>
        </template>
        <!-- 搜索区 -->
        <div>
            <el-dropdown split-button type="warning" style="margin-right: 10px;">
                {{ seekStyle }}
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="click_name('姓名')">姓名</el-dropdown-item>
                        <el-dropdown-item @click="click_grade('年级')">年级</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-input v-show="seekStyle == '姓名' ? true : false" v-model="select.name" style="width: 240px"
                placeholder="请输入姓名" />
            <div class="block" v-show="seekStyle == '年级' ? true : false">
                <!-- <span class="demonstration">请选择年级</span> -->
                <el-date-picker v-model="select.grade" type="year" placeholder="请选择年级" />
            </div>
            <el-button style="margin-left:10px;" type="primary"
                v-show="seekStyle == '姓名' || seekStyle == '年级' ? true : false" @click="clickSearch">
                <el-icon style="margin-right: 3px;">
                    <Search />
                </el-icon>搜索</el-button>
        </div>
        <!-- 内容区 -->
        <div style="width:100%;margin-top: 20px;text-align: center;font-size:18px;color: #636161;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <p>姓名</p>
                </el-col>
                <el-col :span="4">
                    <p>性别</p>
                </el-col>
                <el-col :span="4">
                    <p>年级</p>
                </el-col>
                <el-col :span="5">
                    <p>职位</p>
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
                                <p>{{ item.name }}</p>
                            </el-col>
                            <el-col :span="4">
                                <p>{{ item.sex }}</p>
                            </el-col>
                            <el-col :span="4">
                                <p>{{ item.grade }}</p>
                            </el-col>
                            <el-col :span="5">
                                <p>{{ item.position }}</p>
                            </el-col>
                            <el-col :span="5">
                                <!-- 去除默认点击事件 -->
                                <div @click.stop="stopCollapse" style="width:100%;height:100%;">
                                    <el-button type="primary" @click="click_updata(item)">修改</el-button>
                                    <el-button type="danger">删除</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <div class="message_list">
                        <el-row :gutter="20" style="margin-top: 10px;">
                            <el-col :span="12">
                                <p><span>昵称 : </span>{{ item.username }}</p>
                            </el-col>
                            <el-col :span="12">
                                <p><span>邮箱 : </span>{{ item.mailbox }}</p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-top: 10px;">
                            <el-col :span="12">
                                <p><span>Q&nbsp;Q : </span>{{ item.qq }}</p>
                            </el-col>
                            <el-col :span="12">
                                <p><span>方向 : </span>{{ item.direction }}</p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-top: 10px;">
                            <el-col :span="12">
                                <p><span>地址 : </span>{{ item.address }}</p>
                            </el-col>
                            <el-col :span="12">
                                <p ><span>创建时间 : </span>{{ item.creat_time }}</p>
                            </el-col>
                        </el-row>
                        <p style="margin-top: 10px;word-break: break-all;"><span>座&nbsp;右&nbsp;铭 :
                            </span>{{ item.motto }}
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
    <!-- 修改模态框 -->
    <div>
        <el-dialog v-model="dialogFormVisible.edit" width="500" title="请输入内容" class="modal-class" :show-close="false">
            <div style="margin-top:20px;">
                <div class="edit_con">
                    <div style="margin-top: 20px;">
                        <span>邮箱：</span>
                        <el-input v-model="editForm.mailbox" style="width: 240px" placeholder="请输入邮箱" />
                    </div>
                    <div style="margin-top: 20px;">
                        <span>姓名：</span>
                        <el-input v-model="editForm.name" style="width: 240px" placeholder="请输入姓名" />
                    </div>
                    <div style="margin-top: 20px;">
                        <span>昵称：</span>
                        <el-input v-model="editForm.nicheng" style="width: 240px" placeholder="请输入昵称" />
                    </div>
                    <div style="margin-top: 20px;">
                        <span>性别：</span>
                        <el-radio-group v-model="editForm.sex">
                            <el-radio value="男">男</el-radio>
                            <el-radio value="女">女</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-top: 20px;">
                        <span>年级：</span>
                        <el-date-picker v-model="editForm.grade" type="year" placeholder="请选择年级" />
                        <!-- <el-input v-model="editForm.grade" style="width: 240px" placeholder="请输入年级" /> -->
                    </div>
                    <div style="margin-top: 20px;">
                        <span>方向：</span>
                        <el-select v-model="editForm.direction" placeholder="请选择方向" style="width:120px;"
                            @change="directionChange">
                            <el-option v-for="item in options_2" :key="item.value" :label="item.label"
                                :value="item.value" :disabled="item.disabled" />
                        </el-select>
                    </div>
                    <div style="margin-top: 20px;">
                        <span>职位：</span>
                        <el-select v-model="editForm.post" placeholder="请选择职位" style="width:120px;"
                            @change="postChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                                :disabled="item.disabled" />
                        </el-select>
                    </div>
                    <div style="margin-top: 20px;">
                        <span>QQ：</span>
                        <el-input v-model="editForm.QQ" style="width: 240px" placeholder="请输入QQ" />
                    </div>
                    <div style="margin-top: 20px;">
                        <span>地址：</span>
                        <el-cascader :ref="cascader" placeholder="请选择地区" size="default" :options="regionData"
                            v-model="Address" @change="handleChange">
                        </el-cascader>
                    </div>
                    <div style="margin-top: 20px;">
                        <span style="margin-bottom: 5px;display:inline-block">座右铭：</span>
                        <el-input v-model="editForm.motto" style="width:100%" :rows="4" type="textarea"
                            :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
                    </div>
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
</template>

<script>
import { mapStatus } from '@/utils'
import { nameSearchAPI, gradeSearchAPI, userGetMessageAPI, editorUserAPI } from '@/api/user'
import router from '@/router'
import { ref, reactive, onMounted } from 'vue'
import { regionData, codeToText, textToCode } from 'element-china-area-data'
export default {
    name: 'normalUsers',
    setup() {
        //判断进行哪种搜索
        let pageChangeStyle = ref('')
        // 地址绑定的数据
        const Address = ref('')
        // 地址选择的ref
        const cascader = ref('')
        //修改数据
        const editForm = reactive({
            name: '',
            nicheng: '',
            // sex:'1',
            sex: '',
            grade: '',
            post: '社团成员',
            direction: '',
            QQ: '',
            chat: '',
            address: '',
            motto: '',
            mailbox: '',
            uuid: '',
        })
        // 模态框
        const dialogFormVisible = reactive({
            edit: false,
        })
        // 存储当前页面的人员信息
        const user_arr = reactive([])
        // 当前页数
        const currentPage = ref(1)
        // 一页渲染多少条数据
        const pageSize = ref(5)
        // 总条数
        const total_page = ref(0)
        // 下拉框的选择
        const options = [
            {
                value: '社长',
                label: '社长',
            },
            {
                value: '副社长',
                label: '副社长',
            },
            {
                value: '负责人',
                label: '负责人',
            },
            {
                value: '社团成员',
                label: '社团成员',
            },
        ]
        // 方向下拉框
        const options_2 = [
            {
                value: '前端',
                label: '前端',
            },
            {
                value: '后端',
                label: '后端',
            },
            {
                value: '人工智能',
                label: '人工智能',
            },
            {
                value: '其他',
                label: '其他',
            },
        ]
        // 输入框内容
        let select = reactive({
            name: '',
            grade: '',
        })
        // 搜索方式
        const seekStyle = ref('请选择搜索方式')
        // 点击姓名
        function click_name(val) {
            seekStyle.value = val
        }
        // 点击年级
        function click_grade(val) {
            seekStyle.value = val
        }
        // 职位选择
        function postChange(val) {
            // 选择的职位
            // console.log(val)
            editForm.post = val
        }
        // 方向选择
        function directionChange(val) {
            editForm.direction = val
        }
        // 地址选择
        function handleChange(val) {
            // 把code变成汉字
            editForm.address = codeToText[val[0]] + '/' + codeToText[val[1]] + '/' + codeToText[val[2]]
        }
        // 年--时间转换
        function time_change(val) {
            const date = new Date(val)
            // 检查Date对象是否有效
            if (isNaN(date.getTime())) {
                throw new Error('这个不是正确的日期');
            }
            // 提取年、月（加1）、日，并格式化
            const year = date.getFullYear();
            // 拼接成目标格式
            return year;
        }
        // 点击搜索--第一次
        async function clickSearch() {
            // 改变搜索方式方式(名字？年级)调用函数
            pageChangeStyle.value = seekStyle.value
            if (pageChangeStyle.value == '年级') {
                user_arr.splice(0, user_arr.length)
                let axiosMsg = {
                    grade: String(time_change(select.grade))
                }
                const res = await gradeSearchAPI(1, pageSize.value, axiosMsg)
                if (res.code == 0) {
                    if (res.data) {
                        total_page.value = +res.data.number
                        res.data.list.forEach(item => {
                            user_arr.push(item)
                        })
                    }
                } else {
                    ElMessage.err(mapStatus.get(res.code))
                }
            } else if (pageChangeStyle.value == '姓名') {
                user_arr.splice(0, user_arr.length)
                let axiosMsg = {
                    name: select.name,
                }
                const res = await nameSearchAPI(1, pageSize.value, axiosMsg)
                if (res.code == 0) {
                    if (res.data) {
                        total_page.value = +res.data.number
                        res.data.list.forEach(item => {
                            user_arr.push(item)
                        })
                    }
                } else {
                    ElMessage.err(mapStatus.get(res.code))
                }

            }
        }
        // 按年级搜索--第n次请求
        async function axios_grade_next(val) {
            user_arr.splice(0, user_arr.length)
            let axiosMsg = {
                grade: String(time_change(select.grade))
            }
            const res = await gradeSearchAPI(val.val, pageSize.value, axiosMsg)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.list.forEach(item => {
                        user_arr.push(item)
                    })
                }
            } else {
                ElMessage.err(mapStatus.get(res.code))
            }
        }
        // 按姓名搜索--第n次请求
        async function axios_name_next(val) {
            user_arr.splice(0, user_arr.length)
            let axiosMsg = {
                name: select.name,
            }
            const res = await nameSearchAPI(val.value, pageSize.value, axiosMsg)
            if (res.code == 0) {
                if (res.data) {
                    total_page.value = +res.data.number
                    res.data.list.forEach(item => {
                        user_arr.push(item)
                    })
                }
            } else {
                ElMessage.err(mapStatus.get(res.code))
            }
        }
        //正常渲染---第n次发请求
        async function axios_message_next(val) {
            let data = {
                status: 1
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
            if (pageChangeStyle.value == '') {
                axios_message_next(currentPage)
            }
            else if (pageChangeStyle.value == '姓名') {
                // 按名字搜索
                axios_name_next(currentPage)
            } else if (pageChangeStyle.value == '年级') {
                // 按名字年级
                axios_grade_next(currentPage)
            }
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

        // 修改--确认修改
        async function clickUpdata() {
            dialogFormVisible.edit = false;
            let axiosMsg = {
                user_uuid: editForm.uuid,
                change_user: {
                    sex: editForm.sex,
                    username: editForm.nicheng,
                    name: editForm.name,
                    address: editForm.address,
                    grade: String(time_change(editForm.grade)),
                    direction: editForm.direction,
                    qq: editForm.QQ,
                    position: editForm.post,
                    motto: editForm.motto,
                    mailbox: editForm.mailbox,
                }
            }
            const res = await editorUserAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('操作成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击修改
        function click_updata(item) {

            dialogFormVisible.edit = true;
            editForm.name = item.name
            editForm.nicheng = item.username
            editForm.sex = item.sex
            editForm.grade = item.grade
            editForm.direction = item.direction
            editForm.post = item.position
            editForm.QQ = item.qq
            editForm.address = item.address
            editForm.motto = item.motto
            // mailbox
            editForm.mailbox = item.mailbox
            editForm.uuid = item.uuid
        }
        // 加载页面内容
        async function axios_message() {
            let data = {
                status: 1
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
            seekStyle,
            click_name,
            click_grade,
            select,
            options,
            postChange,
            total_page,
            pageSize,
            currentPage,
            handleCurrentChange,
            click_last,
            click_next,
            click_updata,
            dialogFormVisible,
            clickUpdata,
            editForm,
            directionChange,
            options_2,
            handleChange,
            regionData,
            cascader,
            Address,
            user_arr,
            clickSearch,
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
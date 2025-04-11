<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">未审核</span>
            </div>
        </template>
        <!--  -->
        <!-- 内容头-->
        <div class="box_art">
            <el-row :gutter="20" style="font-size:20px; color: #868383;">
                <el-col :span="5">
                    <p>文章标题</p>
                </el-col>
                <el-col :span="5">
                    <p>作者名称</p>
                </el-col>
                <el-col :span="5">
                    <p>创作时间</p>
                </el-col>
                <el-col :span="4">
                    <p>阅读量</p>
                </el-col>
                <el-col :span="5">
                    <p>操作</p>
                </el-col>
            </el-row>
        </div>
        <!-- 内容 -->
        <div class="box_art_con" v-for="(item, index) in user_arr" :key="index">
            <el-row :gutter="20" style="font-size:16px;">
                <el-col :span="5">
                    <p>{{ item.title }}</p>
                </el-col>
                <el-col :span="5">
                    <p>{{ item.user_uuid }}</p>
                </el-col>
                <el-col :span="5">
                    <p>{{ item.creat_time }}</p>
                </el-col>
                <el-col :span="4">
                    <p>{{ item.reading_volume }}</p>
                </el-col>
                <el-col :span="5" style="display:flex;justify-content: center;align-items: center;">
                    <!-- <el-button type="primary" @click="click_looK(item)">查看</el-button>
                    <el-button type="danger" @click="click_remove(item)">删除</el-button> -->
                    <el-dropdown split-button type="primary">
                        请选择操作
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="click_looK(item)">查看</el-dropdown-item>
                                <el-dropdown-item @click="click_agree(item)">同意</el-dropdown-item>
                                <el-dropdown-item @click="click_remove(item)">拒绝</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <!-- 分页 -->
        <div style="margin-top: 10px;">
            <el-pagination background layout="prev, pager, next,total" :total="total_page" v-model:page-size="pageSize"
                v-model:current-page="currentPage" @current-change="handleCurrentChange" @prev-click="click_last"
                @next-click="click_next" />
        </div>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
        <div>
            <span class="span_title">标题：</span>
            <p>
                {{ art_con.title }}
            </p>
        </div>
        <div>
            <span class="span_title">内容：</span>
            <p v-html="article"></p>
        </div>
        <div>
            <span class="span_title">标签：</span>
            <p>{{ art_con.label }}</p>
        </div>
        <div>
            <span class="span_title">封面：</span>
            <!-- 图片，有就放，没有就不放 -->
            <div>
                <img style="width:150px;height:150px;" :src="art_con.img_src" alt="封面">
            </div>
        </div>
        <div>
            <span class="span_title">摘要：</span>
            <p>{{ art_con.abstract }}</p>
        </div>
        <div>
            <span class="span_title">可见范围：</span>
            <p>{{ art_con.visibility }}</p>
        </div>
        <div>
            <span class="span_title">文章类型：</span>
            <p>{{ art_con.type }}</p>
        </div>
    </el-drawer>
    <!-- 同意弹框 -->
    <div>
        <el-dialog v-model="centerDialogVisible_agree" title="警告!" width="500">
            <span style="color:red;font-size:17px;">是否确定同意这篇文章!</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible_agree = false">取消</el-button>
                    <el-button type="primary" @click="firm_agree">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 拒绝弹框 -->
    <div>
        <el-dialog v-model="centerDialogVisible" title="请输入信息" width="500">
            <div>
                <!-- <el-input v-model="block.input1" placeholder="请输入邮箱"> </el-input> -->
                <el-input v-model="why_input" style="width:100%;margin-top: 20px;" :rows="6" type="textarea"
                    :show-word-limit="true" maxlength="800" placeholder="请输入内容" />
            </div>
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
</template>

<script>
import { mapStatus } from '@/utils'
import { withoutCheckAPI, editorArticleAPI, getArticleContent } from '@/api/blog'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'withoutCheck',
    setup() {
        // 同意模态框 
        const centerDialogVisible_agree = ref(false)
        // 删除理由 
        const why_input = ref('')
        // 删除fight 
        const centerDialogVisible = ref(false)
        // 存储当前页面的人员信息
        const user_arr = reactive([])
        // 当前页数
        const currentPage = ref(1)
        // 一页渲染多少条数据
        const pageSize = ref(5)
        // 总条数
        const total_page = ref(0)
        // 整体文章所有内容
        const art_con = reactive({
            title: '',
            content: '',
            label: '',
            img_src: '',
            abstract: '',
            visibility: '',
            type: '',
            uuid: '',
        })
        // 内容的ref 
        const article = ref('')
        // 抽屉fight
        const drawer = ref(false)
        // 点击同意 
        function click_agree(item) {
            if (item.article_uuid) {
                art_con.uuid = item.article_uuid
            } else {
                art_con.uuid = ''
            }
            centerDialogVisible_agree.value = true
        }
        // 同意--发请求 
        async function firm_agree() {
            centerDialogVisible_agree.value = false
            let axiosMsg = {
                article_uuid: art_con.uuid,
                process: '已经审核'
            }
            const res = await editorArticleAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('审核成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击拒绝 
        function click_remove(item) {
            if (item.article_uuid) {
                art_con.uuid = item.article_uuid
            } else {
                art_con.uuid = ''
            }
            centerDialogVisible.value = true
        }
        // 拒绝--发请求
        async function firm_remove() {
            centerDialogVisible.value = false
            let axiosMsg = {
                article_uuid: art_con.uuid,
                message: why_input.value,
                process: '草稿'
            }
            const res = await editorArticleAPI(axiosMsg)
            if (res.code == 0) {
                ElMessage.success('打回成功')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // 点击查看--发请求
        async function click_looK(item) {
            drawer.value = true
            let axiosMsg = {
                article_uuid: item.article_uuid
            }
            const res = await getArticleContent(axiosMsg)
            if (res.code == 0) {
                if (res.data) {
                    art_con.title = res.data.article_uuid
                    article.value = res.data.content
                    art_con.label = res.data.label
                    // art_con.img_src = JSON.parse(res.data.data).userUuid 
                    art_con.abstract = res.data.abstract
                    art_con.visibility = res.data.visibility
                    art_con.type = res.data.article_type
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        //正常渲染---第n次发请求
        async function axios_message_next(val) {
            const res = await withoutCheckAPI(val.value, pageSize.value)
            if (res.code == 0) {
                if (res.data) {
                    res.data.list.forEach(item => {
                        user_arr.push(item)
                    })
                    total_page.value = +res.data.number
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        // // 页数改变的时候触发
        function handleCurrentChange(val) {
            currentPage.value = val
            user_arr.splice(0, user_arr.length)
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
        // 发请求--获取当前页面数据
        async function axios_message() {
            const res = await withoutCheckAPI(1, pageSize.value)
            if (res.code == 0) {
                if (res.data) {
                    res.data.list.forEach(item => {
                        user_arr.push(item)
                    })
                    total_page.value = +res.data.number
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
            }
        }
        onMounted(() => {
            axios_message()
        })
        return {
            drawer,
            click_looK,
            article,
            art_con,
            total_page,
            pageSize,
            currentPage,
            user_arr,
            handleCurrentChange,
            click_last,
            click_next,
            click_remove,
            centerDialogVisible,
            firm_remove,
            why_input,
            click_agree,
            centerDialogVisible_agree,
            firm_agree,
        }
    }
}
</script>

<style scoped>
.box_art {
    /* border-bottom:1px solid #2e2e2e; */
    /* margin-bottom: 10px; */
    text-align: center;
}

.box_art_con {
    text-align: center;
    border-top: 1px solid #cec0c0;
    border-bottom: 1px solid #cec0c0;
    padding: 10px 0;
    color: #9e9898;
    margin-top: 20px;
}

.span_title {
    font-size: 20px;
    font-weight: 600;
    color: rgb(220, 90, 116);
    margin-bottom: 5px;
    display: inline-block;
}

.el-drawer div {
    margin-bottom: 10px;
}
</style>
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-size:30px">已审核</span>
            </div>
        </template>
        <!-- 搜索区 -->
        <div style="margin-bottom: 20px;">
            <el-dropdown split-button type="warning" style="margin-right: 10px;">
                {{ seekStyle }}
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="click_name('姓名')">姓名</el-dropdown-item>
                        <el-dropdown-item @click="click_title('标题')">标题</el-dropdown-item>
                        <el-dropdown-item @click="click_label('标签')">标签</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-input v-show="seekStyle == '姓名' ? true : false" v-model="select.name" style="width: 240px"
                placeholder="请输入姓名" />
            <el-input v-show="seekStyle == '标题' ? true : false" v-model="select.title" style="width: 240px"
                placeholder="请输入标题" />
            <div style="display:inline-block">
                <el-select v-show="seekStyle == '标签' ? true : false" v-model="select.label" placeholder="请选择表签"
                    style="width:240px;" @change="labelChange">
                    <el-option v-for="item in options_2" :key="item.value" :label="item.label" :value="item.value"
                        :disabled="item.disabled" />
                </el-select>
            </div>
            <el-button style="margin-left:10px;" type="primary"
                v-show="seekStyle == '姓名' || seekStyle == '标题' || seekStyle == '标签' ? true : false"
                @click="clickSearch">
                <el-icon style="margin-right: 3px;">
                    <Search />
                </el-icon>搜索</el-button>
        </div>
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
                <el-col :span="5">
                    <el-button type="primary" @click="click_looK(item)">查看</el-button>
                    <el-button type="danger" @click="click_remove(item)">打回草稿</el-button>
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
    <!-- 删除弹框 -->
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
import { alreadyCheckAPI, editorArticleAPI, getArticleContent } from '@/api/blog'
import { ref, reactive, onMounted } from 'vue'
export default {
    name: 'alreadyCheck',
    setup() {
        //判断进行哪种搜索
        let pageChangeStyle = ref('')
        // 标签选择
        const options_2 = [
            {
                value: '前端',
                label: '前端',
            }, {
                value: '后端',
                label: '后端',
            }, {
                value: 'C/C++',
                label: 'C/C++',
            }, {
                value: '人工智能',
                label: '人工智能',
            }, {
                value: '数据结构',
                label: '数据结构',
            }, {
                value: '学习',
                label: '学习',
            }, {
                value: '其他',
                label: '其他',
            },
        ]
        // 搜索方式信息
        const select = reactive({
            name: '',
            title: '',
            label: '',
        })
        const seekStyle = ref('请选择搜索方式')
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
        // 标签选择
        function labelChange(val) {
            select.label = val
        }
        // 点击第姓名
        function click_name(val) {
            seekStyle.value = val
        }
        //点击标题
        function click_title(val) {
            seekStyle.value = val
        }
        // 点击表签
        function click_label(val) {
            seekStyle.value = val
        }
        // 点击删除 
        function click_remove(item) {
            if (item.article_uuid) {
                art_con.uuid = item.article_uuid
            } else {
                art_con.uuid = ''
            }
            centerDialogVisible.value = true
        }
        // 删除--发请求
        async function firm_remove() {
            centerDialogVisible.value = false
            let axiosMsg = {
                article_uuid: art_con.uuid,
                message: why_input.value,
                process:'草稿'
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
        async function click_looK(item){
            drawer.value = true
            let axiosMsg = {
                article_uuid: item.article_uuid
            }
            const res = await getArticleContent(axiosMsg)
            if (res.code == 0) {
                if(res.data){
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
        // 点击搜索--第一次
        async function clickSearch() {
            pageChangeStyle.value = seekStyle.value
            if (pageChangeStyle.value == '姓名') {
                axios_message('', select.name, '')
            } else if (pageChangeStyle.value == '标题') {
                axios_message('', '', select.title)
            } else if (pageChangeStyle.value == '标签') {
                axios_message(select.label, '', '')
            }
        }
        //发请求--第n次获取
        //正常渲染---第n次发请求
        async function axios_message_next(a, b, c, val) {
            let data = {
                label: a,
                name: b,
                title: c
            }
            const res = await alreadyCheckAPI(val.value, pageSize.value, data)
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
        // 页数改变的时候触发
        function handleCurrentChange(val) {
            currentPage.value = val
            user_arr.splice(0, user_arr.length)
            // axios_message_next(currentPage)
            // 发请求获取第二次数据
            if (pageChangeStyle.value == '') {
                axios_message_next('', '', '', currentPage,)
            }
            else if (pageChangeStyle.value == '姓名') {
                // 按姓名搜索
                axios_message_next('', select.name, '', currentPage)
            } else if (pageChangeStyle.value == '标题') {
                // 按标题
                axios_message_next('', '', select.title, currentPage)
            } else if (pageChangeStyle.value == '标签') {
                // 按标签
                axios_message_next(select.label, '', '', currentPage)
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
        // 发请求--获取当前页面数据第一次
        async function axios_message(a, b, c) {
            //清空数据
            user_arr.splice(0, user_arr.length)

            let data = {
                label: a,
                name: b,
                title: c
            }
            const res = await alreadyCheckAPI(1, pageSize.value, data)
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
            axios_message('', '', '')
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
            seekStyle,
            click_name,
            click_title,
            click_label,
            select,
            clickSearch,
            options_2,
            labelChange,
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
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-28 09:20:26
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-04 19:55:34
 * @FilePath: \renai_two\src\views\Blog\Publish.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="main_box">
        <writeHeader address="/Write" class_fonts="icon-chuangzuo1" class_fonts2="icon-zuojiantou2"></writeHeader>
        <div class="BZ">
            <div class="title_box">
                <input placeholder="标题(5~50)" class="title" v-model="title_content" @input="title_input">
                <p v-show="err" class="err">{{ err }}</p>
            </div>
            <div class="box2">
                <TEditor ref="editor" v-model="formState.content" :disabled="disabled" @getContent="getContent" />
                <div class="bottom">
                    <div class="bottom_box1 bottom_box">
                        <div class="b_box1"><span style="color:red">*</span><span style="margin-left: 0px;">文章标签</span>
                        </div>
                        <div v-for="(item, index) in items" :key="index" style="cursor:pointer">
                            <span>{{ item }}</span><span style="padding:5px; color:gold"
                                @click="clsoe_tag(item)">x</span>
                        </div>
                        <div class="b_box2">
                            <div class="tag_show" @mouseover="tagISshow"><span style="color:yellow">+</span>
                                <span style="margin-left: 3px;">添加标签</span>
                            </div>
                            <div class="b_box3" v-show="Stag">
                                <ul>
                                    <li style="padding-top:10px;height:40px;">
                                        <div style="display:flex;justify-content: space-between;">
                                            <span
                                                style="padding:0px 12px; font-size: 18px; font-weight:600;line-height:40px;color:cornflowerblue">标签</span>
                                            <span
                                                style="padding:0px 12px; font-size:18px; line-height:40px; color:crimson"
                                                @click="x_show">X</span>
                                        </div>
                                    </li>
                                    <li @click="selectItem('前端')">前端</li>
                                    <li @click="selectItem('后端')">后端</li>
                                    <li @click="selectItem('人工智能')">人工智能</li>
                                    <li @click="selectItem('C/C++')">C/C++</li>
                                    <li @click="selectItem('数据结构')">数据结构</li>
                                    <li @click="selectItem('学习')">学习</li>
                                    <li @click="selectItem('其他')">其他</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_box2 bottom_box">
                        <div class="b_box1"><span>添加封面</span></div>
                        <div class="b_box2">
                            <div class="word" v-show="fight.word">
                                <label for="upload" style="cursor:pointer">
                                    <div>+</div>
                                    <div>添加文章封面</div>
                                </label>
                            </div>
                            <div class="b_photo" v-show="fight.photo">
                                <img :src="img_src">
                                <input id="upload" type="file" class="upload" ref="fileInputRef" @change="uploadFile">
                            </div>
                        </div>
                    </div>
                    <div class="bottom_box3 bottom_box">
                        <div class="b_box1"><span>文章摘要</span></div>
                        <div class="b_box2" style="position:relative">
                            <textarea autocomplete="off" placeholder="摘要,不超过100个字" maxLength="100" style="resize:none"
                                class="zaiyao" v-model="c.TextareaContent" @input="updataWordCount"></textarea>
                            <p class="Count">{{ c.wordCount }}/100</p>
                        </div>
                    </div>
                    <div class="bottom_box4 bottom_box">
                        <div class="b_box1"><span>文章类型</span></div>
                        <div class="b_box2">
                            <ul>
                                <li><input type="radio" name="choice" id="original" checked v-model="a.type" value="原创">
                                    <label for="original">原创</label>
                                </li>
                                <li><input type="radio" name="choice" id="reship" v-model="a.type" value="转载">
                                    <label for="reship">转载</label>
                                </li>
                                <li><input type="radio" name="choice" id="translate" v-model="a.type" value="翻译">
                                    <label for="translate">翻译</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom_box5 bottom_box" style="padding-bottom:100px;">
                        <div class="b_box1"><span>可见范围</span></div>
                        <div class="b_box2">
                            <ul>
                                <li><input type="radio" name="choice2" id="all" checked v-model="a.scope" value="全体可见">
                                    <label for="all">全体可见</label>
                                </li>
                                <li><input type="radio" name="choice2" id="oneself" v-model="a.scope" value="仅自己可见">
                                    <label for="oneself">仅自己可见</label>
                                </li>
                                <li><input type="radio" name="choice2" id="member" v-model="a.scope" value="仅仁爱成员可见">
                                    <label for="member">仅仁爱成员可见</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <publishBottom v-if="title_content" :con="formState.content" :a="a" :title_format="title_format" :c="c"
            :items="items" :cover="cover" :title_content="title_content" @child-to-parent="handleChildMessage"
            @publishChild_to="to_publishChild" :reading_volume="reading_volume">
        </publishBottom>
    </div>
</template>

<script>
import { mapStatus } from '@/utils'
import { blogUploadFileAPI, articleMessageAPI } from '@/api/blog'
import { ref, reactive, watch, onMounted, onUnmounted, onUpdated } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import router from '@/router'
import TEditor from '@/components/Blog/TEditor.vue'
import publishBottom from '@/components/Blog/publishBottom.vue'
import writeHeader from '@/components/Blog/writeHeader.vue'
export default {
    name: 'Publish',
    components: { writeHeader, publishBottom, TEditor },
    setup() {
        const reading_volume = ref(0)
        const route = useRoute();
        let cover = ref('')
        const a = reactive({
            type: '原创',
            scope: '全体可见'
        })
        const items = ref([])
        // const items=ref(['前端','后端','人工智能','C/C++','数据结构','学习','其他'])
        let Stag = ref(false);
        // 切换 封面
        let fight = reactive({
            word: true,
            photo: false,
        })
        let title_format = ref(false)
        let img_src = ref('')
        const fileInputRef = ref('')
        let err = ref('')
        let title_content = ref('')
        let formState = reactive({
            content: ''
        });
        const editor = ref(null);
        const disabled = ref(false); // 假设你想在组件内部控制这个值
        const c = reactive({
            TextareaContent: '',
            wordCount: 0,
        })
        const getContent = (v, string) => {
            formState.content = v;
            //formState.content文本内容
            // console.log(formState.content + '33333');
        };
        // 如果需要，你可以在这里添加其他的响应式数据、计算属性、方法等
        // textarea
        function updataWordCount() {
            // 去掉空格,按空格分割文字
            c.wordCount = c.TextareaContent.trim().split(/\\s+/)[0].length;
        }

        function title_input() {
            // 使用正则表达式检查输入值是否包含5到50个字符
            const regex = /^.{5,50}$/;
            if (!title_content.value) {
                title_format.value = false
                err.value = '标题不能为空'
            } else if (!regex.test(title_content.value)) {
                title_format.value = false
                err.value = '格式错误请重新输入(5~50)'
            } else {
                title_format.value = true
                err.value = ''
            }
        }
        // 图片上传
        async function uploadFile() {
            // route.query.queryString
            const fd = new FormData()
            fd.append('file', fileInputRef.value.files[0])
            if (fileInputRef.value.files[0]) {
                const res = await blogUploadFileAPI(route.query.queryString, fd)
                if (res.code == 0) {
                    fight.word = false
                    fight.photo = true
                    if (res.data) {
                        cover.value = res.data
                        img_src.value = `http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${route.query.queryString}/${res.data}`
                    } else {
                        ElMessage('出现错误，请重新上传')
                    }
                } else {
                    ElMessage.error(mapStatus.get(res.code))
                }
            }
        }
        // 标签
        function tagISshow() {
            Stag.value = true;
        }
        function x_show() {
            Stag.value = false;
        }
        let i = ref(0)
        let arr = ref([]);
        let b = ref(0)
        function selectItem(con) {
            if (b.value < 3) {
                for (let a = 0; a < arr.value.length; a++) {
                    if (con === arr.value[a]) {
                        alert('重复')
                        return
                    }
                }
                b.value++;
                arr.value.push(con);
            }
            // console.log(arr.value, 'arr.value')
            // console.log(i.value)
            if (i.value < 3) {
                items.value.push(con);
                i.value++;
                // alert('只能选择3个标签')
            }
            else {
                alert('只能选择3个标签')
            }
        }
        function clsoe_tag(e) {
            items.value = items.value.filter(items => items != e);
            // console.log(items.value,'items')
            arr.value = arr.value.filter(items => items !== e)
            // console.log(arr.value, 'arr')
            // console.log(arr.value,'arr')
            b.value = arr.value.length;
            i.value = items.value.length;
        }

        // 路由守卫
        let message_fight = false;
        function handleChildMessage(message) {
            // console.log(message, 'message')
            message_fight = message;
        }
        function to_publishChild(val) {
            if (val) {
                if (!c.TextareaContent) {
                    c.TextareaContent = formState.content.replace(/&lsquo;|&#8216;|&#160;|&#8203;|&nbsp;|&#12288;|&#32;|&#173;|&#8194;|&#8195;|&#8201;|&#8202;|&#8239;|&#8287;|&#160;|&#xA0;/g, '').replace(/<[^>]*>?/gm, '').substring(0, 100);
                    updataWordCount()
                    // console.log(c.TextareaContent, 'c.TextareaContent')
                }
            }
        }
        const beforeRouteLeave = (to, from, next) => {
            // 发布成功直接跳转走
            if (message_fight) {
                next()
            } else {
                const answer = window.confirm('你确定要离开？系统不会保存你修改的信息');
                if (answer) {
                    next()
                } else {
                    next(false)
                    // router.push(route.fullPath);
                }
            }
        }
        const beforeUnload = (event) => {
            event.preventDefault();
        }
        //获取文章信息
        async function getArticle() {
            let data = {
                article_uuid: route.query.queryString
            }
            const res = await articleMessageAPI(data)
            if (res.code == 0) {
                // console.log(res.data)
                if (res.data) {
                    let Artmessage = res.data
                    title_format.value = true
                    title_content.value = Artmessage.title;
                    formState.content = Artmessage.content
                    let label_arr = Artmessage.label.split(',')
                    for (let i = 0; i < label_arr.length - 1; i++) {
                        items.value.push(label_arr[i])
                    }
                    if (Artmessage.cover) {
                        cover.value = Artmessage.cover
                        fight.word = false
                        fight.photo = true
                        img_src.value = `http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/${Artmessage.article_uuid}/${Artmessage.cover}`
                    }
                    c.TextareaContent = Artmessage.abstract
                    updataWordCount();
                    a.scope = Artmessage.visibility
                    a.type = Artmessage.article_type
                    reading_volume.value = Artmessage.reading_volume
                }
            } else {
                ElMessage.error(mapStatus.get(res.code))
                router.push('/Write')
            }
        }
        onMounted(() => {
            // console.log(route.query.queryString,'..')
            getArticle()
            // console.log(cover.value,'...')
        })
        onUpdated(() => {
            // 文章和标题有内容
            if (title_content.value || formState.content) {
                window.addEventListener('beforeunload', beforeUnload)
                onBeforeRouteLeave(beforeRouteLeave)
            }
        })
        onUnmounted(() => {
            window.removeEventListener('beforeunload', beforeUnload)
        })
        return {
            reading_volume,
            cover,
            items,
            Stag,
            title_format,
            a,
            img_src,
            fileInputRef,
            formState,
            editor,
            disabled,
            c,
            title_content,
            err,
            fight,
            getContent,
            updataWordCount,
            title_input,
            uploadFile,
            tagISshow,
            x_show,
            selectItem,
            clsoe_tag,
            handleChildMessage,
            to_publishChild,
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.upload {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

.main_box {
    min-width: 1260px;
    /* background-color: #2e2e2e; */
    /* background-color: #3b3b3b; */
    background: #2e2e2e;
}

.BZ {
    background: #2e2e2e;
    /* overflow: auto; */
    max-width: 1200px;
    margin: 0 auto;
}

.box2 {
    width: 900px;
    /* margin-top:100px; */
    margin-left: auto;
    margin-right: auto;
    height: auto;
}

.title_box {
    margin: 30px auto;
}

.BZ .title {
    height: 30px;
    width: 500px;
    border-radius: 20px;
    padding: 5px 10px;
    outline: none;
    margin: 0 auto;
    display: block;
    border: 0px;
    font-size: 18px;
    font-weight: 600;
}

.title:focus {
    /* border: 0.5px solid orangered; */
    width: 600px;
}

.bottom {
    margin-top: 20px;
}

.bottom_box {
    color: #e2e2e2;
    display: flex;
    gap: 20px;
    padding-top: 20px;
}

.bottom_box .b_box1 {
    width: 80px;
    cursor: default;
}

.bottom_box1 .b_box2 {
    /* width: 100px; */
    cursor: pointer;
    position: relative;
}

.bottom_box1 .b_box2 .b_box3 {
    width: 200px;
    height: 320px;
    position: absolute;
    top: -330px;
    background-color: #2e2e2e;
    border: #e2e2e2 1px solid;
    border-radius: 10px;
    text-align: center;
    z-index: 1;
}

.bottom_box1 .b_box2 .b_box3 ul :not(:first-child) {
    padding-bottom: 15px;
}

.bottom_box2 .b_box2 {
    width: 200px;
    height: 100px;
    border: 1px dotted #e2e2e2;
    text-align: center;

}

.bottom_box2 .b_box2 .word {
    /* display:none; */
    margin-top: 25px;
}

.b_photo {
    position: relative;
    width: 200px;
    height: 100px;
}

.bottom_box2 .b_box2 .b_photo img {
    max-width: 200px;
    max-height: 100px;
}

.bottom_box3 .b_box2 {
    flex: 1;
}

.zaiyao {
    width: 100%;
    height: 45px;
    padding: 15px;
    outline: none;
    color: #e2e2e2;
    background-color: #2e2e2e;
    font-size: 16px;
}

.zaiyao:focus {
    border: 1px solid rgb(157, 157, 223);
}

.bottom_box3 .b_box2 .Count {
    position: absolute;
    bottom: 10px;
    right: -20px;
}

.bottom_box4 .b_box2 ul {
    display: flex;
    gap: 10px;
}

.bottom_box4 .b_box2 ul li {
    width: 100px;
}

.bottom_box4 .b_box2 ul li label {
    cursor: pointer;
    margin-left: 5px;
}

.bottom_box5 .b_box2 ul {
    display: flex;
    gap: 10px;
}

.bottom_box5 .b_box2 ul li {
    width: 150px;
}

.bottom_box5 .b_box2 ul li label {
    cursor: pointer;
    margin-left: 5px;
}

.err {
    color: red;
    text-align: center;
    margin-top: 5px;
}
</style>
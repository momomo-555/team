<template>
    <main>
        <editor v-model="myValue" :init="init" :disabled="disabled" :id="tinymceId"></editor>
    </main>
</template>
<script setup>
import { reactive, ref, onMounted, watch, } from 'vue'
// import '../../../public/'
import { blogUploadFileAPI } from '@/api/blog'
import router from '@/router'
import {useRoute} from 'vue-router'
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import 'tinymce/skins/content/default/content.css'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
// import 'tinymce/models/dom'
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/link"; //插入链接
import "tinymce/plugins/paste"; //粘贴插件
import "tinymce/icons/default/icons"
import "tinymce/plugins/table"
import "tinymce/plugins/lists"
import "tinymce/plugins/wordcount"
import "tinymce/plugins/code"

const emits = defineEmits(["getContent"])
const props = defineProps({
    // modelValue使用value会报错
    modelValue: {
        // type: String,
        // default:'',
        type: String,
        default: () => {
            return '';
        },
    },
    baseUrl: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    plugins: {
        type: [String, Array],
        default: "lists  table  image  link  paste",
    },//必填
    toolbar: {
        type: [String, Array],
        default:
            "codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists table code | removeformat |image |link",
    },//必填
})
// 
// console.log(props, 'props')
//用于接收外部传递进来的富文本
const myValue = ref(props.modelValue)
const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""))
// const tinymceId = ref('vue-tinymce-my');
// console.log('tinymceId', tinymceId.value)
// const browserHeight=ref(window.innerHeight);
//获取文章uuid
const route = useRoute()

//定义一个对象 init初始化
const init = reactive({
    selector: '#' + tinymceId.value, //富文本编辑器的id,
    language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
    language: "zh_CN", //语言
    skin_url: "/tinymce/skins/ui/oxide", // skin路径，具体路径看自己的项目
    // plugins: "autoresize",
    height: 1200, //编辑器高度
    // 在编辑器右下角有一个可以拖动的标记，鼠标按住它可以改变编辑器的大小。
    resize: false,
    branding: false, //是否禁用“Powered by TinyMCE”
    menubar: true, //顶部菜单栏显示
    image_dimensions: false, //去除宽高属性
    plugins: props.plugins,  //这里的数据是在props里面就定义好了的
    toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
    font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
    // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
    paste_webkit_styles: "all",
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    file_picker_types: 'file',
    content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
    // 图片拖动上传
    paste_data_images: true,
    images_file_types: 'jpeg,jpg,png,gif,bmp,webp',
    // // 此参数用于指定一个接受上传文件的后端处理程序地址
    // images_upload_url: '/demo/upimg.php',
    // // 可以给相对路径指定它所相对的基本路径
    // images_upload_base_path: '/demo',
    urlconverter_callback: (url, node, onSave, name) => {
        if (node === 'img' && url.startsWith('blob:')) {
            // Do some custom URL conversion
            console.log('urlConverter:', url, node, onSave, name)
            tinymce.activeEditor && tinymce.activeEditor.uploadImages()
        }
        // Return new URL
        return url
    },
    //图片上传
    images_upload_handler: async function(blobInfo,success,failure){
        console.log(blobInfo, 'blobInfo')
        if (blobInfo.blob().size / 1024 / 1024 > 2) {
            reject({ message: '上传失败，图片大小请控制在 2M 以内', remove: true })
            return
        } else {
            // 获取环境变量定义的基础路径和服务器端口
            const basePath = process.env.VUE_APP_BASE_PATH;
            const serverPort = process.env.VUE_APP_SERVER_PORT;
            // const ph = `${basePath}:${serverPort}/`;

            // 添加文件
            let params = new FormData()
            params.append('file', blobInfo.blob())
            const res =await blogUploadFileAPI(route.query.queryString,params)
            // console.log(res,'...')
            if (res.code == 0) {
                if (res.data) {
                    console.log(res.data,'...')
                    success('http://106.14.30.173:8081/api/blog/unlisted/get/blog/picture/' + route.query.queryString+'/' + res.data)  //上传成功，在成功函数里填入图片路径
                }
            } else {
                ElMessage.error('上传失败,请重新上传')
            }
        }
    },
    // 文件上传
    file_picker_types: 'file image media',
    file_picker_callback: (callback, value, meta) => {
        // Provide file and text for the link dialog
        if (meta.filetype == 'file') {
            callback('mypage.html', { text: 'My text' });
        }

        // Provide image and alt text for the image dialog
        if (meta.filetype == 'image') {
            callback('myimage.jpg', { alt: 'My alt text' });
        }

        // Provide alternative source and posted for the media dialog
        if (meta.filetype == 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
        }
    }

})

//监听外部传递进来的的数据变化
watch(
    () => props.modelValue,
    () => {
        // console.log(props.modelValue,'props.value')
        myValue.value = props.modelValue
        emits("getContent", myValue.value)
    }
)
//监听富文本中的数据变化
watch(() => myValue.value, () => {
    emits("getContent", myValue.value)
    // myValue.value  html格式的富文本
    // console.log('watch....', myValue.value)
}
)
//在onMounted中初始化编辑器
onMounted(() => {
    // console.log(props,'props')
    // console.log('onMounted')
    tinymce.init({})
})

</script>
<style>
/* 去掉富文本自带上传失败样式 */
.tox .tox-dialog__busy-spinner {
    display: none !important;
}
</style>
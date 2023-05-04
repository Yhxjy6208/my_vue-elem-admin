<template>
   <el-form ref="formDom" label-width="100px" :model="filed" :rules="from_rules">
        <el-form-item label="信息类别:" prop="category_id">
            <el-cascader v-model="filed.category_id" 
            :options="infoData.category_options"
            :props="cascader_props"
            ></el-cascader>
            <!-- <el-select v-model="category">
                <el-option v-for="item in category_options"
                :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="信息标题:" prop="title">
            <el-input v-model="filed.title"></el-input>
        </el-form-item>
        <el-form-item label="　缩略图:" prop="image_url">
            <el-upload class="avatar-uploader" 
            action="#" list-type="picture-card" :auto-upload="true"
            :http-request="handUpload"
            :before-upload="handBeforeUpload"
            >
                <!-- <el-icon><Plus /></el-icon> -->
                <!-- <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <el-icon><zoom-in /></el-icon>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleDownload(file)"
                            >
                                <el-icon><Download /></el-icon>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <el-icon><Delete /></el-icon>
                            </span>
                        </span>
                    </div>
                </template> -->
                <img v-if="filed.image_url" :src="filed.image_url" class="avatar">
                <span>+</span>
            </el-upload>

            <!-- <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog> -->
        </el-form-item>
        <el-form-item label="发布日期:" prop="create_date">
            <el-time-picker  
                v-model="filed.create_date"
                type="datetime"
                placeholder="请选择时间日期"
            />
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
            <el-radio-group v-model="filed.status">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="详细内容:" prop="content">
            <div ref="editor"></div>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="handSubmit">确定</el-button>
        </el-form-item>
   </el-form>
</template>
<style lang="scss" scoped>
.el-form-item__content{
    z-index: 2001 !important;
}
</style>
<script>
import {onBeforeMount, onMounted,reactive,ref,toRefs} from 'vue';
// import {useStore} from 'vuex';
import WangEditor from "wangeditor";
import { categoryHook } from '../hook/infoHook';
import { UploadFile } from '@a/common';
import { InfoCreate } from '@a/info';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
    export default{
        setup(){
            // const store = useStore()
            const {infoData,handGetCategory:getList} = categoryHook()
            const data = reactive({
                filed:{
                    image_url:"",
                    category_id:"",
                    title:"",
                    create_date:"",
                    content:"",
                    status:"1",
                },
                // category_options:[
                // ],
                cascader_props:{
                    label:"category_name",
                    value:"id"
                }                ,
                dialogVisible:false,
                dialogImageUrl:"",
                disabled:false,
                zz:[],
                from_rules:{
                    category_id:[{required:true,message:"分类不能为空",trigger:"change"}],
                    title:[{required:true,message:"标题不能为空",trigger:"change"}],
                    imageUrl:[{required:true,message:"缩略图不能为空",trigger:"change"}],
                    create_date:[{required:true,message:"请选择发布日期",trigger:"change"}],
                    status:[{required:true,message:"请选择发布状态",trigger:"change"}],
                    content:[{required:true,message:"内容不能为空",trigger:"change"}]
                }
            })
            /** 表单校验后提交 */
            const formDom = ref()
            const { go } = useRouter()
            const handSubmit = ()=>{
                formDom.value.validate((valid)=>{
                    if(valid){
                        const request_data = JSON.parse(JSON.stringify(data.filed))
                        request_data.create_date = 
                        dayjs(request_data.create_date).format('YYYY-MM-DD HH:mm:ss')
                        request_data.category_id = 
                        request_data.category_id[request_data.category_id.length-1]
                        InfoCreate(request_data).then(response=>{
                            ElMessage.success(response.message)
                            go(-1)
                        }).catch(error=>{
                            ElMessage.error('请求失败')
                        })
                    }else{
                        console.log('error')
                        return false
                    }
                })
            }
            //富文本配置
            const editor = ref()
            let editor_intance = null
            onMounted(()=>{
                editor_intance = new WangEditor(editor.value)
                Object.assign(editor_intance.config,{
                    onchange(value){
                        data.filed.content = value
                    }
                });
                editor_intance.create()
            })
            //缩略图之删除方法
            const handleRemove = (file) => {
                console.log(file)
            }
            //缩略图之放大方法
            const handlePictureCardPreview = (file) => {
                data.dialogImageUrl = file.url
                data.dialogVisible = true
            }
            //缩略图之下载方法
            const handleDownload = (file) => {
                console.log(file)
            }
            //请求分类数据
            const handGetCategory = ()=>{
                store.dispatch('info/categoryAction').then((response)=>{
                    data.category_options=response
                })
            }
            //挂载之前请求数据
            onBeforeMount(()=>{
                getList()
            })
            //限制上传文件大小和格式
            const handBeforeUpload = (file,fileList)=>{
                const file_type = file.name.substring(file.name.lastIndexOf('.')+1)
                const isJPG = file_type==='jpg'
                const isLt2M = file.size/1024/1024<2
                if(!isJPG){
                    ElMessage.error("图片只能是jpg格式")
                    return false
                }
                if(!isLt2M){
                    ElMessage.error("图片不能大于2M")
                    return false
                }
                return isJPG && isLt2M
            }
            //上传图片的接口
            const handUpload = (params)=>{
                const file = params.file
                const from = new FormData()
                from.append("files",file)
                UploadFile(from).then(response=>{
                    data.filed.image_url = response.data.files_path
                })
            }
            return{...toRefs(data),
                handlePictureCardPreview,handleRemove,handleDownload,
                handBeforeUpload,handUpload,handSubmit,
                editor,infoData,formDom}
        }
    }
</script>
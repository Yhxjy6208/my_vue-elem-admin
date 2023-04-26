<template>
   <el-form>
        <el-form-item label="信息类别:">
            <el-cascader v-model="category" 
            :options="infoData.category_options"
            :props="cascader_props"
            ></el-cascader>
            <!-- <el-select v-model="category">
                <el-option v-for="item in category_options"
                :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="信息标题:">
            <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="　缩略图:">
            <el-upload class="avatar-uploader" action="#" list-type="picture-card" :auto-upload="false">
                <el-icon><Plus /></el-icon>
                <template #file="{ file }">
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
                </template>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="发布日期:">
            <el-time-picker  
                v-model="date"
                type="datetime"
                placeholder="请选择时间日期"
            />
        </el-form-item>
        <el-form-item label="详细内容:">
            <div ref="editor"></div>
        </el-form-item>
        <el-form-item>
            <el-button type="danger">确定</el-button>
        </el-form-item>
   </el-form>
</template>
<script>
import {onBeforeMount, onMounted,reactive,ref,toRefs} from 'vue';
// import {useStore} from 'vuex';
import WangEditor from "wangeditor";
import { categoryHook } from '../hook/infoHook';
    export default{
        setup(){
            // const store = useStore()
            const {infoData,handGetCategory:getList} = categoryHook()
            const data = reactive({
                imageUrl:"",
                category:"",
                title:"",
                date:"",
                // category_options:[
                // ],
                cascader_props:{
                    label:"category_name",
                    value:"id"
                }                ,
                dialogVisible:false,
                dialogImageUrl:"",
                disabled:false
            })
            //富文本配置
            const editor = ref()
            let editor_intance = null
            onMounted(()=>{
                editor_intance = new WangEditor(editor.value)
                Object.assign(editor_intance.config,{
                    onchange(){
                        
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
            return{...toRefs(data),handlePictureCardPreview,handleRemove,handleDownload,editor,infoData}
        }
    }
</script>
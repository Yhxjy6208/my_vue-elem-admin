<template>
    <div class="pull-left" ><el-button type="danger" @click="handCategory('first_category_add')">添加一级分类</el-button></div>
    <hr class="spacing-hr">
    <el-row :gutter="20">
        <el-col :span="7">
            <div class="category-list">
                <el-tree ref="categoryTree" node-key="id"  :expand-on-click-node="false" :data="tree_data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all >
                    <template #default="{ node, data }">
                        <div class="tree-node">
                            <span>{{ node.label }}</span>
                            <span>
                                <!-- 圆角按钮 -->
                            <el-button type="danger" round size="small" @click="handCategory('child_category_add',node)">添加子级</el-button>
                            <el-button type="success" round size="small" 
                            @click="handCategory(
                                node.level ===1?'parent_category_edit':'child_category_edit',node)">编辑</el-button>
                            <el-button round size="small"
                            @click="handCategory('delete_categroy',node)">删除</el-button>
                            </span>
                        </div>
                    </template>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="17">
            <h4 class="column">{{ config[config.type].title }}</h4>
            <el-form label-width="100px">
                <el-form-item label="一级分类名称">
                    <el-input style="width: 20%;" v-model="parent_category" 
                    :disabled="config[config.type].parent_disable"></el-input>
                </el-form-item>
                <el-form-item label="子级分类名称" v-if="config[config.type].sub_show">
                    <el-input style="width: 20%;" v-model="sub_category"
                    :disabled="config[config.type].sub_dissble"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="danger" :loading="button_loading"
                    @click="handSubmit()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<style scoped>
    /* .div-a{
        overflow: hidden;
    } */
    .spacing-hr{
        border: none;
        border-top: 1px solid #e9e9e9;
        margin: 50px 0 20px;
    }
    .tree-node{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    :deep(.el-tree-node__content){
        height: auto;
    }
    :deep(.el-tree-node__content button){
        padding: 6px 12px;
        margin:8px 3px;
        font-size:12px;
        height:auto;
    }
    .column{
        height: 44px;
        padding: 0 20px;
        margin-bottom: 30px;
        line-height: 44px;
        border-radius: 6px;
        background-color: #f3f3f3;
    }
    /* .el-button--small{
        padding: 6px 12px;
        margin:8px 3px;
        font-size:12px;
        height:auto;
    } */
    
</style>
<script>
    import { reactive,toRefs,onBeforeMount, ref } from 'vue';
    import { firstCategory_add,GetCategory,ChildrenCategory_add,CategoryEdit,CategoryDel } from '@a/info';
    export default{
        name:"分类页",
        components:{},
        props:{},
        setup(){
            onBeforeMount(()=>{
                handGetCategory()
            })
            const categoryTree = ref(null)
            const data = reactive({
                tree_data:[],
                defaultProps:{
                    children:'children',
                    label:'category_name'
                },
                parent_category:"一级分类演示",
                sub_category:"子级分类演示",
                button_loading:false,
                parent_category_data:null,
                sub_category_data:null
            })
            const config = reactive({
                type:"default",
                default:{
                    title:"分类标题",
                    parent_disable:true,
                    sub_dissble:true,
                    sub_show:true,
                    clear:["parent_category","sub_category"]
                },
                first_category_add:{
                    title:"添加一级分类",
                    parent_disable:false,//反着来的
                    sub_dissble:true,//反着来的
                    sub_show:false, //正常
                    clear:["parent_category"]
                },
                child_category_edit:{
                    title:"编辑子级分类",
                    parent_disable:true,
                    sub_dissble:false,
                    sub_show:true,
                    create:["parent_category","sub_category"],
                },
                parent_category_edit:{
                    title:"编辑一级分类",
                    parent_disable:false,
                    sub_dissble:true,
                    sub_show:false,
                    create:["parent_category"]
                },
                child_category_add:{
                    title:"添加子级分类",
                    parent_disable:true,
                    sub_dissble:false,
                    sub_show:true,
                    create:["parent_category"],
                    clear:["sub_category"]
                }
            })
            //手动分类交互
            const handCategory = (type,node_data)=>{
                (type==='delete_categroy') && handCategory_del()
                config.type = type === 'delete_categroy'?'default':type
                if(type==='child_category_edit'){
                    data.parent_category_data = node_data.parent || null
                    data.sub_category_data = node_data || null
                }else{
                    data.parent_category_data = node_data || null
                }
                handInputValue()
            }
            //一子类输入框值清空和还原
            const handInputValue = ()=>{
                const clearObject = config[config.type].clear//清除
                const createObject = config[config.type].create//还原
                if(clearObject && clearObject.length >0){
                    clearObject.forEach(item => {
                        data[item] = ""
                    });
                }
                if(createObject && createObject.length >0){
                    createObject.forEach(item => {
                        // data.parent_category = data.parent_category_data.data.category_name
                        data[item] = data[`${item}_data`].data.category_name
                    });
                }
            }
            //每次点击分级后面的按钮时调用的方法
            const handleNodeClick = ()=>{
                console.log(data)
            }
            //提交
            const handSubmit= ()=>{
                if(config.type==='first_category_add'){
                    handCategory_add()
                }
                if(config.type==='child_category_add'){
                    handAddChildrenCategory()
                }
                if(config.type==='child_category_edit'||config.type==='parent_category_edit'){
                    handCategoryEdit()
                }
            }
            //添加一级分类
            const handCategory_add = ()=>{
                if(!data.parent_category){
                    ElMessage.error({
                        message:"一级分类名称不能为空"
                    })
                    return false
                }
                data.button_loading=true
                firstCategory_add({categoryName:data.parent_category})//提交什么数据
                .then(response=>{
                    data.button_loading = false
                    ElMessage.success({
                        message:response.message
                    })
                    data.parent_category=""
                    handGetCategory()//添加一级分类后更新数据
                })//成功了做什么
                .catch(error=>{
                    data.button_loading = false
                    ElMessage.error({
                        message:"网络请求出错，请重试"
                    })
                })//失败了做什么
            }
            //获取分类
            const handGetCategory = ()=>{
                GetCategory().then(response=>{
                    data.tree_data = response.data || []
                }).catch(error=>{
                    ElMessage.error({
                        message:"网络请求出错，请重试"
                    })
                })
            }
            //添加子级分类接口方法
            const handAddChildrenCategory = ()=>{
                if(!data.sub_category){
                    ElMessage.error({
                        message:"子级分类名称不能为空"
                    })
                    return false
                }
                data.button_loading=true
                ChildrenCategory_add({
                    categoryName:data.sub_category,
                    parentId:data.parent_category_data.data.id//没有给它赋值
                })//提交什么数据
                .then(response=>{
                    data.button_loading = false
                    ElMessage.success({
                        message:response.message
                    })
                    data.sub_category=""
                    categoryTree.value.append(response.data,data.parent_category_data)
                })//成功了做什么
                .catch(error=>{
                    data.button_loading = false
                    ElMessage.error({
                        message:"网络请求出错，请重试"
                    })
                })//失败了做什么
            }
            //编辑分类接口方法
            const handCategoryEdit = ()=>{
                if(!data.sub_category || !data.parent_category){
                    ElMessage.error({
                        message:"子级分类和父级分类名称不能为空"
                    })
                    return false
                }
                data.button_loading=true
                const node_parent = data.parent_category_data.data
                const node_sub = data.sub_category_data.data
                CategoryEdit({
                    categoryName:config.type === "parent_category_edit"?data.parent_category: data.sub_category,
                    id:config.type === "parent_category_edit"?node_parent.id:node_sub.id
                })//提交什么数据
                .then(response=>{
                    data.button_loading = false
                    ElMessage.success({
                        message:response.message
                    })
                    const node_data = config.type==="parent_category_edit"?node_parent:node_sub
                    node_data.category_name = response.data.category_name
                })//成功了做什么
                .catch(error=>{
                    data.button_loading = false
                    ElMessage.error({
                        message:"网络请求出错，请重试"
                    })
                })//失败了做什么
            }
            //删除分类接口方法
            const handCategory_del = ()=>{
                ElMessageBox.confirm('确定删除该分类吗? 删除后将无法恢复','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning',
                    showClose:false,//右上角的关闭
                    closeOnClickModal:false,//无法点击屏幕取消操作
                    closeOnPressEscape:false, //无法按esc取消操作
                    beforeClose:(action,instance,done)=>{
                        if(action==='confirm'){
                            instance.confirmButtonLoading = true
                            CategoryDel(({categoryId:data.parent_category_data.data.id}))
                            .then(response=>{
                                ElMessage.success({
                                    message:response.message
                                })
                                instance.confirmButtonLoading = false
                                categoryTree.value.remove(data.parent_category_data)
                                done()//关闭弹窗
                            })
                            .catch(error=>{
                                instance.confirmButtonLoading = false
                                done()
                            })
                        }else{
                            done()
                        }
                    }
                })
            }
            return {
                ...toRefs(data),handleNodeClick,data,config,
                handCategory,handSubmit,categoryTree
            }
        }
    }
</script>
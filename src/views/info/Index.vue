<template>
    <el-row>
        <el-col :span="18">
            <el-form :inline="true">
                <el-form-item label="类别">
                    <el-cascader v-model="request_data.category_id" 
                    :options="infoData.category_options"
                    :props="cascader_props"
                    ></el-cascader>
                    <!-- <el-select placeholder="请选择" class="width-160" v-model="category">
                        <el-option v-for="item in category_options" 
                        :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="关键字">
                    <!-- <el-select placeholder="请选择" class="width-100" v-model="request_data.key">
                        <el-option v-for="item in keyword_options" 
                        :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item >
                    <el-input placeholder="请输入关键字" class="width-180" 
                    v-model="request_data.keyword"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="danger" @click="handleGetList">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6">
            <router-link to='/newsDetailed'>
                <el-button type="danger" class="pull-right">新增</el-button>
            </router-link> 
        </el-col>
    </el-row>
    <BasisTable :coulums="table_config.table_header" 
    :config="table_config.config"
    :request = "table_config.request"
    >
    <template v-slot:operation="sloat_data">
        <el-button type="danger" size="small" 
            @click="handleDetailed(sloat_data.data.id)">编辑
        </el-button>
        <el-button type="danger" size="small" 
            @click="handleDeleteConfirm(sloat_data.data.id)">删除
        </el-button>
    </template>
    </BasisTable>
    <!-- <el-table 
    ref="table"
    border
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column prop="title" label="标题" width="500" />
    <el-table-column prop="category_name" label="类别" />
    <el-table-column prop="createDate" label="日期" :formatter="formDate"/>
    <el-table-column prop="status" label="发布状态">
        <template #default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus($event,scope.row)"
            :loading="scope.row.loading"></el-switch>
        </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="200" >
        <template #default="scoped">
            <el-button type="danger" size="small" @click="handleDetailed(scoped.row.id)">编辑</el-button>
            <el-button size="small" @click="handleDeleteConfirm(scoped.row.id)">删除</el-button>
        </template>
    </el-table-column>
    </el-table> -->
</template>
<style scoped>
    .width-180{
        width: 180px;
    }
    .width-160{
        width: 160px;
    }
    .width-100{
        width: 100px;
    }
    .margin-top-30{
        margin-top: 30px;
    }
    .el-form-item{
    float: left !important;
}
</style>
<script>
// import  zhCn  from 'element-plus/lib/locale/lang/zh-cn';
import { reactive,toRefs,onBeforeMount, pushScopeId } from 'vue';
import { GetTabList,ChangeStatus,NewsDelete } from '@a/info';
import { getDate } from "@a/common";
import dayjs from 'dayjs';
import { categoryHook } from '../hook/infoHook';
import router from '@/router';
import BasisTable from '@c/table';
export default{
    name:'infoIndex',
    components:{BasisTable},
    setup(){
        onBeforeMount(()=>{
            getList()
        })
        //表头数据
        const table_config = reactive({
            //表头以及数据绑定标签名
            table_header:[
                {label:"标题",prop:"title",width:"500"},
                {label:"类别",prop:"category_name",width:"200"},
                {label:"日期",prop:"create_date",type:"function",callback:(row)=>{
                    return getDate({value:row.createDate*1000})
                }},
                {
                    label:"发布状态",
                    prop:"status",
                    type:"switch",
                    key_id:"id",
                    api_module:"info",
                    api_key:"info_status",
                    width:"100"
                },
                {
                    label:"操作",
                    type:"slot",
                    sloat_name:"operation",
                    width:"200",
                    delete_elem:true
                },
                {
                    label:"其他插槽",
                    type:"slot",
                    sloat_name:"other",
                    width:"200"
                }
            ],
            //自定义配置
            config:{
                selection:true,
            },
            request:{
                url:"info",
                // url: "/news/getList/",
                data:{
                    pageNumber:1,
                    pageSize:10
                }
            }
        })
        const data = reactive({
            category:2,
            total:0,
            // category_options:[
            //     {label:"人工智能",value:1},
            //     {label:"技术",value:0},
            //     {label:"设计",value:2}
            // ],
            cascader_props:{
                label:"category_name",
                value:"id"
            },
            tableData:[
                
            ],
            row_data_id:'',
            keyword_options:[
                {label:"ID",value:"id"},
                {label:"标题",value:"title"}

            ]
        })
        // let locale zhCn
        const {infoData,handGetCategory:getList} = categoryHook()//:取别名
        
        const request_data = reactive({
            key:"",
            keyword:"",
            pageNumber:1,//单前页码
            pageSize:10, //每页数量
            category_id:[]
        })
        //请求信息列表数据
        const handleGetList =()=>{
            const request_data = formParms()
            GetTabList(request_data).then(response=>{
                const response_data = response.data
                data.tableData = response_data.data
                data.total = response_data.total
            })
        }
        const formParms = ()=>{
            const data = Object.assign({},request_data)
            if(data.category_id.length){
                data.category_id = data.category_id[data.category_id.length-1]
            }else{
                delete data.category_id
            }
            if(data.key && data.keyword){
                data[data.key]= data.keyword
            }
            delete data.key
            delete data.keyword
            return data
        }
        // const formDate = (row)=>{
        //     return getDate({value:row.createDate*1000})
        //     return dayjs(row.createDate*1000).format('YYYY-MM-DD HH:mm:ss')
        // }
        const handleSizeChange = (val)=>{
            request_data.pageSize = val
            request_data.pageNumber = 1
            handleGetList()
        }
        //页码改变
        const handleCurrentChange = (val)=>{
            request_data.pageNumber = val
            handleGetList()
        }
        //改变状态
        // const changeStatus = (value,data)=>{
        //     data.loading = true
        //     data.status = !data.status
        //     ChangeStatus({id:data.id,status:value}).then(response=>{
        //         ElMessage.success(response.message)
        //         data.status = value
        //         data.loading = false
        //     }).catch(error=>{
        //         data.loading = false
        //     })
        // }
        //删除新闻
        const handleDeleteConfirm = (value)=>{
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
                            NewsDelete({id:value}).then(response=>{
                                ElMessage.success(response.message)
                                data.row_data_id = ''
                                instance.confirmButtonLoading = false
                                done()
                                handleGetList()
                            }).catch(error=>{
                                instance.confirmButtonLoading = false
                                done()
                            })
                        }else{
                            done()
                        }
                    }
                })
        }
        //点击选择删除存储数据准备删除
        const handleSelectionChange = (val)=>{
            if(val && val.length > 0){
                const idItem = val.map(item=>item.id)
                data.row_data_id = idItem.join()
            }else{
                data.row_data_id = ''
            }
        }
        const handleDetailed=(id)=>{
            router.push({
                path:"/newsDetailed",
                query:{id}
            })
        }
        // const handonload = (data)=>{
        //     console.log("zz",data)
        // }
        // let locale =zhCn
        return {...toRefs(data),handleSelectionChange,request_data,infoData,
            handleSizeChange,handleCurrentChange,
            handleDeleteConfirm,handleGetList,handleDetailed,table_config
        }
    }
}
</script>
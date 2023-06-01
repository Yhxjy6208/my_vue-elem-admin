<template>
    <div>
        <!-- v-loading="table_data.loading" element-loading-text="加载中,请稍后" -->
        <el-table  @selection-change = "handleCurrentChange"
        :data="table_data.data" border style="width: 100%;">
            <el-table-column type="selection" width="40" v-if="config.selection"/>
            <!-- <el-table-column v-for="header in data.render_header"
            :key="header.prop"
            :prop="header.prop"
            :label="header.label"> -->
            <template v-for="header in data.render_header" :key="header.prop">
                <el-table-column v-if="header.type==='switch'"  label="发布状态" :width="header.width">
                    <template #default="scope">
                        <!-- <el-switch v-model="scope.row[header.prop]" @change="changeStatus($event,scope.row)"
                        :loading="scope.row.loading"></el-switch> -->
                        <Switch :data="scope.row" :config="header"></Switch>
                    </template>
                </el-table-column>
                <el-table-column v-else-if="header.type==='slot'" :label="header.label">
                    <template #default="scope">
                        <slot :name="header.sloat_name" :data="scope.row"></slot>
                        <el-button v-if="header.delete_elem"  size="small" 
                            @click="handleDeleteConfirm('delete',scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column v-else-if="header.type==='function'" :label="header.label" :width="header.width">
                    <template #default="scope">
                        <div v-html="header.callback && header.callback(scope.row)"></div>
                    </template>
                </el-table-column>
                <el-table-column v-else 
                :prop="header.prop"
                :label="header.label"
                :width="header.width"
                ></el-table-column>
                
            </template>
                <!-- prop绑定数据 和value类似 label表头-->
                <!-- <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="adress" label="地址"></el-table-column> -->
            <!-- </el-table-column> -->
        </el-table>
        <!-- 匿名插槽（default）当组件中有内容时会替换原有插槽内容-->
        <!-- <slot name="default"></slot> -->
        <el-row class="margin-top-30" >
            <el-col :span="6" >
                <el-button class="pull-left" :disabled="!table_data.data_id"
                @click="handDelete('batch')" v-if="config.batch_delete"
                >批量删除</el-button>
            </el-col>
            <el-col :span="18" >
                <div class="demo-pagination-block pull-right">
                <!-- <el-pagination
                :locale="locale"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_data.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                v-if="config.page"
                /> -->
                <Pagination v-if="config.page" 
                :total="table_data.total" 
                @size-change="getList" 
                @current-change="getList"
                >
                </Pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { reactive,onBeforeMount } from 'vue';
import { configHook } from './configHook';
import { requesthook } from './requestHook';
import Pagination from '@c/pagination';
import Switch from '@c/switch';
    export default{
        emits:["onload"],
        name:'TableComponents',
        components:{ Pagination,Switch },
        props:{
            coulums:{
                type:Array,
                default:()=>([])
            },
            config:{
                type:Object,
                default:()=>({})
            },
            request:{
                type:Object,
                default:()=>({})
            }
        },
        setup(props,{emit}){
            onBeforeMount(()=>{
                configInit(props.config)
                // getList(props.request)请求数据
            })
            const data = reactive({
                table_data:[{
                    title:"zz"
                }],
                render_header:props.coulums,
                row_data_id:[],
                currentPage:0,
                total:0,
            })
            const {config,configInit} = configHook()
            const {requestData,table_data,handleDeleteConfirm,save_Date_Id} = requesthook()
            // configInit(props.config)
            // requestData(props.request)
            requestData(props.request).then(reaponse=>{
                emit("onload",table_data)
            })

            const getList = (params,type)=>{
                requestData(params,type).then(reaponse=>{
                emit("onload",table_data)
                })
            }
            const hanDelete = (type,val)=>{
                if(type==='delete'){save_Date_Id(val)}
                handleDeleteConfirm()
            }
            const handleCurrentChange = (val)=>{
                save_Date_Id(val)
            }
            return{
                data,config,table_data,getList,hanDelete,handleCurrentChange
            }
        }
    }
</script>
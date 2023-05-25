<template>
    <div>
        <el-table :data="table_data.data" border style="width: 100%;">
            <el-table-column type="selection" width="40" v-if="config.selection"/>
            <!-- <el-table-column v-for="header in data.render_header"
            :key="header.prop"
            :prop="header.prop"
            :label="header.label"> -->
            <template v-for="header in data.render_header" :key="header.prop">
                <el-table-column v-if="header.type==='switch'"  label="发布状态">
                    <template #default="scope">
                        <!-- <el-switch v-model="scope.row[header.prop]" @change="changeStatus($event,scope.row)"
                        :loading="scope.row.loading"></el-switch> -->
                        <Switch :data="scope.row" :config="header"></Switch>
                    </template>
                </el-table-column>
                <el-table-column v-else-if="header.type==='function'" :label="header.label">
                    <template #default="scope">
                        <div v-html="header.callback && header.callback(scope.row)"></div>
                    </template>
                </el-table-column>
                <el-table-column v-else 
                :prop="header.prop"
                :label="header.label"
                ></el-table-column>
                
            </template>
                <!-- prop绑定数据 和value类似 label表头-->
                <!-- <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="adress" label="地址"></el-table-column> -->
            <!-- </el-table-column> -->
        </el-table>
        <el-row class="margin-top-30" >
            <el-col :span="6" >
                <el-button class="pull-left" :disabled="!row_data_id"
                @click="handleDeleteConfirm(row_data_id)" v-if="config.batch_delete"
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
            const {requestData,table_data} = requesthook()
            // configInit(props.config)
            // requestData(props.request)
            requestData(props.request).then(reaponse=>{
                emit("onload",table_data)
            })
            onBeforeMount(()=>{
                configInit(props.config)
                // getList(props.request)请求数据
            })
            const getList = (params,type)=>{
                requestData(params,type).then(reaponse=>{
                emit("onload",table_data)
            })
            }
            return{
                data,config,table_data,getList
            }
        }
    }
</script>
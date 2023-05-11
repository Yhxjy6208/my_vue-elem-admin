<template>
    <div>
        <el-table :data="table_data.data" border style="width: 100%;">
            <el-table-column type="selection" width="40" v-if="config.selection"/>
            <el-table-column v-for="header in data.render_header"
            :key="header.prop"
            :prop="header.prop"
            :label="header.label">
                <!-- prop绑定数据 和value类似 label表头-->
                <!-- <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="adress" label="地址"></el-table-column> -->
            </el-table-column>
        </el-table>
        <el-row class="margin-top-30" >
            <el-col :span="6" >
                <el-button class="pull-left" :disabled="!row_data_id"
                @click="handleDeleteConfirm(row_data_id)" v-if="config.batch_delete"
                >批量删除</el-button>
            </el-col>
            <el-col :span="18" >
                <div class="demo-pagination-block pull-right">
                <el-pagination
                :locale="locale"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_data.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                v-if="config.page"
                />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { reactive } from 'vue';
import { configHook } from './configHook';
import { requesthook } from './requestHook';
    export default{
        name:'TableComponents',
        components:{},
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
        setup(props){
            const data = reactive({
                render_header:props.coulums,
                row_data_id:[],
                currentPage:0,
                total:0,
            })
            const {config,configInit} = configHook()
            const {requestData,table_data} = requesthook()
            configInit(props.config)
            requestData(props.request)
            return{
                data,config,table_data
            }
        }
    }
</script>
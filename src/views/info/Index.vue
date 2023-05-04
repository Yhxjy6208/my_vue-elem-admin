<template>
    <el-row>
        <el-col :span="18">
            <el-form :inline="true">
                <el-form-item label="类别">
                    <el-select placeholder="请选择" class="width-160" v-model="category">
                        <el-option v-for="item in category_options" 
                        :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-select placeholder="请选择" class="width-100"></el-select>
                </el-form-item>
                <el-form-item >
                    <el-input placeholder="请输入关键字" class="width-180"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="danger">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6">
            <el-button type="danger" class="pull-right">新增</el-button>
        </el-col>
    </el-row>
    <el-table 
    ref="table"
    border
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="40" />
    <el-table-column prop="title" label="标题" width="500" />
    <el-table-column prop="category_name" label="类别" />
    <el-table-column prop="createDate" label="日期" :formatter="formDate"/>
    <el-table-column prop="status" label="发布动态">
        <template #default="scope">
            <el-switch v-model="scope.row.status"></el-switch>
        </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="200" >
        <template #default="scoped">
            <el-button type="danger" size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-row class="margin-top-30" >
        <el-col :span="6" >
            <el-button class="pull-left">批量删除</el-button>
        </el-col>
        <el-col :span="18" >
            <div class="demo-pagination-block pull-right">
            <el-pagination
            :locale="locale"
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
            </div>
        </el-col>
    </el-row>

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
// import { zhCn } from 'element-plus/lib/locale';
import { reactive,toRefs,onBeforeMount } from 'vue';
import { GetTabList } from '@a/info';
import { getDate } from "@a/common";
import dayjs from 'dayjs';
export default{
    setup(){
        onBeforeMount(()=>{
            handleGetList()
        })
        const data = reactive({
            category:2,
            total:0,
            category_options:[
                {label:"人工智能",value:0},
                {label:"技术",value:1}
            ],
            tableData:[
                { name:"王子李",address:"上海市浦东区解放小区158号",date:"2023-4-10" },
                { name:"王子李",address:"上海市浦东区解放小区158号",date:"2023-4-10" }
            ]
        })
        const request_data = reactive({
            pageNumber:1,//单前页码
            pageSize:10 //每页数量
        })
        //请求信息列表数据
        const handleGetList =()=>{
            GetTabList(request_data).then(response=>{
                const response_data = response.data
                data.tableData = response_data.data
                data.total = response_data.total
            })
        }
        const formDate = (row)=>{
            return getDate({value:row.createDate*1000})
            return dayjs(row.createDate*1000).format('YYYY-MM-DD HH:mm:ss')
        }
        const handleSelectionChange = ()=>{

        }
        // let locale =zhCn
        return {...toRefs(data),handleSelectionChange,formDate}
    }
}
</script>
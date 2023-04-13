<template>
    <el-row>
        <el-col :span="18">
            <el-form :inline="true" label-width="80px">
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
</style>
<script>
import { reactive,toRefs } from 'vue';

export default{
    setup(){
        const data = reactive({
            category:0,
            category_options:[
                {label:"人工智能",value:0},
                {label:"技术",value:1}
            ]
        })
        return {...toRefs(data)}
    }
}
</script>
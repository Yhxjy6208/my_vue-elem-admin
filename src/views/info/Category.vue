<template>
    <div class="pull-left" ><el-button type="danger">添加一级分类</el-button></div>
    <hr class="spacing-hr">
    <el-row :gutter="20">
        <el-col :span="7">
            <div class="category-list">
                <el-tree :expand-on-click-node="false" :data="tree_data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all >
                    <template #default="{ node, data }">
                        <div class="tree-node">
                            <span>{{ node.label }}</span>
                            <span>
                                <!-- 圆角按钮 -->
                            <el-button type="danger" round size="small">添加子级</el-button>
                            <el-button type="success" round size="small">编辑</el-button>
                            <el-button round size="small">删除</el-button>
                            </span>
                        </div>
                    </template>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="17">
            <h4 class="column">分类名称</h4>
            <el-form label-width="100px">
                <el-form-item label="父类分类">
                    <el-input style="width: 20%;"></el-input>
                </el-form-item>
                <el-form-item label="子类分类">
                    <el-input style="width: 20%;"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="danger">确定</el-button>
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
    import { reactive,toRefs } from 'vue';

    export default{
        name:"分类页",
        components:{},
        props:{},
        setup(props){
            const data = reactive({
                tree_data:[
                    {
                        text:'一级1',
                        children:[
                            {
                                text:'二级1-1',
                                children:[
                                    {
                                        text:'三级1-1-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultProps:{
                    children:'children',
                    label:'text'
                }
            })
            const handleNodeClick = ()=>{}
            return {
                ...toRefs(data),handleNodeClick
            }
        }
    }
</script>
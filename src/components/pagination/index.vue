<template>
    <el-pagination
        :locale="locale"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:current-page="current_page"
    />
</template>
<script>
import { ref, watchEffect } from 'vue';
import  zhCn  from 'element-plus/lib/locale/lang/zh-cn';

    export default{
        name:"Pagination",
        props:{
            total:{
                type:[Number,String],
                defalut:0
            }
        },
        emits:["sizeChange","currentChange"],
        setup(props,{emit}){
            //设置中文
             let locale =  zhCn
            //单前页码数
            const current_page = ref(0)
            //总条数统计
            const total = ref(props.total) 
            //监听 变化时更新 因为和上面绑定 所有改变值会重选渲染页面
            watchEffect(()=>{total.value = props.total})
            const handleSizeChange = (val)=>{
                const params = {
                    pageSizes:val,
                    pageNumber:1   
                }
                emit("sizeChange",params,"page")
            }
            const handleCurrentChange = (val)=>{
                const params = {
                    pageNumber:val
                }
                emit("currentChange",params,"page")
            }
            return{
                locale,current_page,total,handleSizeChange,handleCurrentChange
            }
        }
    }
</script>
<template>
    <el-switch v-model="init_data.value" 
    :loading="init_data.loading" 
    :before-change="handSwitch"> 
    </el-switch>
</template>
<script>
import { reactive } from 'vue';
import { ChangeStatus } from '@a/info';
import { SwitchSatus } from '@/api/common';
import ApiUrl from '@/api/requestUrl';

    export default{
        name:"Switch",
        props:{
            data:{
                type:Object,
                default:()=>({})
            },
            config:{
                type:Object,
                default:()=>({})
            }
        },
        setup(props){
            const config = reactive(props.config)
            const data = reactive(props.data)
            const init_data = reactive({
                value:data[config.prop],
                loading:false
            })
            const handSwitch = (value)=>{
                const key_id = config.key_id;
                if(!key_id) { return false;}
                init_data.loading = true;
                //参数
                const request_data = {
                    url:config.api_url || ApiUrl[config.api_module][config.api_key].url,
                    //apiUrl["info"]["info_status"] == /news/status/
                    method:config.method || "post",//post
                    data:{
                        [key_id]:data[key_id],         //等同于["id"]:data["id"]
                        [config.prop]:!init_data.value             //等价于["status"]:value
                    }
                }
                //接口请求
                return new Promise((resolve,reject)=>{
                    SwitchSatus(request_data).then(response=>{
                        ElMessage.success(response.message);
                        init_data.value = init_data.value;
                        init_data.loading = false;
                        resolve(true)
                    }).catch(error=>{
                        ElMessage.error(error);
                        init_data.loading = false;
                        reject(false)
                    })
                })    
                // return new Promise((resolve,reject)=>{
                //     ChangeStatus({id:data,status:!init_data.value}).then(response=>{
                //         ElMessage.success(response.message)
                //         data.status = value
                //         init_data.loading = false
                //         resolve(true)
                //     }).catch(error=>{
                //         init_data.loading = false
                //         reject(false)
                //     })
                // })
            }
            return{config,init_data,handSwitch}
        }
    }
</script>
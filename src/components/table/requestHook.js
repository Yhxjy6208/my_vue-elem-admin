import { reactive } from "vue";
import { TableData } from "@a/common";
import ApiUrl from "@/api/requestUrl";
import { ElLoading } from  "element-plus";
import "element-plus/lib/components/loading/style/css";
import { NewsDelete } from '@a/info';
export function requesthook(){
    let request_config = reactive({
        has:true,//是否请求
        url:"",//地址 
        method:"post",//方式
        data:{}//请求发送的数据 ->url.post(data)
    })
    const table_data = reactive({
        data:[],
        total:0,
        loading:false,
        data_id:""
    })
    //删除新闻
    const handleDeleteConfirm = ()=>{
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
                        NewsDelete({id:table_data.data_id}).then(response=>{
                            ElMessage.success(response.message)
                            table_data.data_id = ''
                            instance.confirmButtonLoading = false
                            loadData()
                            done()
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
    const save_Date_Id = (value)=>{
        const isArray = Array.isArray(value)
        if (!isArray){
            table_data.data_id = value
        }else{
            table_data.data_id = value.length > 0 ?value.map(item=>item.id).join() : ""
        }
    }
    // const hanDelete = ()=>{
    //     NewsDelete({id:table_data.data_id}).then(response=>{
    //         ElMessage.success(response.message)
    //     })
    // }
    const loadingServer = ElLoading.service({
        lock:table_data.loading,
        text:"加载中,请稍后"
    })
    const loadData = ()=>{
        table_data.loading = true
        if (!request_config.has){return false}
        if (!request_config.url){return false}
        //参数
        const url = ApiUrl[request_config.url]?.list?.url
        const method = ApiUrl[request_config.url].list?.method || "post"
        const data = request_config.data
        const request_data = {
            // url:request_config.url,
            // method:request_config.method,
            // data:request_config.data
            url,
            method,
            data
        }
        return new Promise((resolve,reject)=>{
            TableData(request_data).then(response=>{
                table_data.data = response.data.data
                table_data.total = response.data.total
                table_data.loading = false
                loadingServer.close()
                resolve(table_data.data)
            }).catch(error=>{
                table_data.loading = false
            })
                
    
        })
        
    }
    const requestData = (data={},type="init") => {
        if(type==="init"){
            request_config = {...request_config,...data}
        }
        if(type==="page"){
            request_config = {...request_config,data,...data}
        }
        return loadData()
    }
    return { requestData,table_data,handleDeleteConfirm,save_Date_Id }
}
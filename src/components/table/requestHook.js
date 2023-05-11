import { reactive } from "vue";
import { TableData } from "@a/common"
export function requesthook(){
    let request_config = reactive({
        has:true,//是否请求
        url:"",//地址
        method:"post",//方式
        data:{}//请求发送的数据 ->url.post(data)
    })
    const table_data = reactive({
        data:[],
        total:0
    })
    const loadData = ()=>{
        if (!request_config.has){return false}
        if (!request_config.url){return false}
        const request_data = {
            url:request_config.url,
            method:request_config.method,
            data:request_config.data
        }
        TableData(request_data).then(response=>{
            table_data.data = response.data.data
            table_data.total = response.data.total
        })
    }
    const requestData = (data={}) => {
        request_config = {...request_config,...data}
        loadData()
    }
    return { requestData,table_data }
}
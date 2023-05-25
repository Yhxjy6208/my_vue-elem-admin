import { reactive } from "vue";
import { TableData } from "@a/common";
import ApiUrl from "@/api/requestUrl";
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
        //参数
        const url = ApiUrl[request_config.url]?.list?.url
        const method = ApiUrl[request_config.url].list?.method || "post"
        const data = request_config.data
        console.log("url",url)
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
                resolve(table_data.data)
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
    return { requestData,table_data }
}
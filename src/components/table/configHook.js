import { reactive } from "vue";

export function configHook(){
    const config = reactive({
        selection:true,//复选框
        batch_delete:true,//批量删除
        page:true //分页
    })
    const configInit = (data={})=>{
        if(JSON.stringify(data)==="{}"){return false}
        const keys = Object.keys(config)
        for(let key in data){
            if(!data.hasOwnProperty(key)){continue}
            if(keys.includes(key)){config[key]=data[key]}
        }
    }
    return { config,configInit }
}
import { GetCategory } from "@a/info";

const actions = {
    categoryAction(){ 
        return new Promise((resolve,reject)=>{
            GetCategory().then(response=>{
                    resolve(response.data===undefined?[]:response.data)
                }
            ).catch(error=>{
                reject(error)
            })
        })
    }
}
export default({
    namespaced:true,//限定在命令模块间
    actions
});
import { reactive } from "vue";
import { GetCategory } from "@/api/info";

export function categoryHook(){
    const infoData = reactive({
        category_options:[]
    })
    /**获取分类 */
    const handGetCategory=()=>{
        GetCategory().then(response=>{
            infoData.category_options = response.data
        })
    }
    return{
        infoData,
        handGetCategory
    }
}


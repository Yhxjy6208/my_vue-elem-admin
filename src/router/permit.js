import router from "./index";
import { getToken,getUserName } from "@u/cookies";
import { Check } from '@a/account'

// 每次变化都会经过我
router.beforeEach((to,from)=>{
    if(!getToken() || !getUserName()){
        if(to.name!=='Login'){
            return{
            name:"Login"//包括我
            }
        }
    }else{
        // const datapost = {username:getUserName()}
        // Check(datapost).then((response)=>{
        //     if(response.data.user==false){
        //         return{
        //             name:"Login"//包括我
        //             }
        //     }
        // })
    }
})

router.afterEach((to,from)=>{

})
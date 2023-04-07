import router from "./index";
import { getToken } from "@u/cookies";

// 每次变化都会经过我
router.beforeEach((to,from)=>{
    if(!getToken()){
        if(to.name!=='Login'){
            return{
            name:"Login"//包括我
            }
        }
    }
})

router.afterEach((to,from)=>{

})
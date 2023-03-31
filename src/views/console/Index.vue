<template>
    <div>{{ value }}</div>
    <div>{{ value_store }}</div>
    <div>计算后的结果是{{ number }}</div>
</template>
<script>
    //引入图标只在本文件生效 局部引用
//     import { Avatar } from '@element-plus/icons-vue';
//     export default{
//         components:{
//     Avatar
// }
//     }
import {useStore} from 'vuex';
export default{
    setup(){
        const store = useStore();//多一层少一层
        const {state} = useStore();
        const value = state.app.count
        const value_store = store.state.app.count
        const number = store.getters["app/getCount"]
        store.commit('app/SET_TEXT',"调用函数后的参数")//更新了
        return{
            value,value_store,number
        }
    }
}
</script>
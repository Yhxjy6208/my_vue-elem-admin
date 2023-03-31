<template>
    <div>{{ value }}</div>

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
        return{
            value,value_store
        }
    }
}
</script>
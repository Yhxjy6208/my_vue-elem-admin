<template>
    <div class="hear-wrap">
        <div class="wrap"><!--左侧-->
            <span class="menu-btn" @click="switchAside">
                <svg-icon iconName="menu" className="icon-menu-svg"></svg-icon>
            </span>
        </div>
        <div class="wrap"><!--右侧-->
            <div class="user-info">
                <div class="face-info">
                    <img src="../assets/logo-min.png" alt="10643058911@qq.com">
                    <span class="name">{{ username }}</span>
                </div>
                <span class="logout" @click="handLogout">
                    <svg-icon iconName="logout" className="icon-logout"></svg-icon>
                </span>
            </div>
        </div>
    </div>
</template>
<!-- scoped 当前引用 -->
<style lang="scss" scoped>
    .hear-wrap{
        height: 100%;
        width: 100%;
        display: flex;
        align-items:center;
        justify-content: space-between;
    }
    .menu-btn{
        cursor:pointer;
    }
    .icon-menu-svg{
        font-size: 24px;
    }
    .user-info{
        display: flex;
        align-items: center;
    }
    .face-info{
        span,img{
            display: inline-block;
            vertical-align: middle;
        }
        span{
            margin-left: 15px;
        }
    }
    .logout{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75px;
        height: 75px;
        cursor: pointer;
    }
    .icon-logout{
        font-size: 24px;
    }
</style>
<script>
    import { useStore } from "vuex";
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    export default{
        setup(props){
            const store = useStore()
            const { replace } = useRouter()
            const username = ref(store.state.app.username)
            const switchAside = (()=>{
                store.commit('app/SET_COLLAPSE')
            })
            const handLogout = (()=>{
                ElMessageBox.confirm('确定退出管理后台','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{//按确定执行什么
                    store.dispatch("app/logoutAction").then(response=>{
                        ElMessage.success({
                            message:response.message
                        })
                        replace({
                            name:'Login'
                        })
                    })
                }).catch(error=>{})//按取消执行什么
            })
            return {switchAside,username,handLogout}
        }
    }
</script>
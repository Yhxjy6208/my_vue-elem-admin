import { Login,Logout } from "@a/account"
import { setToken,setUserName,getToken,getUserName,delToken,delUserName} from '@u/cookies'//只有一个叫cookies的文件就不需要写文件的尾缀

const state = { 
    count:100,
    text:"Vue+Element+js",
    collapse:JSON.parse(sessionStorage.getItem('collapse')) || false,
    token:'' || getToken(),
    username:'' || getUserName()
}//存储

const getters = {
    getCount:(state)=>{
        return state.count+10
    },
    getText:(state)=>{
        return "我正在努力"+state.text
    }
}//获取state对象数据
const mutations = {
    SET_COUNT(state){
        state.count = 10
    },
    SET_TEXT(state,payload){
        state.text = payload
    },
    SET_COLLAPSE(state){
        state.collapse = !state.collapse
        sessionStorage.setItem('collapse',JSON.stringify(state.collapse))
        // localStorage.setItem('zz',JSON.stringify(state.collapse))

        // // state.collapse?state.collapse=false:state.collapse=true

        // if (state.collapse){
        //     state.collapse=false
        // }else{
        //     state.collapse=true
        // }
    },
    SET_TOKEN(state,value){
        state.token = value
        value && setToken(value)
    },
    SET_USERNAME(state,value){
        state.username = value
        value && setUserName(value)
    }
}//更新
const actions = {
    update_count(context){
        context.commit("SET_COUNT")
    },
    update_text({commit,state,getters,dispatch},payload){
        commit("SET_TEXT",payload)
    },
    loadAction(context,requesData){
        return new Promise((resolve,reject)=>{
            Login(requesData).then((response)=>{
                let data = response.data
                context.commit('SET_TOKEN',data.token)
                context.commit('SET_USERNAME',data.username)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    logoutAction({commit}){
        return new Promise((resolve,reject)=>{
            Logout().then((response)=>{
                delToken()
                delUserName()
                commit('SET_TOKEN','')
                commit('SET_USERNAME','')
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}//更新，通过其他的store对象进行更新

export default({
  namespaced:true,//限定在命令模块间
  state,
  getters,
  mutations,
  actions,
});